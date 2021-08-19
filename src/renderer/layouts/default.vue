<template>
    <el-container style="height: 100vh">
        <el-header style="font-size: 12px">
            <span>BlenderHub</span>
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
export default {
    components: { sidebar }
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
