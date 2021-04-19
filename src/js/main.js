// module
const electron = window.electron
const log = window.log
const ipcRenderer = electron.ipcRenderer
const dialog = electron.remote.dialog
const config = window.config
const require = window.require;
let $ = jQuery = require('./jquery.js');

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
const editModal = document.getElementById('edit')
const refreshButton = document.getElementById('refresh')
const infoButton = document.getElementById('toggle_info')
const inputDir = document.getElementById('dir')
const inputName = document.getElementById('regist_name')
const editButton = document.getElementById('edit_setting')
const deleteButton = document.getElementById('delete_setting')
const editName = document.getElementById('edit_name')
const editDir = document.getElementById('edit_dir')

// infoへのデータの受け渡し
$("#version").html(config.version)

// ipcでデータベースを要求
const db = ipcRenderer.sendSync('load_database', '')

// dbのパース
if (db.versions.length == 0) {
    content.innerHTML = `<div class="uk-alert-danger" uk-alert>
        <p>インストール済みまたは登録されたBlenderがありません。<br>インストール済みのBlenderを登録するか、新規にインストールしてください。</p></div>`
} else {
    let html_data = ""
    let card_html_data = ""

    for (const key in db.versions) {
        console.log(db.versions[key]);

        html_data += `<div class="uk-margin-small uk-card uk-card-default uk-card-body">
            <h3 class="uk-card-title">${db.versions[key].name}</h3>
            <p class="uk-text-bolder">フォルダの場所: ${db.versions[key].dir}</p>
            <button data-id="${key}" class="uk-button uk-button-primary" onclick="lunch(this)">起動</button>
            <button id="refresh" data-id="${key}" onclick="edit(this)" class="uk-icon-link" uk-icon="cog" style="margin: 0.2em 0 0 1em;"></button>
            </div>`

        card_html_data += `<div class="uk-card uk-card-default uk-card-body">
            <img class="uk-border-circle" width="40" height="40" src="../img/blender.png">
            <h3 class="uk-card-title uk-margin-remove">${db.versions[key].name}</h3>
            <p title="${db.versions[key].dir}">${db.versions[key].dir}</p>
            <div class="uk-margin-top"><button data-id="${key}" class="uk-button uk-button-primary uk-button-small" onclick="lunch(this)">起動</button>
            <button id="refresh" data-id="${key}" onclick="edit(this)" class="uk-icon-link uk-margin-small-left" uk-icon="cog"></button></div></div>`
    }

    installedList.innerHTML = html_data
    installedCard.innerHTML = card_html_data
}

// 翻訳文の挿入


// インストール済みのBlender登録
selectFolder.addEventListener('click', () => {
    dialog.showOpenDialog(null, {
        properties: ['openDirectory'],
        title: 'インストール済みBlenderを登録する'
    }).then(result => {
        if (!result.canceled) {
            UIkit.modal(loadingModal).show().then(() => {
                ipcRenderer.send('load_dir', result.filePaths[0])
            });
        }
    })
})

// load_dirの結果
ipcRenderer.on('res_load_dir', (event, ...args) => {
    UIkit.modal(loadingModal).hide().then(() => {
        if (args[0]) {
            inputDir.value = args[1]
            UIkit.modal(settingModal).show()
        } else {
            UIkit.notification({ message: '指定されたディレクトリからblender.exeが検出されませんでした。', status: 'danger' })
        }
    })
})

// 設定の保存
registSetting.addEventListener('click', () => {
    UIkit.modal(settingModal).hide().then(() => {
        UIkit.modal(loadingModal).show().then(() => {
            ipcRenderer.send('add_database', inputDir.value, inputName.value)
        });
    })
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

ipcRenderer.on('test', (event, arg) => {
    console.log(arg);
})

const lunch = (arg) => {
    let id = arg.getAttribute("data-id")
    console.log(id);
    UIkit.notification({ message: '起動しています...', status: 'primary' })
    ipcRenderer.send('lunch_app', id)
}

// プロパティボタンが押されたとき
const edit = (arg) => {
    let id = arg.getAttribute('data-id')
    editButton.setAttribute('data-id', id)
    deleteButton.setAttribute('data-id', id)
    console.log(db.versions[id].dir, db.versions[id].name);
    editDir.value = db.versions[id].dir
    editName.value = db.versions[id].name
    UIkit.modal(editModal).show()
}

// プロパティ保存ボタンクリック時の動作
const save = (arg) => {
    UIkit.modal(editModal).hide().then(() => {
        UIkit.modal(loadingModal).show().then(() => {
            let id = arg.getAttribute('data-id')
            let name = editName.value
            let saveRes = ipcRenderer.sendSync('edit_database', id, name)
            if (saveRes[0]) {
                document.location.reload()
            } else {
                UIkit.modal(loadingModal).hide().then(() => {
                    UIkit.notification({ message: '書き込み中にエラーが発生しました。ERR: '+saveRes[1], status: 'danger' })
                });
            }
        });
    })
}

// プロパティ削除ボタンクリック時の動作
const remove = (arg) => {
    UIkit.modal(editModal).hide().then(() => {
        UIkit.modal(loadingModal).show().then(() => {
            let id = arg.getAttribute('data-id')
            let removeRes = ipcRenderer.sendSync('remove_database', id)
            if (removeRes[0]) {
                document.location.reload()
            } else {
                UIkit.modal(loadingModal).hide().then(() => {
                    UIkit.notification({ message: '削除中にエラーが発生しました。ERR: '+removeRes[1], status: 'danger' })
                });
            }
        });
    })
}

// 画面の更新
refreshButton.addEventListener('click', () => {
    document.location.reload()
})