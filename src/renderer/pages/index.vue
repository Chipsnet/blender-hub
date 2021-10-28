<template>
    <div>
        <el-switch
            v-model="viewSwitch"
            :active-text="$t('button.activeListView')"
            :inactive-text="$t('button.activeCardView')"
        >
        </el-switch>
        <div id="cardview" v-if="!viewSwitch">
            <el-row :gutter="5">
<el-col :span="8" class="cardview-space">
                    <div class="grid-content bg-purple">
                        <el-card
                            :body-style="{ padding: '0px' }"
                            shadow="hover"
                        >
                            <div style="padding: 14px">
                                <img src="~/assets/blender_logo.svg" style="margin: 20px 0;" alt="" srcset="">
                                <p>Blender 2.90</p>
                                <p class="blender-path">
                                    /Applications/blender.app
                                </p>
                                <div class="bottom clearfix">
                                    <el-button
                                        style="margin-top: 10px"
                                        type="primary"
                                        size="mini"
                                        icon="el-icon-sunny"
                                        >起動</el-button
                                    >
                                    <i
                                        style="margin: 0 0 0 5px"
                                        class="el-icon-setting"
                                    ></i>
                                    <i
                                        style="margin: 0 0 0 5px"
                                        class="el-icon-document-delete"
                                    ></i>
                                </div>
                            </div>
                        </el-card></div
                ></el-col>
                <el-col :span="8" class="cardview-space">
                    <div class="grid-content bg-purple">
                        <el-card
                            :body-style="{ padding: '0px' }"
                            shadow="hover"
                        >
                            <div style="padding: 14px">
                                <img src="~/assets/blender_logo.svg" style="margin: 20px 0;" alt="" srcset="">
                                <p>Blender 2.90</p>
                                <p class="blender-path">
                                    /Applications/blender.app
                                </p>
                                <div class="bottom clearfix">
                                    <el-button
                                        style="margin-top: 10px"
                                        type="primary"
                                        size="mini"
                                        icon="el-icon-sunny"
                                        >起動</el-button
                                    >
                                    <i
                                        style="margin: 0 0 0 5px"
                                        class="el-icon-setting"
                                    ></i>
                                    <i
                                        style="margin: 0 0 0 5px"
                                        class="el-icon-document-delete"
                                    ></i>
                                </div>
                            </div>
                        </el-card></div
                ></el-col>
                <el-col :span="8" class="cardview-space">
                    <div class="grid-content bg-purple">
                        <el-card
                            :body-style="{ padding: '0px' }"
                            shadow="hover"
                        >
                            <div style="padding: 14px">
                                <img src="~/assets/blender_logo.svg" style="margin: 20px 0;" alt="" srcset="">
                                <p>Blender 2.90</p>
                                <p class="blender-path">
                                    /Applications/blender.app
                                </p>
                                <div class="bottom clearfix">
                                    <el-button
                                        style="margin-top: 10px"
                                        type="primary"
                                        size="mini"
                                        icon="el-icon-sunny"
                                        >起動</el-button
                                    >
                                    <i
                                        style="margin: 0 0 0 5px"
                                        class="el-icon-setting"
                                    ></i>
                                    <i
                                        style="margin: 0 0 0 5px"
                                        class="el-icon-document-delete"
                                    ></i>
                                </div>
                            </div>
                        </el-card></div
                ></el-col>
            </el-row>
        </div>
        <div id="listview" v-if="viewSwitch">
            <el-card class="box-card" shadow="hover">
                <div class="header-flex">
                    <div>
                        <p>Blender 2.90</p>
                        <p class="blender-path">/Applications/blender.app</p>
                    </div>
                    <div class="button">
                        <i
                            style="margin: 0 5px 0 0"
                            class="el-icon-setting"
                        ></i>
                        <i
                            style="margin: 0 5px 0 0"
                            class="el-icon-document-delete"
                        ></i>
                        <el-button
                            style="margin-left: 7px"
                            type="primary"
                            size="small"
                            icon="el-icon-sunny"
                            >起動</el-button
                        >
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
const { app } = require('@electron/remote')

export default {
    middleware: 'startUp',
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

<style>
.e-nuxt-container {
    min-height: calc(100vh - 50px);
    background: linear-gradient(to right, #ece9e6, #ffffff);
    font-family: Helvetica, sans-serif;
}

.e-nuxt-content {
    display: flex;
    justify-content: space-around;
    padding-top: 100px;
    align-items: flex-start;
    flex-wrap: wrap;
}

.e-nuxt-logo {
    width: 400px;
}

.e-nuxt-system-info {
    padding: 20px;
    border-top: 1px solid #397c6d;
    border-bottom: 1px solid #397c6d;
}

.e-nuxt-links {
    padding: 100px 0;
    display: flex;
    justify-content: center;
}

.e-nuxt-button {
    color: #364758;
    padding: 5px 20px;
    border: 1px solid #397c6d;
    margin: 0 20px;
    border-radius: 15px;
    font-size: 1rem;
}

.e-nuxt-button:hover {
    cursor: pointer;
    color: white;
    background-color: #397c6d;
}

.box-card {
    margin: 20px 0;
}

.header-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-flex p {
    margin: 0;
}

.button i {
    cursor: pointer;
    font-size: 1.1em;
}

.blender-path {
    font-size: 0.9rem;
    color: #747474;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
}

#cardview {
    margin: 20px 0;
}

#cardview p {
    margin: 0;
}

#cardview i {
    cursor: pointer;
}

.cardview-space {
    margin-bottom: 10px;
}
</style>
