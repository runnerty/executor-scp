'use strict';

const spawn = require('child_process').spawn;

const Executor = require('@runnerty/module-core').Executor;

class scpExecutor extends Executor {
  constructor(process) {
    super(process);
  }

  exec(params) {
    const endOptions = {};

    const port = params.remotePort | '22';
    const password = params.remotePassword ? `sshpass -p ${params.remotePassword}` : '';
    const identityFile = params.identityFile && password === '' ? `-i ${params.identityFile}` : '';

    const scpCommand = `${password} scp -P ${port} ${identityFile} ${params.localFile} ${params.remoteUser}@${params.remoteHost}:${params.remoteFilePath}`;

    endOptions.command_executed = scpCommand;
    const proc = spawn(scpCommand, [], { shell: true });

    let stderr = '';
    proc.stderr.on('data', chunk => {
      stderr += chunk;
    });

    proc.on('close', (code, signal) => {
      if (code) {
        endOptions.end = 'error';
        endOptions.messageLog = `SCP Error (${scpCommand}): ${signal} / ${stderr}`;
        endOptions.err_output = `SCP Error (${scpCommand}): ${signal} / ${stderr}`;
        this.end(endOptions);
      } else {
        this.end();
      }
    });
  }
}

module.exports = scpExecutor;
