/* eslint-disable lines-between-class-members */
/* eslint global-require: off, no-console: off, promise/always-return: off */
import { JsonDB, Config } from 'node-json-db';
import PACKAGE_JSON from '../../../package.json';

type VersionDataType = {
  name: string;
  path: string;
  dir: string;
  uuid: string;
};

type JsonDataType = {
  versions: VersionDataType[];
  'app-version': string;
  language: string;
};

export default class Database {
  jsonPath: string;
  adapter: any;
  defaultData: JsonDataType;
  db: JsonDB;

  constructor(jsonPath: string) {
    this.jsonPath = jsonPath;
    this.defaultData = {
      versions: [],
      'app-version': PACKAGE_JSON.version,
      language: 'ja',
    };
    this.db = new JsonDB(new Config(jsonPath, false, true, '/'));
  }

  async load() {
    await this.db.reload()
    const data: JsonDataType = await this.db.getData('/');

    return data;
  }

  async getAppPath(uuid: string) {
    await this.db.reload();
    const versionIndex = await this.db.getIndex('/versions', uuid, 'uuid');
    const data: JsonDataType = await this.db.getData('/');
    const appPath = data.versions[versionIndex].path;

    return appPath;
  }
}
