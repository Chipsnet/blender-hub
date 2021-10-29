<template>
    <div>
        <span>hello</span>
    </div>
</template>

<script>
const { app } = require('@electron/remote')

export default {
    middleware: 'startup',
    data() {
        return {
            viewSwitch: false,
        };
    },
    methods: {
        openURL(url) {
            remote.shell.openExternal(url);
        },
        openNotify() {
            this.$notify({
                title: "Prompt",
                message: "あんりみっしゅ",
            });
        },
    },
};
</script>