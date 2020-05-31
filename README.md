> The English document is [here](./README_en.md).

# BlenderHub

BlenderHubは、Blenderのバージョン管理ツールです。       
複数バージョンのBlenderを名前を付けて管理、ワンクリックで起動できます。

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Chipsnet/blender-hub/Node.js%20CI?style=flat-square)
![GitHub](https://img.shields.io/github/license/chipsnet/blender-hub?style=flat-square)
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/chipsnet/blender-hub?include_prereleases&style=flat-square)
![GitHub All Releases](https://img.shields.io/github/downloads/chipsnet/blender-hub/total?style=flat-square)


## 機能

- インストール済みのBlenderを登録する
- バージョンごとに名前を付けて管理する

## 動作環境

- Windows

## インストール

以下のリンクからzipファイルをダウンロードします。

|プラットフォーム|ダウンロードリンク|
|---------------|----------------|
|Windows 32bit|[BlenderHub-1.0.0-ia32-win.zip](https://github.com/Chipsnet/blender-hub/releases/download/1.0.0/BlenderHub-1.0.0-ia32-win.zip)|
|Windows 64bit|[BlenderHub-1.0.0-win.zip](https://github.com/Chipsnet/blender-hub/releases/download/1.0.0/BlenderHub-1.0.0-win.zip)|

解凍したフォルダ内にある`blender-hub.exe`を実行すると、ソフトウェアが起動します。

Beta版が欲しいですか？      
[Github Actions](https://github.com/Chipsnet/blender-hub/actions?query=workflow%3A%22Node.js+CI%22)のArtifactsから手に入れることができます

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

ビルドするには`yarn build`を実行します。        
distフォルダが生成され、そこにビルド済みのzipファイルが生成されます。

## コントリビュート

バグを見つけたり、欲しい機能がありましたら、[issueを立てて](https://github.com/Chipsnet/blender-hub/issues)問題を報告してください！

あなたは開発者ですか？      
修正がある場合はdevelopブランチにPull Requestを行ってください。     
決してmasterブランチにPull Requestをしないでください。

## Donate

- Kyash (ID: minato86)
- [Patreon](https://www.patreon.com/minato86)
- [Brave](https://brave.com/chi953) Rewards (上部のBrave Rewardsボタンから寄付できます)
- [Fanbox](https://minato86.fanbox.cc/)
- [PayPal.me](https://www.paypal.me/minatoo86)