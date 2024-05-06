<template>
    <el-card>
        <!-- 搜索 -->
        <el-form :inline="true" :model="queryParams">
            <el-form-item label="用户账号" prop="username">
                <el-input size="mini" placeholder="请输入用户账号" clearable v-model="queryParams.username"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="账号状态" prop="status">
                <el-select size="mini" placeholder="请选择账号状态" v-model="queryParams.status">
                    <el-option v-for="item in statusList" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间" prop="beginTime">
                <el-date-picker class="input-width" size="mini" type="date" style="width: 190px" value-format="yyyy-MM-dd"
                    clearable placeholder="请选择开始时间" v-model="queryParams.beginTime" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="结束时间">
                <el-date-picker class="input-width" size="mini" type="date" style="width: 190px" value-format="yyyy-MM-dd"
                    clearable placeholder="请选择结束时间" v-model="queryParams.endTime" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
            <!--操作按钮-->
            <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                    <el-button plain type="primary" icon="el-icon-plus" size="mini">新增</el-button>
                </el-col>
            </el-row>
            <!--列表-->
            <el-table v-loading="Loading" :data="adminList" border stripe style="width: 100%" :header-cell-style="{
                background: '#eef1f6', color: '#606266'
            }">
                <el-table-column label="ID" prop="id" v-if="false" />
                <el-table-column label="用户账号" prop="username" />
                <el-table-column label="用户昵称" prop="nickname" />
                <el-table-column label="用户手机" prop="phone" width="120" />
                <el-table-column label="用户邮箱" prop="email" width="170" />
                <el-table-column label="用户头像" prop="icon">
                    <template slot-scope="scope">
                        <el-avatar shape="circle" :src="scope.row.icon"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime" width="160" />
                <el-table-column label="账号状态" width="150">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2" active-color="#13ce66"
                            inactive-color="#F5222D" active-text="启用" inactive-text="停用"
                            @change="adminUpdateStatus(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="部门/岗位" width="180">
                    <template slot-scope="scope">
                        <div>{{ scope.row.deptName }} / {{ scope.row.postName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="角色名称" prop="roleName">
                    <template slot-scope="scope">
                        <el-tag type="success">{{ scope.row.roleName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="个人简介" prop="note" />
                <el-table-column label="更多操作" fixed="right" width="200">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" icon="el-icon-edit">
                            编辑
                        </el-button>
                        <el-button size="small" type="text" icon="el-icon-delete">删除
                        </el-button>
                        <el-button size="small" type="text" icon="el-icon-key">重
                            置密码
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页区域-->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryParams.pageNum" :page-sizes="[10, 50, 100,
                    500, 1000]" :page-size="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-form>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            statusList: [{
                value: '1',
                label: '启用',
            }, {
                value: '2',
                label: '停用',
            }],
            Loading: false,
            queryParams: {},
            adminList: [],
            total: 0,
        }
    },
    methods: {
        // 查询列表
        async getAdminList() {
            this.Loading = true
            const { data: res } = await
                this.$api.queryAdminList(this.queryParams)
            if (res.code !== 200) {
                this.$message.error(res.message)
            } else {
                this.adminList = res.data.list
                this.total = res.data.total
                this.Loading = false
            }
        },
        // 搜索按钮操作
        handleQuery() {
            this.getAdminList();
        },
        // 重置按钮操作
        resetQuery() {
            this.queryParams = {}
            this.getAdminList();
            this.$message.success("重置成功")
        },
        // pageSize
        handleSizeChange(newSize) {
            this.queryParams.pageSize = newSize
            this.getAdminList()
        },
        // pageNum
        handleCurrentChange(newPage) {
            this.queryParams.pageNum = newPage
            this.getAdminList()
        },
        // 修改管用户状态
        async adminUpdateStatus(row) {
            let text = row.status === 2 ? "停用" : "启用";
            const confirmResult = await this.$confirm('确认要"' + text + '""' +
                row.username + '"用户吗?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).catch(err => err)
            if (confirmResult !== 'confirm') {
                await this.getAdminList()
                return this.$message.info('已取消删除')
            }
            await this.$api.updateAdminStatus(row.id, row.status)
            this.$message.success(text + "成功")
            await this.getAdminList()
        },
    },
    created() {
        this.getAdminList()
    }
}
</script>

<style></style>