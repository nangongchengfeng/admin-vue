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
                        @click="addDeptDialogVisible = true">新增</el-button>

                </el-col>
                <el-col :span="1.5">
                    <el-button plain type="info" icon="el-icon-sort" size="mini" @click="toggleExpandAll">展开/折叠
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
                        <el-button size="mini" type="text" icon="el-icon-edit" @click="showEditDeptDialog(scope.row.id)">修改
                        </el-button>
                        <el-button size="mini" type="text" icon="el-icon-delete">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 新增部门 -->
            <el-dialog title="新增部门" :visible.sync="addDeptDialogVisible" width="30%" @close="addDeptDialogClose">
                <el-form label-width="80px" :model="addDeptForm" :rules="addDeptFormRules" ref="addDeptFormRefForm">
                    <el-form-item label="部门类型" prop="deptType">
                        <el-radio-group v-model="addDeptForm.deptType">
                            <el-radio :label="1">公司</el-radio>
                            <el-radio :label="2">中心</el-radio>
                            <el-radio :label="3">部门</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item size="mini" label="上级部门" prop="parentId" v-if="addDeptForm.deptType != 1">
                        <treeselect placeholder="请选择上级部门" :options="optionsDeptList" v-model="addDeptForm.parentId" />
                    </el-form-item>
                    <el-form-item label="部门名称" prop="deptName">
                        <el-input v-model="addDeptForm.deptName"></el-input>
                    </el-form-item>
                    <el-form-item label="部门状态" prop="deptStatus">
                        <el-radio-group v-model="addDeptForm.deptStatus">
                            <el-radio :label="1">正常</el-radio>
                            <el-radio :label="2">停用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addDept">确定</el-button>
                    <el-button type="primary" @click="addDeptDialogVisible = false">取消</el-button>
                </span>
            </el-dialog>

            <!-- 编辑部门的页面 -->
            <el-dialog title="编辑部门" :visible.sync="editDeptDialogVisible" width="30%">
                <el-form :model="deptInfo" :rules="editDeptFormRules" ref="editDeptFormRefForm" label-width="80px">
                    <el-form-item label="部门类型" prop="deptType">
                        <el-radio-group v-model="deptInfo.deptType">
                            <el-radio :label="1">公司</el-radio>
                            <el-radio :label="2">中心</el-radio>
                            <el-radio :label="3">部门</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item size="mini" label="上级部门" prop="parentId" v-if="deptInfo.deptType != 1">
                        <treeselect :options="optionsDeptList" placeholder="请选择上级部门" v-model="deptInfo.parentId" />
                    </el-form-item>
                    <el-form-item label="部门名称" prop="deptName">
                        <el-input v-model="deptInfo.deptName"></el-input>
                    </el-form-item>
                    <el-form-item label="部门状态" prop="deptStatus">
                        <el-radio-group v-model="deptInfo.deptStatus">
                            <el-radio :label="1">正常</el-radio>
                            <el-radio :label="2">停用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="editDept">确 定</el-button>
                    <el-button type="primary" @click="editDeptDialogVisible = false">取 消
                    </el-button>
                </span>
            </el-dialog>

        </el-card>
    </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect"
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
export default {
    name: 'Dept',
    components: { Treeselect },
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
            addDeptDialogVisible: false,
            optionsDeptList: [],
            addDeptFormRules: {
                deptType: [{ required: true, message: "请选择部门类型", trigger: "blur" }],
                deptName: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
            },
            addDeptForm: {
                deptStatus: 1
            },
            editDeptDialogVisible: false,
            deptInfo: {},
            editDeptFormRules: {
                deptType: [{ required: true, message: "请选择部门类型", trigger: "blur" }],
                deptName: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
            }

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
        },
        // 部门下拉列表
        async getDeptVoList() {
            const { data: res } = await this.$api.querySysDeptVoList()
            console.log(res)
            if (res.code !== 200) {
                this.$message.error(res.msg)
            } else {
                this.optionsDeptList = this.$handleTree.handleTree(res.data, "id")
            }
        },
        // 添加部门
        addDept() {
            this.$refs.addDeptFormRefForm.validate(async valid => {
                if (!valid) return
                const { data: res } = await this.$api.addDept(this.addDeptForm);
                if (res.code !== 200) {
                    this.$message.error(res.message)
                } else {
                    this.$message.success('新增部门成功')
                    this.addDeptDialogVisible = false
                    await this.getList()
                    await this.getDeptVoList()
                }
                this.getDeptList()
            })
        },
        // 监听新增部门对话框
        addDeptDialogClose() {
            this.$refs.addDeptFormRefForm.resetFields()
        },
        // 展示编辑对话框
        async showEditDeptDialog(id) {
            const { data: res } = await this.$api.deptInfo(id)
            if (res.code !== 200) {
                this.$message.error(res.msg)
            } else {
                this.deptInfo = res.data
                this.editDeptDialogVisible = true
            }
        },
        // 监听编辑部门
        /**
         * 当编辑部门对话框关闭时调用此函数。
         * 该函数重置表单字段，将其恢复到初始状态。
         * 
         */
        editDeptDialogClosed() {
            // 重置表单字段
            this.$refs.editDeptFormRefForm.resetFields()
        },
        // 修改部门信息并提交
        editDept() {
            this.$refs.editDeptFormRefForm.validate(async valid => {
                if (!valid) return
                const { data: res } = await this.$api.deptUpdate(this.deptInfo)
                if (res.code !== 200) {
                    this.$message.error(res.msg)
                } else {
                    this.editDeptDialogVisible = false
                    await this.getDeptList()
                    this.$message.success("修改部门成功")
                }

            })
        }
    },
    created() {
        this.getDeptList()
        this.getDeptVoList()
    }

}
</script>

<style lang="less" scoped></style>