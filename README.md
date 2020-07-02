> The English document is [here](./README_en.md).

# BlenderHub

[![Image from Gyazo](https://i.gyazo.com/66b65ee1e919d97eb1eaea00566dbc3f.png)](https://gyazo.com/66b65ee1e919d97eb1eaea00566dbc3f)

BlenderHubは、Blenderのバージョン管理ツールです。       
複数バージョンのBlenderを名前を付けて管理、ワンクリックで起動できます。

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Chipsnet/blender-hub/Node.js%20CI?style=flat-square)
![GitHub](https://img.shields.io/github/license/chipsnet/blender-hub?style=flat-square)
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/chipsnet/blender-hub?include_prereleases&style=flat-square)
![GitHub All Releases](https://img.shields.io/github/downloads/chipsnet/blender-hub/total?style=flat-square)    
[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/A0A81VPXD)

## 機能

- インストール済みのBlenderを登録する
- バージョンごとに名前を付けて管理する

## 動作環境

- Windows

## インストール

### Release（安定版）

|プラットフォーム|ダウンロードリンク|
|---------------|----------------|
|Windows|[blender-hub-Setup-1.1.1.exe](https://github.com/Chipsnet/blender-hub/releases/download/v1.1.1/blender-hub-Setup-1.1.1.exe)|
|Mac|開発中|

ダウンロードしたファイルを実行すると、BlenderHubが自動でインストールされます。      
安定版は自動更新機能があるので、新規バージョンが出た場合自動で更新されます。

### Pre-Release（プレビュー版）

開発版のビルドです。        
バグなどがあり、不安定な場合があります。

|プラットフォーム|ダウンロードリンク|
|---------------|----------------|
|Windows 32bit|[blender-hub-1.1.0-rc.6-ia32-win.zip](https://github.com/Chipsnet/blender-hub/releases/download/v1.1.0-rc.6/blender-hub-1.1.0-rc.6-ia32-win.zip)|
|Windows 64bit|[blender-hub-1.1.0-rc.6-win.zip](https://github.com/Chipsnet/blender-hub/releases/download/v1.1.0-rc.6/blender-hub-1.1.0-rc.6-win.zip)|
|Mac|開発中|

プレビュー版にはインストーラーはありません。        
ダウンロードしたファイルを解凍し、中の`blender-hub.exe`を実行してください。

プレビュー版では、自動更新は無効になっています。

## インストール（ソース）

ソースコードからインストールする方法です。

以下の環境が必要です。

- Node.js: `v12.x`
- Yarn: `Latest`

次のコマンドを実行して起動します

```bash
git clone https://github.com/Chipsnet/blender-hub.git
cd blender-hub
yarn install
yarn start
```

インストーラーをビルドするには、`yarn build`を実行します。      
zip形式でテストビルドを行うには、`yarn prebuild`を実行します。

## コントリビュート

バグを見つけたり、欲しい機能がありましたら、[issueを立てて](https://github.com/Chipsnet/blender-hub/issues)問題を報告してください！

あなたは開発者ですか？      
修正がある場合はdevelopブランチにPull Requestを行ってください。     
決してmasterブランチにPull Requestをしないでください。

## License

### Icon data

Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com/)

## Donate

- Kyash (ID: minato86)
- [Patreon](https://www.patreon.com/minato86)
- [Brave](https://brave.com/chi953) Rewards (上部のBrave Rewardsボタンから寄付できます)
- [Fanbox](https://minato86.fanbox.cc/)
- [PayPal.me](https://www.paypal.me/minatoo86)