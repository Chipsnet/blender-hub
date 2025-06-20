const { contextBridge, ipcRenderer } = require('electron');

// メインプロセスとの通信用API
contextBridge.exposeInMainWorld('electronAPI', {
    // データベース操作
    loadDatabase: () => ipcRenderer.invoke('load_database', ''),
    editDatabase: (id, name) => ipcRenderer.invoke('edit_database', id, name),
    removeDatabase: (id) => ipcRenderer.invoke('remove_database', id),
    addDatabase: (dir, name) => ipcRenderer.send('add_database', dir, name),
    
    // ディレクトリ操作
    loadDir: (path) => ipcRenderer.send('load_dir', path),
    
    // アプリケーション起動
    lunchApp: (id) => ipcRenderer.send('lunch_app', id),
    
    // ダイアログ表示
    showOpenDialog: (options) => ipcRenderer.invoke('show-open-dialog', options),
    
    // イベントリスナー
    on: (channel, callback) => {
        const validChannels = ['res_load_dir', 'res_add_database', 'run_err'];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => callback(...args));
        }
    },
    
    // クリーンアップ
    removeAllListeners: (channel) => {
        ipcRenderer.removeAllListeners(channel);
    }
});

// ログ機能を追加
contextBridge.exposeInMainWorld('log', {
    debug: (...args) => console.debug(...args),
    info: (...args) => console.info(...args),
    warn: (...args) => console.warn(...args),
    error: (...args) => console.error(...args)
});