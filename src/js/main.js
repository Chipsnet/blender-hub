const electron = window.electron
const ipcRenderer = electron.ipcRenderer
const dialog = electron.remote.dialog

// html elements
const content = document.getElementById('content')
const installedList = document.getElementById('installed_list')
const installedCard = document.getElementById('installed_card')
const drop = document.getElementById('upload')
const selectZip = document.getElementById('select-zip')
const selectFolder = document.getElementById('select-folder')
const registSetting = document.getElementById('regist_setting')
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
        content.innerHTML = `<div class="uk-alert-danger" uk-alert>
            <p>インストール済みまたは登録されたBlenderがありません。<br>インストール済みのBlenderを登録するか、新規にインストールしてください。</p></div>`
    } else {
        let html_data = ""
        let card_html_data = ""

        for (const key in arg.versions) {
            console.log(arg.versions[key]);
            html_data += `<div class="uk-card uk-card-default uk-card-body">
            <h3 class="uk-card-title">${arg.versions[key].name}</h3>
            <p class="uk-text-bolder">フォルダの場所: ${arg.versions[key].dir}</p>
            <button data-id="${key}" class="uk-button uk-button-primary" onclick="lunch(this)">起動</button>
            </div>`

            card_html_data += `<div class="uk-card uk-card-default uk-card-body">
            <img class="uk-border-circle" width="40" height="40" src="../img/blender.png">
            <h3 class="uk-card-title uk-margin-remove">${arg.versions[key].name}</h3>
            ${arg.versions[key].dir}<button data-id="${key}" class="uk-button uk-button-primary uk-button-small uk-margin-top"
            onclick="lunch(this)">起動</button></div>`
        }

        installedList.innerHTML = html_data
        installedCard.innerHTML = card_html_data
    }
})

// インストール済みのBlender登録
selectFolder.addEventListener('click', () => {
    dialog.showOpenDialog(null, {
        properties: ['openDirectory'],
        title: 'インストール済みBlenderを登録する'
    }).then(result => {
        if (!result.canceled) {
            console.log(result.filePaths[0]);
            UIkit.util.on('#loading', 'show', () => {
                ipcRenderer.send('load_dir', result.filePaths[0])
            })
            UIkit.modal(loadingModal).show();
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

// 実行中のエラー
ipcRenderer.on('run_err', (event, arg) => {
    UIkit.notification({ message: 'エラーが発生しました。ERR: ' + arg, status: 'danger' })
})

const lunch = (arg) => {
    let id = arg.getAttribute("data-id")
    console.log(id);
    UIkit.notification({ message: '起動しています...', status: 'primary' })
    ipcRenderer.send('lunch_app', id)
}

// 画面の更新
refreshButton.addEventListener('click', () => {
    document.location.reload()
})