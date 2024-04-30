<template>
    <div class="head-image">
        <span class="user-username">{{ sysAdmin.username }}</span>
        <el-dropdown>
            <img v-if="!sysAdmin.icon" src="./../assets/image/logo.jpg" class="user-avatar" />
            <img v-else :src="sysAdmin.icon" class="user-avatar" />
            <el-dropdown-menu>
                <el-dropdown-item>
                    <span @click="openPersonal">个人信息</span>
                </el-dropdown-item>
                <el-dropdown-item>
                    <span @click="logout">退出登录</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import storage from '@/utils/storage'
export default {
    name: "HeadImage",
    data() {
        return {
            sysAdmin: storage.getItem("sysAdmin")
        }
    },
    methods: {
        //跳转个人信息页面
        openPersonal() {
            this.$router.push("/personal")
        },
        //退出登录
        /**
         * 异步登出功能，首先会弹出确认框，如果用户确认登出，则清除本地存储的所有信息，并重定向到登录页。
         */
        async logout() {
            // 显示一个确认对话框，询问用户是否确定要退出登录
            const confirmResult = await this.$confirm('确定要退出登录吗, 是否继续?', '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err)

            // 如果用户取消了确认对话框，则显示信息提示，并终止登出流程
            if (confirmResult !== 'confirm') {
                return this.$message.info('退取消退出')
            }

            // 清除本地存储的所有信息
            this.$storage.clearAll()
            // 重定向到登录页
            this.$router.push("/login")
            // 提示登出成功
            this.$message.success('退出成功');
        },
    }

}
</script>

<style scoped lang="less">
/* 
    .user-username 样式定义了用户用户名的展示方式。
    该样式使得用户名在页面上固定位置显示，且具备一定的字体大小和顶部外边距。
*/

.user-username {
    position: fixed;
    /* 固定位置 */
    right: 70px;
    /* 距离页面右侧 70px */
    font-size: medium;
    /* 中等字体大小 */
    margin-top: 11px;
    /* 顶部外边距 11px */
}

/* 
    .user-avatar 样式定义了用户头像的展示方式。
    该样式使得头像具有可点击性，并定义了头像的尺寸和圆角。
*/
.user-avatar {
    cursor: pointer;
    /* 鼠标指针变为手型，表示可点击 */
    width: 40px;
    /* 头像宽度 40px */
    height: 40px;
    /* 头像高度 40px */
    border-radius: 10px;
    /* 头像圆角 10px */
}
</style>