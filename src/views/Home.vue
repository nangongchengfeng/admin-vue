<template>
    <el-container class="home-container">
        <el-aside width="200px">
            <div class="logo">
                <img src="../assets/image/logo.jpg" class="sidebar-logo">
                <h3 class="logo-title">
                    <p>通用后台管理系统</p>
                </h3>
            </div>
        </el-aside>
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

        .logo {
            margin-top: 5px;
            display: flex;
            align-items: center;
            font-size: 14px;
            /* 稍微增大字体大小 */
            color: #333;
            /* 更柔和的颜色 */
            font-style: italic;
            height: 50px;
            font-family: "楷体", "楷体_GB2312";
            /* 更换为无衬线字体 */
            font-weight: 300;
            /* 轻字体权重 */
            line-height: 1.5;
            /* 增加行间距 */

            .sidebar-logo {
                width: 32px;
                height: 32px;
                margin: 0 16px;
                border-radius: 5px;

            }

        }
    }

    .el-header {
        background-color: #435466;
    }

    .el-main {
        background-color: #204b75;
    }

}
</style>