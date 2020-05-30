const electron = window.electron
const ipcRenderer = electron.ipcRenderer
const dialog = electron.remote.dialog

// html elements
const installed_html = document.getElementById('installed')
const drop = document.getElementById('upload')
const selectZip = document.getElementById('select-zip')
const selectFolder = document.getElementById('select-folder')
const registSetting = document.getElementById('regist_setting')
const installModal = document.getElementById('add')
const settingModal = document.getElementById('setting')
const loadingModal = document.getElementById('loading')
const refreshButton = document.getElementById('refresh')
const inputDir = document.getElementById('dir')
const inputName = document.getElementById('regist_name')

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
            <p class="uk-text-bolder">フォルダの場所: ${arg.versions[key].dir}</p>
            <button data-id="${key}" class="uk-button uk-button-primary" onclick="lunch(this)">起動</button>
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
        title: 'インストール済みBlenderを登録する'
    }).then(result => {
        if (!result.canceled) {
            console.log(result.filePaths[0]);
            UIkit.modal(installModal).hide();
            UIkit.modal(loadingModal).show();
            UIkit.util.on('#loading', 'show', () => ipcRenderer.send('load_dir', result.filePaths[0]))
        }
    })
})

// load_dirの結果
ipcRenderer.on('res_load_dir', (event, ...args) => {
    UIkit.modal(loadingModal).hide();
    console.log(args);

    if (args[0]) {
        inputDir.value = args[1]
        UIkit.modal(settingModal).show()
    } else {
        UIkit.notification({ message: '指定されたディレクトリからblender.exeが検出されませんでした。', status: 'danger' })
    }
})

// 設定の保存
registSetting.addEventListener('click', () => {
    UIkit.modal(settingModal).hide();
    UIkit.modal(loadingModal).show();
    UIkit.util.on('#loading', 'show', () => ipcRenderer.send('add_database', inputDir.value, inputName.value))
})

// add_databaseの結果
ipcRenderer.on('res_add_database', (event, ...args) => {
    UIkit.modal(loadingModal).hide();
    if (args) {
        document.location.reload()
    } else {
        UIkit.notification({ message: 'エラーが発生しました。ERR: ' + args[1], status: 'danger' })
    }
})

const lunch = (arg) => {
    let id = arg.getAttribute("data-id")
    console.log(id);
    UIkit.notification({ message: '起動をやっています...', status: 'primary' })
    ipcRenderer.send('lunch_app', id)
}

// 画面の更新
refreshButton.addEventListener('click', () => {
    document.location.reload()
})