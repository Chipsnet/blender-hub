(function() {
    'use strict';
    
    // このスクリプトは一度だけ実行されることを確認
    if (window.mainJsLoaded) {
        console.warn('main.js is already loaded, skipping...');
        return;
    }
    window.mainJsLoaded = true;

    // module
    const electronAPI = window.electronAPI;
    const log = window.log;

    // html elements
    let content, installedList, installedCard, selectFolder, registSetting;
    let settingModal, loadingModal, editModal, refreshButton;
    let inputDir, inputName, editButton, deleteButton, editName, editDir;

    // データベース
    let db = null;

    // グローバル関数として定義（HTML内のonclickから呼び出せるように）
    window.lunch = (arg) => {
        let id = arg.getAttribute("data-id");
        console.log(id);
        UIkit.notification({ message: '起動しています...', status: 'primary' });
        electronAPI.lunchApp(id);
    };

    // プロパティボタンが押されたとき
    window.edit = (arg) => {
        let id = arg.getAttribute('data-id');
        editButton.setAttribute('data-id', id);
        deleteButton.setAttribute('data-id', id);
        console.log(db.versions[id].dir, db.versions[id].name);
        editDir.value = db.versions[id].dir;
        editName.value = db.versions[id].name;
        UIkit.modal(editModal).show();
    };

    // プロパティ保存ボタンクリック時の動作
    window.save = async (arg) => {
        UIkit.modal(editModal).hide().then(async () => {
            UIkit.modal(loadingModal).show().then(async () => {
                let id = arg.getAttribute('data-id');
                let name = editName.value;
                let saveRes = await electronAPI.editDatabase(id, name);
                if (saveRes[0]) {
                    // リロードの代わりにUIを再描画
                    db = await electronAPI.loadDatabase();
                    initializeUI();
                    UIkit.modal(loadingModal).hide();
                } else {
                    UIkit.modal(loadingModal).hide().then(() => {
                        UIkit.notification({ message: '書き込み中にエラーが発生しました。ERR: '+saveRes[1], status: 'danger' });
                    });
                }
            });
        });
    };

    // プロパティ削除ボタンクリック時の動作
    window.remove = async (arg) => {
        UIkit.modal(editModal).hide().then(async () => {
            UIkit.modal(loadingModal).show().then(async () => {
                let id = arg.getAttribute('data-id');
                let removeRes = await electronAPI.removeDatabase(id);
                if (removeRes[0]) {
                    // リロードの代わりにUIを再描画
                    db = await electronAPI.loadDatabase();
                    initializeUI();
                    UIkit.modal(loadingModal).hide();
                } else {
                    UIkit.modal(loadingModal).hide().then(() => {
                        UIkit.notification({ message: '削除中にエラーが発生しました。ERR: '+removeRes[1], status: 'danger' });
                    });
                }
            });
        });
    };

    // データベースを読み込む
    async function loadDatabase() {
        try {
            db = await electronAPI.loadDatabase();
            initializeUI();
        } catch (error) {
            console.error('Failed to load database:', error);
        }
    }

    // UI初期化関数
    function initializeUI() {
        // dbのパース
        if (!db || !db.versions || db.versions.length == 0) {
            content.innerHTML = `<div class="uk-alert-danger" uk-alert>
                <p>インストール済みまたは登録されたBlenderがありません。<br>インストール済みのBlenderを登録するか、新規にインストールしてください。</p></div>`;
        } else {
            let html_data = "";
            let card_html_data = "";

            for (const key in db.versions) {
                console.log(db.versions[key]);

                html_data += `<div class="uk-margin-small uk-card uk-card-default uk-card-body">
                    <h3 class="uk-card-title">${db.versions[key].name}</h3>
                    <p class="uk-text-bolder">フォルダの場所: ${db.versions[key].dir}</p>
                    <button data-id="${key}" class="uk-button uk-button-primary" onclick="lunch(this)">起動</button>
                    <button data-id="${key}" onclick="edit(this)" class="uk-icon-link" uk-icon="cog" style="margin: 0.2em 0 0 1em;"></button>
                    </div>`;

                card_html_data += `<div class="uk-card uk-card-default uk-card-body">
                    <img class="uk-border-circle" width="40" height="40" src="../img/blender.png">
                    <h3 class="uk-card-title uk-margin-remove">${db.versions[key].name}</h3>
                    <p title="${db.versions[key].dir}">${db.versions[key].dir}</p>
                    <div class="uk-margin-top"><button data-id="${key}" class="uk-button uk-button-primary uk-button-small" onclick="lunch(this)">起動</button>
                    <button data-id="${key}" onclick="edit(this)" class="uk-icon-link uk-margin-small-left" uk-icon="cog"></button></div></div>`;
            }

            installedList.innerHTML = html_data;
            installedCard.innerHTML = card_html_data;
        }
    }

    // イベントリスナーの設定
    function setupEventListeners() {
        // インストール済みのBlender登録
        selectFolder.addEventListener('click', async () => {
            const result = await electronAPI.showOpenDialog({
                properties: ['openDirectory'],
                title: 'インストール済みBlenderを登録する'
            });
            
            if (!result.canceled) {
                UIkit.modal(loadingModal).show().then(() => {
                    electronAPI.loadDir(result.filePaths[0]);
                });
            }
        });

        // load_dirの結果
        electronAPI.on('res_load_dir', (...args) => {
            UIkit.modal(loadingModal).hide().then(() => {
                if (args[0]) {
                    inputDir.value = args[1];
                    UIkit.modal(settingModal).show();
                } else {
                    const blenderFile = window.navigator.platform.includes('Mac') ? 'Blender.app' : 'blender.exe';
                    UIkit.notification({ message: `指定されたディレクトリから${blenderFile}が検出されませんでした。`, status: 'danger' });
                }
            });
        });

        // 設定の保存
        registSetting.addEventListener('click', () => {
            UIkit.modal(settingModal).hide().then(() => {
                UIkit.modal(loadingModal).show().then(() => {
                    electronAPI.addDatabase(inputDir.value, inputName.value);
                });
            });
        });

        // add_databaseの結果
        electronAPI.on('res_add_database', async (...args) => {
            UIkit.modal(loadingModal).hide();
            if (args[0]) {
                // リロードの代わりにUIを再描画
                db = await electronAPI.loadDatabase();
                initializeUI();
            } else {
                UIkit.notification({ message: 'エラーが発生しました。ERR: ' + args[1], status: 'danger' });
            }
        });

        // 実行中のエラー
        electronAPI.on('run_err', (arg) => {
            UIkit.notification({ message: 'エラーが発生しました。ERR: ' + arg, status: 'danger' });
        });

        // 画面の更新
        refreshButton.addEventListener('click', async () => {
            db = await electronAPI.loadDatabase();
            initializeUI();
        });
    }

    // DOMContentLoadedを待つ
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    function initialize() {
        // HTML要素を取得
        content = document.getElementById('content');
        installedList = document.getElementById('installed_list');
        installedCard = document.getElementById('installed_card');
        selectFolder = document.getElementById('select-folder');
        registSetting = document.getElementById('regist_setting');
        settingModal = document.getElementById('setting');
        loadingModal = document.getElementById('loading');
        editModal = document.getElementById('edit');
        refreshButton = document.getElementById('refresh');
        inputDir = document.getElementById('dir');
        inputName = document.getElementById('regist_name');
        editButton = document.getElementById('edit_setting');
        deleteButton = document.getElementById('delete_setting');
        editName = document.getElementById('edit_name');
        editDir = document.getElementById('edit_dir');

        // データベースを読み込む
        loadDatabase();

        // イベントリスナーを設定
        setupEventListeners();
    }
})();