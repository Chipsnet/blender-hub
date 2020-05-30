const electron = window.electron
const ipcRenderer = electron.ipcRenderer
const dialog = electron.remote.dialog

// html elements
const installed_html = document.getElementById('installed')
const drop = document.getElementById('upload')
const selectZip = document.getElementById('select-zip')
const selectFolder = document.getElementById('select-folder')
const installModal = document.getElementById('add')
const settingModal = document.getElementById('setting')
const refreshButton = document.getElementById('refresh')

// ipcでデータベースを要求
ipcRenderer.send('load_database', 'load')

// indexjsからの送信をキャッチ
ipcRenderer.on('send_database', (event, arg) => {
    console.log(arg);

    if (arg.versions.length == 0) {
        installed_html.innerHTML = `<div class="uk-alert-danger" uk-alert>
            <p>インストール済みまたは登録されたBlenderがありません。<br>インストール済みのBlenderを登録するか、新規にインストールしてください。</p></div>`
    } else {
        let html_data = ""

        for (const key in arg.versions) {
            console.log(arg.versions[key]);
            html_data += `<div class="uk-card uk-card-default uk-card-body">
            <h3 class="uk-card-title">${arg.versions[key].name}</h3>
            <p class="uk-text-bolder">フォルダの場所: ${arg.versions[key].path}</p>
            <button class="uk-button uk-button-primary" onclick="lunch()">起動</button>
            </div>`
        }

        installed_html.innerHTML = html_data
    }
})

// ファイルドロップ時の動作
// Source by https://qiita.com/nyamogera/items/3b74afa3ccb65ae918d7
drop.ondragover = function () {
    return false
};

drop.ondragleave = drop.ondragend = function () {
    return false
};

drop.ondrop = function (e) {
    e.preventDefault()

    var file = e.dataTransfer.files[0]
    console.log(file.path)

    return false
};

// ファイルの選択
selectZip.addEventListener('click', () => {
    dialog.showOpenDialog(null, {
        properties: ['openFile'],
        title: 'インストールするzipファイルの選択',
        defaultPath: '.',
        filters: [
            { name: 'zipファイル', extensions: ['zip'] }
        ]
    }).then(result => {
        if (!result.canceled) {
            console.log(result.filePaths[0]);
            UIkit.modal(installModal).hide();
        }
    })
})

// インストール済みのBlender登録
selectFolder.addEventListener('click', () => {
    dialog.showOpenDialog(null, {
        properties: ['openDirectory'],
        title: 'インストール済みBlenderを登録する',
        defaultPath: 'C:\\Program Files\\Blender Foundation',
    }).then(result => {
        if (!result.canceled) {
            console.log(result.filePaths[0]);
            UIkit.modal(installModal).hide();
            UIkit.modal(settingModal).show()
        }
    })
})

// 画面の更新
refreshButton.addEventListener('click', () => {
    document.location.reload()
})