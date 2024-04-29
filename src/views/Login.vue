<template>
    <div class="login_container">
        <div class="login_box">
            <el-form class="login_form">
                <div class="title">通用后台管理系统</div>
                <el-form-item prop="username">
                    <el-input v-model="username" placeholder="请输入用户名" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="password" placeholder="请输入密码" prefix-icon="el-icon-key"></el-input>
                </el-form-item>
                <el-form-item prop="验证码">
                    <el-input placeholder="验证码" prefix-icon="el-icon-loading" style="width: 200px;float: left;"
                        maxlength="4" />
                    <el-image class="captchaImg" style="width: 150px; float: left;" :src="image" @click="getCaptcha" />
                </el-form-item>
                <el-form-item>
                    <el-row :gutter="20">
                        <el-col :span="12" :offset="0">
                            <el-button type="primary" style="width: 100%; font-size: large;">登录</el-button>
                        </el-col>
                        <el-col :span="12" :offset="0">
                            <el-button type="info" style="width: 100%; font-size: large;">重置</el-button>
                        </el-col>
                    </el-row>

                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: "Login",
    data() {
        return {
            image: ""

        }
    },
    methods: {
        // 获取验证码
        async getCaptcha() {
            const { data: res } = await this.$api.captcha()
            console.log("获取验证码res数据：", res)
            if (res.code !== 200) {
                this.$message.error(res.message)
            } else {
                this.image = res.data.image
            }
        }

    },
    created() {
        this.getCaptcha()
    }
}
</script>


<style lang="less" scoped>
.login_container {
    background-image: url("../assets/image/login-background.jpg");
    background-size: cover;
    height: 100%;

    .login_box {
        width: 400px;
        height: 330px;
        background-color: #fff;
        border-radius: 1px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .login_form {
            position: absolute;
            bottom: 0;
            widows: 100%;
            padding: 0 20px;
            box-sizing: border-box;
        }

        .title {
            font-size: 23px;
            line-height: 1.5;
            text-align: center;
            margin-bottom: 20px;
            font-weight: bold;
            font-style: italic;
        }

        .captchaImg {
            height: 38px;
            width: 100%;
            border: 1px solid #e6e6e6;
            margin-left: 8px;
        }
    }
}
</style>