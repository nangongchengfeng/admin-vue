<template>
    <div class="app-container">
        <el-row :gutter="30" type="flex" class="row-bg" justify="center">
            <el-col :span="8">
                <el-card shadow="always">
                    <div slot="header" class="clearfix">
                        <span><el-button type="primary" icon="el-icon-s-platform" size="medium" circle /> 主机</span>
                    </div>
                    <el-descriptions direction="vertical" :column="2" border>
                        <el-descriptions-item v-for="( value, label ) in host" :key="label" :label="label">{{ value
                        }}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always">
                    <div slot="header" class="clearfix">
                        <span><el-button type="success" icon="el-icon-cpu" size="medium" circle /> CPU</span>
                    </div>
                    <el-descriptions direction="vertical" :column="2" border>
                        <el-descriptions-item v-for="( value, label ) in cpu" :key="label" :label="label">{{ value
                        }}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-col>
        </el-row>
        <br><br>
        <el-row :gutter="30" type="flex" class="row-bg" justify="center">
            <el-col :span="8">
                <el-card shadow="always">
                    <div slot="header" class="clearfix">
                        <span><el-button type="warning" icon="el-icon-set-up" size="medium" circle /> 内存</span>
                    </div>
                    <el-descriptions direction="vertical" :column="2" border>
                        <el-descriptions-item v-for="( value, label ) in memory" :key="label" :label="label">{{ value
                        }}</el-descriptions-item>
                    </el-descriptions>
                    <el-progress :text-inside="true" :percentage="pmem" :stroke-width="24" :color="customColorMethod" />
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always">
                    <div slot="header" class="clearfix">
                        <span><el-button type="info" icon="el-icon-coin" size="medium" circle /> 磁盘</span>
                    </div>
                    <el-descriptions direction="vertical" :column="3" border>
                        <el-descriptions-item v-for="( value, label ) in disk" :key="label" :label="label">{{ value
                        }}</el-descriptions-item>
                    </el-descriptions>
                    <el-progress :text-inside="true" :percentage="pdisk" :stroke-width="24" :color="customColorMethod" />
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            listLoading: true,
            host: {},
            cpu: {},
            memory: {},
            disk: {},
            pmem: 0,
            pdisk: 0
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        customColorMethod(percentage) {
            if (percentage < 40) {
                return '#67C23A'
            } else if (percentage < 80) {
                return '#E6A23C'
            } else {
                return '#F56C6C'
            }
        },
        async fetchData() {
            this.listLoading = true
            const { data: res } = await
                this.$api.getHostInfo()
            if (res.code !== 200) {
                this.$message.error(res.msg)
            } else {
                this.host = res.data.host
                this.cpu = res.data.cpu
                this.memory = res.data.memory
                this.disk = res.data.disk
                this.pmem = res.data.pmem
                this.pdisk = res.data.pdisk
                this.listLoading = false
            }
        },

    }
}
</script>

<style scoped lang="less">
.text {
    font-size: 14px;
}

.clearfix {
    font-size: 20px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 480px;
}
</style>
