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

    if (params.remotePassword){
      var scpCommand = `sshpass -p ${params.remotePassword} scp ${params.localFile} ${params.remoteUser}@${params.remoteHost}:${params.remoteFilePath}`;
    }else{
      var scpCommand = `scp ${(params.identityFile) ? "-i" : ""} ${params.identityFile} ${params.localFile} ${params.remoteUser}@${params.remoteHost}:${params.remoteFilePath}`;
    }
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