<template>
    <div class="tags">
        <el-tag class="tag" size="medium" :effect="item.title == $route.meta.tTitle ? 'dark' : 'plain'"
            v-for="item, index in tags" :key="item.path" @click="goTo(item.path)" @close="close(index)"
            :disable-transitions="true" :closable="index > 0">
            <i class="circular" v-show="item.title == $route.meta.tTitle"></i>
            {{ item.title }}</el-tag>
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

    // 监听路由变化以便更新或添加标签页
    watch: {
        $route: {
            // 立即触发监听器，handler函数接收当前路由对象作为参数
            immediate: true,
            handler(val) {
                // 检查当前路由是否已存在于tags数组中
                const boolean = this.tags.find(item => {
                    return val.path == item.path
                })

                // 如果当前路由不存在于tags数组中，则将其添加到tags中
                if (!boolean) {
                    this.tags.push({
                        title: val.meta.tTitle, // 路由的标题
                        path: val.path // 路由的路径
                    })
                }
            }
        }
    },
    created() { },
    methods: {
        // 点击跳转到指定位置
        goTo(path) {
            this.$router.push(path)
        },
        /**
         * 关闭指定索引的标签页。
         * 
         * @param {number} i 标签页的索引。
         * 
         * 逻辑说明：
         * 如果要关闭的标签页是当前活动页，并且不是最后一个标签页，则导航到最后一个标签页。
         * 如果要关闭的标签页是当前活动页，并且是最后一个标签页，则导航到倒数第二个标签页。
         * 最后，从标签列表中移除该标签页。
         */
        close(i) {
            // 判断要关闭的标签是否为当前活动页，并处理特殊情况
            if (this.tags[i].path == this.$route.meta.path && i !== this.tags.length - 1) {
                this.$router.push(this.tags[this.tags.length - 1].path)
            } else if (i === this.tags.length - 1) {
                // 如果关闭的是最后一个标签，则导航到倒数第二个标签
                this.$router.push(this.tags[this.tags.length - 2].path)
            }
            // 从标签列表中移除指定的标签
            this.tags.splice(i, 1)
        }
    }

};
</script>

<style lang="less" scoped>
.tags {
    /* 左内边距设置为20px，提供足够的空间用于展示标签内容 */
    padding-left: 20px;
    /* 上下内边距设置为2px，用于调整标签的高度，使其更精致 */
    padding-top: 2px;
    padding-bottom: 2px;

    .tag {
        cursor: pointer;
        /* 设置光标为指针，表明这是一个可点击的元素 */
        margin-right: 5px;
        /* 设置元素右侧外边距为3px，用于元素间的间隔 */
    }

    .circular {
        width: 8px;
        height: 8px;
        margin-right: 4px;
        background-color: #fff;
        border-radius: 50%;
        display: inline-block;
    }
}
</style>