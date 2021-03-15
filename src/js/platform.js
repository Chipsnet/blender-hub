// プラットフォームの違いを吸収するやつをここにまとめたい
const os = require("os");
const log = require("electron-log");

// こっちの名前で呼ぶ
const platforms = {
  WINDOWS: "WINDOWS",
  MAC: "MAC",
  LINUX: "LINUX",
};

const platformsNames = {
  win32: platforms.WINDOWS,
  darwin: platforms.MAC,
  linux: platforms.LINUX,
};

const currentPlatform = platformsNames[os.platform()];
log.debug("platform is", currentPlatform);

/**
 * プラットフォームごとの実行ファイルの名前をstringで返す関数.
 * macは検証環境がないので試せないので誰かよろしく.
 * @param {string} [name] 実行ファイルの拡張子なしの名前.
 * @return {string} - プラットフォームごとの実行ファイルの名前を返す.
 */
const execFileName = (name) => {
  if (currentPlatform === "WINDOWS") {
    return name + ".exe";
  } else if (currentPlatform === "LINUX") {
    return name;
  }
};

exports.execFileName = execFileName;
