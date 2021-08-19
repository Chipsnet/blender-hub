<template>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="1">
            <nuxt-link :to="localePath('index')">
                <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">Versions</span>
                </el-menu-item>
            </nuxt-link>
            <nuxt-link :to="localePath('projects')">
                <el-menu-item index="2">
                    <i class="el-icon-folder-opened"></i>
                    <span slot="title">Projects</span>
                </el-menu-item>
            </nuxt-link>
            <nuxt-link :to="localePath('about')">
                <el-menu-item index="3">
                    <i class="el-icon-info"></i>
                    <span slot="title">About</span>
                </el-menu-item>
            </nuxt-link>
        </el-menu>
    </el-aside>
</template>
