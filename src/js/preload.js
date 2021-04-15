const electron = require('electron');
const log = require('electron-log')
const config = require('../../package.json')

process.once('loaded', () => {
    global.process = process;
    global.electron = electron;
    global.log = log;
    global.module = module;
    global.config = config;
    global.require = require;
});