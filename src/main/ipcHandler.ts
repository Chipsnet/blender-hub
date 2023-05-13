/* eslint-disable no-unused-vars */
/* eslint-disable lines-between-class-members */
/* eslint global-require: off, no-console: off, promise/always-return: off */
import Electron from 'electron';
import path from 'path';
import { spawn } from 'child_process';
import Database from './handlers/database';

export default class IpcHandler {
  ipcMain: Electron.IpcMain;
  jsonPath: string;
  database: Database;

  constructor(ipcMain: Electron.IpcMain) {
    this.ipcMain = ipcMain;
    this.jsonPath = path.join(
      Electron.app.getPath('userData'),
      '/database.json'
    );
    this.handleIpcMain();
    this.database = new Database(this.jsonPath);

    console.log('JsonDir:', this.jsonPath);
  }

  handleIpcMain() {
    this.ipcMain.on('ipc-example', async (event, arg) => {
      const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
      console.log(msgTemplate(arg));
      event.reply('ipc-example', msgTemplate('pong'));
    });

    this.ipcMain.on('get-database', async (event, arg) => {
      const database = await this.database.load();
      event.reply('set-database', database);
    });

    this.ipcMain.on('launch-app', async (event, arg) => {
      console.log(arg);

      const appPath = await this.database.getAppPath(arg[0]);
      console.log(appPath);

      const childProcess = spawn(appPath);

      console.log(`process id:${process.pid}`);
      console.log(`child process id:${childProcess.pid}`);

      childProcess.stdout.on('data', (chunk) => {
        console.log(new Date());
        console.log(chunk.length);
        // console.log(chunk.toString())
      });
    });
  }
}
