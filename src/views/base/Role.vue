<template>
    <el-card>
        <!-- 搜索 -->
        <el-form :inline="true" :model="queryParams">
            <el-form-item label="角色名称" prop="roleName">
                <el-input size="mini" clearable v-model="queryParams.roleName" @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
            <el-form-item label="账号状态" prop="status">
                <el-select size="mini" placeholder="请选择账号状态" v-model="queryParams.status">
                    <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <!-- 开始时间 -->
            <el-form-item label="开始时间" prop="beginTime">
                <el-date-picker class="input-width" size="mini" type="date" style="width:190px" value-format="yyyy-MM-dd"
                    clearable placeholder="请选择开始时间" v-model="queryParams.beginTime" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <!-- 结束时间 -->
            <el-form-item label="结束时间" prop="endTime">
                <el-date-picker class="input-width" size="mini" type="date" style="width:190px" value-format="yyyy-MM-dd"
                    clearable placeholder="请选择结束时间" v-model="queryParams.endTime" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <!--  按钮 -->
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 操作按钮 -->
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button plain type="primary" icon="el-icon-plus" size="mini">
                    新增</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table v-loading="Loading" :data="roleList" border stripe style="width: 100%"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
            <el-table-column label="ID" prop="id" v-if="false" />
            <el-table-column label="角色名称" prop="roleName" />
            <el-table-column label="权限字符串" prop="roleKey" />
            <el-table-column label="创建时间" prop="createTime" />
            <el-table-column label="账号状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2" active-color="#13ce66"
                        inactive-color="#F5222D" active-text="启用" inactive-text="停用" @change="roleUpdateStatus(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="描述" prop="description" />

            <!-- 更多操作 -->
            <el-table-column label="更多操作">
                <template slot-scope="scope">
                    <el-button size="small" type="text" icon="el-icon-edit">编辑
                    </el-button>
                    <el-button size="small" type="text" icon="el-icon-delete">删除
                    </el-button>
                    <el-button size="small" type="text" icon="el-icon-setting">分配权限
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页区域-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="queryParams.pageNum" :page-sizes="[10, 50, 100, 500, 1000]" :page-size="queryParams.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </el-card>
</template>

<script>
export default {
    name: 'Role',
    data() {
        return {
            statusList: [{
                value: '1',
                label: '启用'
            }, {
                value: '2',
                label: '停用'
            }],
            queryParams: {},
            Loading: false,
            roleList: [],
            total: 0
        }
    },
    methods: {
        // 列表
        async getRoleList() {
            this.Loading = true
            const { data: res } = await this.$api.queryRoleList(this.queryParams)
            if (res.code !== 200) {
                this.$message.error(res.msg)
            } else {
                this.roleList = res.data.list
                this.total = res.data.total
                this.Loading = false
            }
        },
        // 搜索
        handleQuery() {
            console.log("开始测试", this.queryParams)
            this.getRoleList()
        },
        // 重置
        resetQuery() {
            this.queryParams = {}
            this.getRoleList()
            this.$message.success("重置成功")
        },
        // pageSize
        handleSizeChange(newSize) {
            this.queryParams.pageSize = newSize
            this.getRoleList()
        },
        // pageNum
        handleCurrentChange(newPage) {
            this.queryParams.pageNum = newPage
            this.getRoleList()
        },
        // 状态修改
        async roleUpdateStatus(row) {
            let text = row.status === 2 ? "停用" : "启用"
            const confirmResult = await this.$confirm('确认要"' + text + '""' +
                row.roleName + '"角色吗?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).catch(err => err)
            if (confirmResult !== 'confirm') {
                await this.getRoleList()
                return this.$message.info('已取消删除')
            }
            await this.$api.updateRoleStatus(row.id, row.status)
            return this.$message.success(text + "成功")
            await this.getRoleList()
        }

    },
    created() {
        this.getRoleList()
    },

}
</script>

<style lang="less" ></style>