<template>
    <div class="tags">
        <el-tag size="medium" closable v-for="item in tags" :key="item.path" effect="dark">{{ item.title }}</el-tag>
    </div>
</template>

<script>
export default {
    name: "Tags",
    data() {
        return {
            tags: [{
                title: '首页',
                path: '/welcome'
            }]
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler(val) {
                const boolean = this.tags.find(item => {
                    return val.path == item.path
                })
                if (!boolean) {
                    this.tags.push({
                        title: val.meta.tTitle,
                        path: val.path
                    })
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.tags {
    padding-left: 20px;
    padding-top: 2px;
    padding-bottom: 2px;
}
</style>