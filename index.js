"use strict";

var spawn = require("child_process").spawn;

var Execution = global.ExecutionClass;

class scpExecutor extends Execution {
  constructor(process) {
    super(process);
  }

  exec(params) {
    var _this = this;
    var endOptions = {};

    let port = (params.remotePort) ? `-P ${params.remotePort}` : '-P 22';
    let password = (params.remotePassword)?`sshpass -p ${params.remotePassword}`:"";
    let identityFile = (params.identityFile && password === "") ? `-i ${params.identityFile}` : "";
    
    var scpCommand = `${password} scp ${port} ${identityFile} ${params.localFile} ${params.remoteUser}@${params.remoteHost}:${params.remoteFilePath}`;
    
    endOptions.command_executed = scpCommand;
    var proc = spawn(scpCommand, [], {shell: true});

    var stderr = "";
    proc.stderr.on("data", function (chunk) {
      stderr += chunk;
    });

    proc
      .on("close", function (code, signal) {
        if (code) {
          endOptions.end = "error";
          endOptions.messageLog = `SCP Error (${scpCommand}): ${signal} / ${stderr}`;
          endOptions.err_output = `SCP Error (${scpCommand}): ${signal} / ${stderr}`;
          _this.end(endOptions);
        } else {
          _this.end();
        }
      });
  }
}

module.exports = scpExecutor;