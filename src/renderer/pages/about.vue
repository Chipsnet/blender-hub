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
                <p class="sub-title">{{ $t("about.author") }}</p>
                <p class="text-nospace">巳波みなと</p>
                <a
                    href="#"
                    class="text-nospace"
                    @click.prevent.stop="openBrowser('https://minato86.me')"
                    >https://minato86.me</a
                ><br>
                <a
                    href="#"
                    class="text-nospace"
                    @click.prevent.stop="openBrowser('https://twitter.com/minatoo86')"
                    >@minatoo86</a
                >
            </el-col>
        </el-row>
        <p class="sub-title">{{$t('about.openSourceTitle')}}</p>
        <nuxt-link to="/">{{$t('about.openSourceLink')}}</nuxt-link>
        <p class="text-nospace">{{$t('about.textOpenSource')}}</p>
        <p class="sub-title">{{$t('about.pochipochi')}}</p>
    </div>
</template>

<script>
import { shell } from "electron";

export default {
    data() {
        return {
            version: require("./../../../package.json").version,
            chrome: process.versions.chrome,
            electron: process.versions.electron,
            node: process.versions.node
        };
    },
    methods: {
        openBrowser(url) {
            shell.openExternal(url);
        }
    }
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
