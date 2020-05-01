const electron = require('electron');

process.once('loaded', () => {
    global.process = process;
    global.electron = electron;
    global.module = module;
});