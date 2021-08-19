<template>
    <el-container style="height: 100vh">
        <el-header>
            <topHeader />
        </el-header>
        <el-container>
            <sidebar />
            <el-main>
                <nuxt />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import sidebar from "@/components/sidebar";
import topHeader from "@/components/header";

export default {
    components: { sidebar, topHeader },
    methods: {
        switchLocale() {
            this.$i18n.locale = this.$i18n.locale === "en" ? "ja" : "en";
        }
    }
};
</script>

<style>
body {
    margin: 0 !important;
}

.el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
}
</style>
