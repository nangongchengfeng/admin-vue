<template>
    <el-container class="home-container">
        <el-aside :width="isCollapse ? '64px' : '200px'">
            <div class="logo">
                <img src="../assets/image/logo.jpg" class="sidebar-logo">
                <h3 class="logo-title" v-show="!isCollapse">
                    <p>通用后台管理系统</p>
                </h3>

            </div>
            <el-menu background-color="#304156" text-color="#fff" unique-opened router :default-active="$route.path"
                :collapse="isCollapse" :collapse-transition="false">
                <!--
                循环遍历noChildren数组中的每个项目，生成无子集菜单的<el-menu-item>元素。
                :index 通过拼接'/'和item.url为每个菜单项设置唯一标识。
                :key    使用item.menuName作为Vue中v-for循环的唯一键值。
                -->
                <el-menu-item :index="'/' + item.url" v-for="item in noChildren" :key="item.menuName"
                    @click="saveNavState('/' + item.url)">
                    <!-- 使用item.icon类为菜单项设置图标 -->
                    <i :class="item.icon"></i>
                    <!-- 设置菜单项的标题 -->
                    <template slot="title">
                        <span>{{ item.menuName }}</span>
                    </template>
                </el-menu-item>
                <!--有子集菜单-->
                <el-submenu :index="item.id + ''" v-for="item in hasChildren" :key="item.id">
                    <!-- 渲染子菜单项 -->
                    <template slot="title">
                        <i :class="item.icon"></i> <!-- 设置菜单项图标 -->
                        <span>{{ item.menuName }}</span> <!-- 显示菜单项名称 -->
                    </template>
                    <el-menu-item :index="'/' + subItem.url" v-for="subItem in item.menuSvoList" :key="subItem.id"
                        @click="saveNavState('/' + subItem.url)">
                        <!-- 渲染菜单项 -->
                        <template slot="title">
                            <i :class="subItem.icon"></i> <!-- 设置子菜单项图标 -->
                            <span>{{ subItem.menuName }}</span> <!-- 显示子菜单项名称 -->
                        </template>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <div class="fold-btn">
                    <i :class="collapseBtnClass" @click="toggleCollapse"></i>
                </div>
            </el-header>
            <el-main><router-view /></el-main>
        </el-container>

    </el-container>
</template>
<script>
import router from '@/router/router';
import storage from '@/utils/storage';
export default {
    name: "Home",
    data() {
        return {
            leftMenuList: storage.getItem("leftMenuList"),
            activePath: '',
            collapseBtnClass: "el-icon-s-fold",
            isCollapse: false,
        };
    },
    computed: {
        // 无子集
        noChildren() {
            return this.leftMenuList.filter(item => !item.menuSvoList);
        },
        // 有子集
        hasChildren() {
            return this.leftMenuList.filter(item => item.menuSvoList);
        }
    },
    created() { },
    methods: {
        // 点击路由跳转保持
        saveNavState(activePath) {
            storage.setItem('activePath', activePath)
            this.activePath = activePath
        },
        // 展开和折叠
        toggleCollapse() {
            this.isCollapse = !this.isCollapse
            if (this.isCollapse) {
                this.collapseBtnClass = 'el-icon-s-unfold'
            } else {
                this.collapseBtnClass = 'el-icon-s-fold'
            }
        }
    },
    components: { router }
};
</script>
<style lang="less" scoped>
.home-container {
    height: 100%;



    .el-aside {
        background-color: #304156;

        .logo {
            margin-top: 5px;
            display: flex;
            align-items: center;
            font-size: 14px;
            /* 稍微增大字体大小 */
            color: #f3f3f3;
            /* 更柔和的颜色 */
            font-style: italic;
            height: 50px;
            // font-family: 'KaiTi', 'STKaiti', serif;
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

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #f9fafc;
        align-items: center;
        justify-content: space-between;
        display: flex;

        .fold-btn {
            padding-top: 2px;
            font-size: 23px;
            cursor: pointer;
        }
    }

    .el-main {
        background-color: #f7fafd;
    }

}
</style>