const electron = require('electron');
const log = require('electron-log')

process.once('loaded', () => {
    global.process = process;
    global.electron = electron;
    global.log = log;
    global.module = module;
});