<template>
    <div>
        <!-- 条件搜索 -->
        <el-card>
            <el-form :model="queryParams" :inline="true">
                <el-form-item label="岗位名称" prop="postName">
                    <el-input placeholder="请输入岗位名称" clearable size="mini" v-model="queryParams.postName" />
                </el-form-item>
                <el-form-item label="岗位状态" prop="postStatus">
                    <el-select size="mini" placeholder="请选择岗位状态" v-model="queryParams.postStatus">
                        <el-option v-for="item in postStatusList" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" prop="beginTime">
                    <el-date-picker class="input-width" size="mini" type="date" style="width: 190px;"
                        value-format="yyyy-MM-dd" placeholder="请选择开始时间" v-model="queryParams.beginTime" />
                </el-form-item>
                <el-form-item label="结束时间" prop="endTime">
                    <el-date-picker class="input-width" size="mini" type="date" style="width: 190px;"
                        value-format="yyyy-MM-dd" placeholder="请选择结束时间" v-model="queryParams.endTime" />
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
                    <el-button plain type="danger" icon="el-icon-delete" size="mini" :disabled="multiple"
                        @click="batchHandleDelete">删除
                    </el-button>
                </el-col>
            </el-row>
            <!--列表-->
            <el-table border stripe style="width: 100%;" :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                v-loading="loading" :data="postList" @selection-change="handleSelectionChange">
                <el-table-column type="selection" />
                <el-table-column label="ID" v-if="false" prop="id" />
                <el-table-column label="岗位名称" prop="postName" />
                <el-table-column label="岗位编码" prop="postCode" />
                <el-table-column label="岗位状态" prop="postStatus">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.postStatus" :active-value="1" :inactive-value="2"
                            active-color="#13ce66" inactive-color="#F5222D" active-text="启用" inactive-text="停用"
                            @change="postUpdateStatus(scope.row)" :disabled="false"> <!-- 禁用开关 -->
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime" />

                <el-table-column label="描述" prop="remark" />
                <el-table-column label="更多操作">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row.id)">
                            编辑
                        </el-button>
                        <el-button size="small" type="text" icon="el-icon-delete" @click="handLeDelete(scope.row.id)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
            <!-- 分页 -->
            <el-pagination @size-change="handleSizeChange" @currentchange="handleCurrentChange"
                :current-page="queryParams.pageNum" :page-sizes="[10, 50, 100, 500, 1000]" :page-size="queryParams.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
        <!-- 新增对话框 -->
        <el-dialog title="新增岗位" :visible.sync="addPostDialogVisible" width="30%" @close="addPostDialogClosed">
            <el-form label-width="80px" ref="addPostFormRefForm" :rules="addPostFormRules" :model="addPostForm">
                <el-form-item label="岗位名称" prop="postName">
                    <el-input placeholder="请输入岗位名称" v-model="addPostForm.postName"></el-input>
                </el-form-item>
                <el-form-item label="岗位编码" prop="postCode">
                    <el-input placeholder="请输入岗位编码" v-model="addPostForm.postCode"></el-input>
                </el-form-item>
                <el-form-item label="岗位状态" prop="postStatus">
                    <el-radio-group v-model="addPostForm.postStatus">
                        <el-radio :label="1">启用</el-radio>
                        <el-radio :label="2">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="岗位描述" prop="remark">
                    <el-input placeholder="请输入岗位描述" v-model="addPostForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <span>
                <el-button type="primary" @click="addPost">确认</el-button>
                <el-button type="primary" @click="addPostDialogVisible = false">取消</el-button>
            </span>
        </el-dialog>

        <!-- 编辑对话框 -->
        <el-dialog title="编辑岗位" :visible.sync="editPostDialogVisible" width="30%" @close="editPostDialogClosed">
            <el-form label-width="80px" ref="editPostFormRefForm" :rules="editPostFormRules" :model="editPostForm">
                <el-form-item label="岗位名称" prop="postName">
                    <el-input placeholder="请输入岗位名称" v-model="editPostForm.postName"></el-input>
                </el-form-item>
                <el-form-item label="岗位编码" prop="postCode">
                    <el-input placeholder="请输入岗位编码" v-model="editPostForm.postCode"></el-input>
                </el-form-item>
                <el-form-item label="岗位状态" prop="postStatus">
                    <el-radio-group v-model="editPostForm.postStatus">
                        <el-radio :label="1">正常</el-radio>
                        <el-radio :label="2">停用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="岗位描述" prop="remark">
                    <el-input placeholder="请输入岗位描述" v-model="editPostForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <span>
                <el-button type="primary" @click="editPost">修改</el-button>
                <el-button type="primary" @click="editPostDialogVisible = false">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'Post',
    data() {
        return {
            postStatusList: [{
                value: '1',
                label: '启用'
            }, {
                value: '2',
                label: '停用'
            }],
            queryParams: {},
            loading: true,
            postList: [],
            totaal: 0,
            addPostDialogVisible: false,
            addPostFormRules: {
                postName: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }],
                postCode: [{ required: true, message: '请输入岗位标识', trigger: 'blur' }],
                postStatus: [{ required: true, message: '请输入岗位状态', trigger: 'blur' }]
            },
            addPostForm: {
                postName: '',
                postCode: '',
                postStatus: 1,
                remark: ''
            },
            editPostDialogVisible: false,
            editPostForm: {
            },
            editPostFormRules: {
                postName: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }],
                postCode: [{ required: true, message: '请输入岗位标识', trigger: 'blur' }],
                postStatus: [{ required: true, message: '请输入岗位状态', trigger: 'blur' }]
            },
            ids: [],
            single: true,
            multiple: true,

        }
    },
    methods: {
        // 获取列表
        async getPostList() {
            this.loading = true;
            console.log(this.queryParams)
            const { data: res } = await this.$api.queryPostList(this.queryParams);
            if (res.code !== 200) {
                this.$message.error(res.msg);
            } else {
                this.postList = res.data.list;
                this.postList = res.data.list
                this.total = res.data.total
                this.loading = false
            }
        },
        // 搜索岗位
        handleQuery() {
            this.getPostList()
        },
        // 重置
        resetQuery() {
            this.queryParams = {}
            this.getPostList()
            this.$message.success("重置成功")
        },
        // pageSize
        handleSizeChange(newSize) {
            this.queryParams.pageSize = newSize
            this.getPostList()
        },
        // pageNum
        handleCurrentChange(newPage) {
            this.queryParams.pageNum = newPage
            this.getPostList()
        },
        // 修改岗位状态
        // 修改岗位状态
        async postUpdateStatus(row) {
            let text = row.postStatus === 2 ? "停用" : "启用";
            const confirmResult = await this.$confirm('确认要"' + text + '""' +
                row.postName + '"岗位吗?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).catch(err => err)
            if (confirmResult !== 'confirm') {
                await this.getPostList()
                return this.$message.info('已取消修改')
            }
            await this.$api.updatePostStatus(row.id, row.postStatus)
            return this.$message.success(text + "成功")
            await this.getPostList()
        },
        // 监听新增岗位对话关闭
        addPostDialogClosed() {
            this.$refs.addPostFormRefForm.resetFields()
        },
        //   新增岗位
        /**
         * 提交新增岗位的表单
         * 此函数无参数和返回值，但会调用表单验证和后端API进行新增操作，并根据操作结果给出提示。
         */
        addPost() {
            // 验证表单填写是否符合规则
            this.$refs.addPostFormRefForm.validate(async valid => {
                if (!valid) return // 如果表单验证不通过，则直接返回，不执行后续操作
                // 调用后端API添加岗位信息
                const { data: res } = await this.$api.addPost(this.addPostForm);
                // 根据后端返回的代码判断操作结果并给出相应提示
                if (res.code !== 200) {
                    this.$message.error(res.msg) // 若操作失败，显示错误信息
                } else {
                    this.$message.success("新增岗位成功") // 若操作成功，显示成功信息
                    this.addPostDialogVisible = false // 关闭新增岗位的对话框
                    await this.getPostList() // 重新获取岗位列表
                }
            })

        },
        // 监听编辑岗位对话关闭
        editPostDialogClosed() {
            // 重置表单字段
            this.$refs.editPostFormRefForm.resetFields()
        },
        // 显示岗位对话框
        async handleUpdate(id) {
            const { data: res } = await this.$api.postInfo(id)
            if (res.code !== 200) return this.$message.error(res.msg)
            this.editPostForm = res.data
            this.editPostDialogVisible = true
        },
        //修改岗位信息
        async editPost() {
            this.$refs.editPostFormRefForm.validate(async valid => {
                if (!valid) return
                const { data: res } = await this.$api.updatePost(this.editPostForm)
                if (res.code !== 200) {
                    this.$message.error(res.msg)
                } else {
                    this.editPostDialogVisible = false
                    await this.getPostList()
                    this.$message.success("修改岗位成功")
                }
            })
        },
        // 删除岗位
        async handLeDelete(id) {
            const confirmResult = await this.$confirm('确定要删除岗位编号为"' + id + '"的数据项?', '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err)
            if (confirmResult !== 'confirm') {
                return this.$message.info('取消删除')
            } else {
                const { data: res } = await this.$api.deleteSysPost(id)
                if (res.code == 200) {
                    this.$message.success(res.msg);
                    await this.getPostList();
                } else {
                    this.$message.success(res.msg);
                }
            }
        },
        // 批量删除岗位
        async batchHandleDelete() {
            const postIds = this.ids;
            const confirmResult = await this.$confirm('确定要删除岗位编号为"' + postIds + '"的数据项?', '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err)
            if (confirmResult !== 'confirm') {
                return this.$message.info('取消删除')
            } else {
                const { data: res } = await this.$api.batchDeleteSysPost(postIds)
                if (res.code == 200) {
                    this.$message.success(res.msg);
                    await this.getPostList();
                } else {
                    this.$message.success(res.msg);
                }
            }
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },

    },
    created() {
        this.getPostList();
    }
}
</script>

<style lang="less" scoped></style>
