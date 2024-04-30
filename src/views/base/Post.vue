<template>
    <!-- 条件搜索 -->
    <el-card>
        <el-form :model="queryParams" :inline="true">
            <el-form-item label="岗位名称" prop="postName">
                <el-input placeholder="请输入岗位名称" clearable size="mini" v-model="queryParams.postName" />
            </el-form-item>
            <el-form-item label="岗位状态" prop="postStatus">
                <el-select size="mini" placeholder="请选择岗位状态" v-model="queryParams.postStaus">
                    <el-option v-for="item in postStatusList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间" prop="beginTime">
                <el-date-picker class="input-width" size="mini" type="date" style="width: 190px;" value-format="yyyy-MM-dd"
                    placeholder="请选择开始时间" v-model="queryParams.beginTime" />
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
                <el-date-picker class="input-width" size="mini" type="date" style="width: 190px;" value-format="yyyy-MM-dd"
                    placeholder="请选择结束时间" v-model="queryParams.endTime" />
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
                <el-button plain type="primary" icon="el-icon-plus" size="mini">新增</el-button>

            </el-col>
            <el-col :span="1.5">
                <el-button plain type="danger" icon="el-icon-delete" size="mini">删除
                </el-button>
            </el-col>
        </el-row>
        <!--列表-->
        <el-table border stripe style="width: 100%;" :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            v-loading="loading" :data="postList">
            <el-table-column type="selection" />
            <el-table-column label="ID" v-if="false" prop="id" />
            <el-table-column label="岗位名称" prop="postName" />
            <el-table-column label="岗位编码" prop="postCode" />
            <el-table-column label="岗位状态" prop="postStatus" />
            <el-table-column label="创建时间" prop="createTime" />
            <el-table-column label="描述" prop="remark" />
            <el-table-column label="更多操作">
                <template slot-scope="scope">
                    <el-button size="small" type="text" icon="el-icon-edit">
                        编辑
                    </el-button>
                    <el-button size="small" type="text" icon="el-icon-delete">
                        删除
                    </el-button>
                </template>
            </el-table-column>
            <!-- 分页 -->

        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @currentchange="handleCurrentChange"
            :current-page="queryParams.pageNum" :page-sizes="[10, 50, 100, 500, 1000]" :page-size="queryParams.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </el-card>
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

        }
    },
    methods: {
        // 获取列表
        async getPostList() {
            this.loading = true;
            const { data: res } = await this.$api.queryPostList(this.queryParams);
            console.log(res);
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

    },
    created() {
        this.getPostList();
    }
}
</script>

<style lang="less" scoped></style>