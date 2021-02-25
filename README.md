<p align="center">
  <a href="http://runnerty.io">
    <img height="257" src="https://runnerty.io/assets/header/logo-stroked.png">
  </a>
  <p align="center">Smart Processes Management</p>
</p>

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]
<a href="#badge">
<img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg">
</a>

# SCP executor for [Runnerty]:

Requires sshpass tool to be installed in the SO.

By default, the executor use the port `22`, it is possible to indicate a different port with the property `"remotePort"`

It is possible to use `"remotePassword"` instead off `"identityFile"`

### Installation:

Through NPM

```bash
npm i @runnerty/executor-scp
```

You can also add modules to your project with [runnerty-cli]

```bash
npx runnerty-cli add @runnerty/executor-scp
```

This command installs the module in your project, adds example configuration in your `config.json` and creates an example plan of use.

If you have installed [runnerty-cli] globally you can include the module with this command:

```bash
rty add @runnerty/executor-scp
```

### Configuration sample:

Add in [config.json]:

```json
{
  "id": "scp_default",
  "type": "@runnerty-executor-scp"
}
```

### Plan sample:

Add in [plan.json]:

```json
{
  "id": "scp_default",
  "identityFile": "mykey.pem",
  "localFile": "originfile.txt",
  "remoteFilePath": "/var/remote.txt",
  "remoteHost": "my.host.com",
  "remoteUser": "user"
}
```

```json
{
  "id": "scp_default",
  "identityFile": "mykey.pem",
  "localFile": "originfile.txt",
  "remoteFilePath": "/var/remote.txt",
  "remoteHost": "my.host.com",
  "remoteUser": "user",
  "remorePassword": "password"
}
```

[runnerty]: http://www.runnerty.io
[downloads-image]: https://img.shields.io/npm/dm/@runnerty/executor-scp.svg
[npm-url]: https://www.npmjs.com/package/@runnerty/executor-scp
[npm-image]: https://img.shields.io/npm/v/@runnerty/executor-scp.svg
[david-badge]: https://david-dm.org/runnerty/executor-scp.svg
[david-badge-url]: https://david-dm.org/runnerty/executor-scp
[config.json]: http://docs.runnerty.io/config/
[plan.json]: http://docs.runnerty.io/plan/
[runnerty-cli]: https://www.npmjs.com/package/runnerty-cli
