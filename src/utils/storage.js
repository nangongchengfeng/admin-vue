// 存储localStorage

/**
 * 一个用于操作本地存储的工具类，提供了获取存储、设置项、获取项、清除项以及清除所有存储的方法
 */
export default {
    /**
     * 获取本地存储中的数据
     * @returns {Object} 返回解析后的本地存储对象，如果不存在则返回空对象
     */
    getStorage() {
        return JSON.parse(window.localStorage.getItem(process.env.VUE_APP_BASE_API) || '{}')
    },

    /**
     * 设置本地存储的项
     * @param {string} key 项的键名
     * @param {any} val 项的值
     */
    setItem(key, val) {
        let storage = this.getStorage() // 获取当前存储对象
        storage[key] = val // 设置键名对应的值
        window.localStorage.setItem(process.env.VUE_APP_BASE_API, JSON.stringify(storage)) // 将更新后的存储对象重新存储至localStorage
    },

    /**
     * 获取本地存储中特定键的值
     * @param {string} key 需要获取的项的键名
     * @returns {any} 返回键名对应的值，如果不存在则返回undefined
     */
    getItem(key) {
        return this.getStorage()[key] // 通过键名获取值
    },

    /**
     * 清除本地存储中特定的项
     * @param {string} key 需要清除的项的键名
     */
    clearItem(key) {
        let storage = this.getStorage() // 获取当前存储对象
        delete storage[key] // 删除指定键名的项
        window.localStorage.setItem(process.env.VUE_APP_NAME_SPACE,
            JSON.stringify(storage)); // 将更新后的存储对象重新存储至localStorage
    },

    /**
     * 清除本地存储中的所有项
     */
    clearAll() {
        window.localStorage.clear() // 清除localStorage中的所有项
    }
}