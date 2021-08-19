<template>
    <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6"
            ><span class="software-title"
                ><i class="el-icon-suitcase"></i> BlenderHub</span
            ></el-col
        >
        <el-col :span="6" style="text-align:right">
            <el-dropdown>
                <el-button icon="el-icon-location-outline" circle></el-button>
                <el-dropdown-menu slot="dropdown">
                    <a href="#" @click.prevent.stop="$i18n.setLocale('ja')"
                        ><el-dropdown-item>日本語</el-dropdown-item></a
                    >
                    <a href="#" @click.prevent.stop="$i18n.setLocale('en')"
                        ><el-dropdown-item>English</el-dropdown-item></a
                    >
                </el-dropdown-menu>
            </el-dropdown></el-col
        >
    </el-row>
</template>

<style>
a {
    color: #303133;
    text-decoration: none;
}

.software-title {
    color: #ffffff;
}
</style>
