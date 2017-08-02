# SCP executor for [Runnerty]:
Requires sshpass tool to be installed in the SO.

### Configuration sample:
```json
{
  "id": "scp_default",
  "type": "@runnerty-executor-scp"
}
```

### Plan sample:
```json
{
  "id": "scp_default",
  "identityFile": "mykey.pem",
  "localFile": "originfile.txt",
  "remoteFilePath": "/var/remote.txt",
  "remoteUser": "user",
  "remoteHost": "my.host.com"
}
```

By default, the executor use the port 22, it is possible to indicate a different port with the property ```"remotePort"```

It is possible to use ```"remotePassword"``` instead off ```"identityFile"```



[Runnerty]: http://www.runnerty.io
