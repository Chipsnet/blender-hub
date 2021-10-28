const { app } = require('@electron/remote')

export default function({ store, params }) {
    console.log("test");
    // ここに起動したときにDB検証するやつを書く
    console.log(app.getPath('userData'));
}
