> 日本語版は[こちら](./README.md)

# BlenderHub

BlenderHub is a version management tool for Blender.     
Manage multiple versions of Blender by name and launch them with a one click.

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Chipsnet/blender-hub/Node.js%20CI?style=flat-square)
![GitHub](https://img.shields.io/github/license/chipsnet/blender-hub?style=flat-square)
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/chipsnet/blender-hub?include_prereleases&style=flat-square)
![GitHub All Releases](https://img.shields.io/github/downloads/chipsnet/blender-hub/total?style=flat-square)

## Features

- Registering an installed Blender
- Naming and managing each version

## Operating environment

- Windows

### Release（Stable）

|Platform|Download Link|
|---------------|----------------|
|Windows|Released URL|
|Mac|Under development|

When you run the downloaded file, BlenderHub will be installed automatically.      
The stable version has an automatic update feature, so it will update automatically when a new version is released.

### Pre-Release（Preview）

This is a build of the development version.        
It has bugs and may be unstable.

|Platform|Download Link|
|---------------|----------------|
|Windows 32bit|[blender-hub-1.1.0-rc.6-ia32-win.zip](https://github.com/Chipsnet/blender-hub/releases/download/v1.1.0-rc.6/blender-hub-1.1.0-rc.6-ia32-win.zip)|
|Windows 64bit|[blender-hub-1.1.0-rc.6-win.zip](https://github.com/Chipsnet/blender-hub/releases/download/v1.1.0-rc.6/blender-hub-1.1.0-rc.6-win.zip)|
|Mac|Under development|

There is no installer for the preview version.        
Unzip the downloaded file and run `blender-hub.exe` inside.

In the preview version, automatic updates are disabled.

## Installation (Source)

This is how to install from the source code.

The following environment is required.

- Node.js: `v12.x`
- Yarn: `Latest`

Execute the following command to start it

```bash
git clone https://github.com/Chipsnet/blender-hub.git
cd blender-hub
yarn install
yarn start
```

To build the installer, run `yarn build`.      
To do a test build in zip format, run `yarn prebuild`.

## Contribute

If you find a bug or a feature you want, please [issue](https://github.com/Chipsnet/blender-hub/issues) and report the issue!

Are you a developer?      
If you have any corrections, please submit a Pull Request to the develop branch.     
Never make a Pull Request to the master branch.

## Donate

- Kyash (ID: minato86)
- [Patreon](https://www.patreon.com/minato86)
- [Brave](https://brave.com/chi953) Rewards (You can donate from the Brave Rewards button at the top)
- [Fanbox](https://minato86.fanbox.cc/)
- [PayPal.me](https://www.paypal.me/minatoo86)