<template>
    <div>
        <h1 class="title">{{ $t("about.title") }}</h1>
        <el-row>
            <el-col :span="12">
                <p class="sub-title">{{ $t("about.version") }}</p>
                <p>
                    BlenderHub <el-tag size="mini">v {{ version }}</el-tag>
                </p>
            </el-col>
            <el-col :span="12">
                <p class="sub-title">{{ $t("about.dependencies") }}</p>
                <p class="text-nospace">
                    Chromium <el-tag size="mini">v {{ chrome }}</el-tag>
                </p>
                <p class="text-nospace">
                    Electron <el-tag size="mini">v {{ electron }}</el-tag>
                </p>
                <p class="text-nospace">
                    Node.js <el-tag size="mini">v {{ node }}</el-tag>
                </p>
            </el-col>
            <el-col :span="12">
                <p class="sub-title">{{ $t("about.platform") }}</p>
                <p>
                    {{ platform }}
                </p>
            </el-col>
            <el-col :span="12">
                <p class="sub-title">{{ $t("about.author") }}</p>
                <p class="text-nospace">巳波みなと</p>
                <a
                    href="#"
                    class="text-nospace"
                    @click.prevent.stop="openBrowser('https://minato86.me')"
                    >https://minato86.me</a
                ><br />
                <a
                    href="#"
                    class="text-nospace"
                    @click.prevent.stop="
                        openBrowser('https://twitter.com/minatoo86')
                    "
                    >@minatoo86</a
                >
            </el-col>
        </el-row>
        <p class="sub-title">{{ $t("about.openSourceTitle") }}</p>
        <!-- Table -->
        <a
            href="#"
            class="text-nospace"
            @click.prevent.stop="openOpenSourceDialog = true"
            >{{$t("about.openSourceLink")}}</a
        >
        <p class="text-nospace">{{ $t("about.textOpenSource") }}</p>
        <p class="sub-title">{{ $t("about.pochipochi") }}</p>

        <el-dialog :title="$t('about.dialog.title')" width="70%" :visible.sync="openOpenSourceDialog">
            <el-table :data="gridData">
                <el-table-column
                    property="date"
                    label="Date"
                    width="150"
                ></el-table-column>
                <el-table-column
                    property="name"
                    label="Name"
                    width="200"
                ></el-table-column>
                <el-table-column
                    property="address"
                    label="Address"
                ></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import { shell } from "electron";
import os from "os";

export default {
    data() {
        return {
            version: require("./../../../package.json").version,
            chrome: process.versions.chrome,
            electron: process.versions.electron,
            node: process.versions.node,
            platform: `${os.type()} ${os.release()}`,
            openOpenSourceDialog: false
        };
    },
    methods: {
        openBrowser(url) {
            shell.openExternal(url);
        },
    },
};
</script>

<style scoped>
.title {
    margin-top: 0;
}

.sub-title {
    font-weight: bold;
}

.text-nospace {
    margin: 0;
}

a {
    color: #409eff;
}
</style>
