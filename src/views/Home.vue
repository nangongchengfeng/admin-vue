<template>
    <el-container class="home-container">
        <el-aside width="200px">aside</el-aside>
        <el-container>
            <el-header>header</el-header>
            <el-main>main</el-main>
        </el-container>

    </el-container>
</template>
<script>
export default {
    name: "Home",
    data() {
        return {};
    },
    created() { },
    methods: {}
};
</script>
<style lang="less" scoped>
.home-container {
    height: 100%;

    .el-aside {
        background-color: #d3dce6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-header {
        background-color: #435466;
    }

    .el-main {
        background-color: #204b75;
    }

}
</style>