<template>
    <el-card>
        <el-form :inline="true" :model="queryParams">
            <el-form-item prop="menuName" label="菜单名称">
                <el-input placeholder="请输入菜单名称" clearable size="mini" @keyup.enter.native="handleQuery"
                    v-model="queryParams.menuName" />
            </el-form-item>
            <el-form-item prop="menuStatus" label="菜单状态">
                <el-select size="mini" placeholder="请选择菜单状态" v-model="queryParams.menuStatus">
                    <el-option v-for="item in menuStatusList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" icon="el-icon-plus" size="mini">新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="info" icon="el-icon-sort" size="mini" @click="toggleExpandAll">折叠/展开</el-button>
            </el-col>
        </el-row>


        <!-- 列表 -->
        <el-table border stripe :header-cell-style="{
            background: '#eef1f6',
            color: '#606266'
        }" v-if="refreshTable" v-loading="loading" :data="menuList" row-key="id" :default-expand-all="isExpandAll"
            :tree-props="{ children: 'children' }">
            <el-table-column prop="menuName" label="菜单名称" />
            <el-table-column prop="icon" label="图标">
                <template slot-scope="scope">
                    <i :class="scope.row.icon" />
                </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" />
            <el-table-column prop="value" label="权限标识" />
            <el-table-column prop="url" label="组件路径" />
            <el-table-column prop="menuType" label="菜单类型">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.menuType === 1">目录</el-tag>
                    <el-tag v-else-if="scope.row.menuType === 2" type="success">
                        菜单</el-tag>
                    <el-tag v-else-if="scope.row.menuType === 3" type="danger">按
                        钮</el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="menuStatus" label="状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.menuStatus === 2" type="success">启用
                    </el-tag>
                    <el-tag v-else-if="scope.row.menuStatus === 1" type="danger">
                        禁用</el-tag>
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
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
    name: "Menu",
    components: { Treeselect },
    data() {
        return {
            queryParams: {},
            menuStatusList: [{
                value: '2',
                label: '启用'
            }, {
                value: '1',
                label: '停用'
            }],
            loading: true,
            menuList: [],
            // 控制是否展开所有表格行的标志，默认为false
            isExpandAll: false,
            // 标记是否需要刷新表格，默认为true
            refreshTable: true,

            // 刷新表格
            refreshTable: true,
            // 查询参数
            queryParams: {},
            // 是否显示新增菜单对话框
            addMenuDialogVisible: false,
            // 是否显示编辑菜单对话框
            editMenuDialogVisible: false,
            // 是否显示新增子菜单对话框
            addSubMenuDialogVisible: false,
            // 是否显示编辑子菜单对话框
        }
    },
    methods: {
        // 查询菜单列表
        async getMenuList() {
            this.loading = true;
            const { data: res } = await
                this.$api.queryMenuList(this.queryParams)
            // console.log(res)
            if (res.code !== 200) {
                this.$message.error(res.msg);
            } else {
                this.menuList = this.$handleTree.handleTree(res.data, "id");
                this.loading = false;
            }
        },
        // 折叠和展开
        toggleExpandAll() {
            this.refreshTable = false
            this.isExpandAll = !this.isExpandAll
            this.$nextTick(() => {
                this.refreshTable = true
            })
        },
        // 搜索
        handleQuery() {
            this.getMenuList()
        },
        // 重置
        resetQuery() {
            this.queryParams = {}
            this.getMenuList();
            this.$message.success("重置成功")
        }
    },
    created() {
        this.getMenuList()
    },
};
</script>

<style lang="less" scoped></style>