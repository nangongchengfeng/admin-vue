<template>
    <div>
        <el-card>
            <!-- 搜索 -->
            <el-form :inline="true" :model="queryParams">
                <el-form-item label="部门名称" prop="deptName">
                    <el-input placeholder="请输入部门名称" clearable size="mini" v-model="queryParams.deptName"
                        @keyup.enter.native="handleQuery"></el-input>
                </el-form-item>
                <el-form-item label="部门状态" prop="deptStatus">
                    <el-select size="mini" placeholder="请选择部门状态" v-model="queryParams.deptStatus">
                        <el-option v-for="item in deptStatusList" :key="item.value" :label="item.label" :value="item.value"
                            @keyup.enter.native="handleQuery" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索
                    </el-button>
                    <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置
                    </el-button>
                </el-form-item>
            </el-form>
            <!-- 操作按钮 -->
            <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                    <el-button plain type="primary" icon="el-icon-plus" size="mini"
                        @click="addPostDialogVisible = true">新增</el-button>

                </el-col>
                <el-col :span="1.5">
                    <el-button plain type="info" icon="el-icon-sort" size="mini" :disabled="multiple"
                        @click="toggleExpandAll">展开/折叠
                    </el-button>
                </el-col>
            </el-row>
            <!-- 列表表格 -->
            <el-table border stripe :header-cell-style="{
                background: '#eef1f6',
                color: '#606266'
            }" v-if="refreshTable" v-loading="loading" :data="deptList" row-key="id" :default-expand-all="isExpandAll"
                :tree-props="{ children: 'children' }">
                <el-table-column label="部门名称" prop="deptName" />
                <el-table-column label="部门类型" prop="deptType">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.deptType === 1">公司</el-tag>
                        <el-tag v-else-if="scope.row.deptType === 2" type="success">中心</el-tag>
                        <el-tag v-else-if="scope.row.deptType === 3" type="danger">部门</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="部门状态" prop="deptStatus">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.deptStatus === 1" type="success">正常</el-tag>
                        <el-tag v-else-if="scope.row.deptStatus === 2" type="danger">停用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime" />
                <el-table-column label="更多操作" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" icon="el-icon-edit">修改
                        </el-button>
                        <el-button size="mini" type="text" icon="el-icon-delete">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'Dept',
    data() {

        return {
            deptStatusList: [
                { value: 1, label: '正常' },
                { value: 2, label: '停用' }
            ],
            queryParams: {},
            loading: true,
            refreshTable: true,
            isExpandAll: true,
            deptList: [],
        }
    }, methods: {
        // 查询部门列表
        async getDeptList() {
            this.loading = true
            const { data: res } = await
                this.$api.queryDeptList(this.queryParams)
            if (res.code !== 200) {
                this.$message.error(res.msg)
            } else {
                console.log(res.data)
                this.deptList = this.$handleTree.handleTree(res.data, "id")
                this.loading = false

            }
        },
        //   重置
        resetQuery() {
            this.queryParams = {}
            this.getDeptList()
            this.$message.success("重置成功")
        },
        //   查询
        handleQuery() {
            this.getDeptList()
        },
        //   展开
        toggleExpandAll() {
            this.refreshTable = false
            this.isExpandAll = !this.isExpandAll
            this.$nextTick(() => {
                this.refreshTable = true
            })
        }
    },
    created() {
        this.getDeptList()
    }

}
</script>

<style lang="less" scoped></style>