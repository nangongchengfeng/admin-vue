// vuex 的状态管理

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import storage from "@/utils/storage"

Vue.use(Vuex)

// 保存各个信息状态集合
const state = new Vuex.Store({
    // todo
    sysAdmin: "" || storage.getItem("sysAdmin"),
    token: "" || storage.getItem("token"),
    leftMenuList: "" || storage.getItem("leftMenuList"),
    permissionList: "" || storage.getItem("permissionList"),
    // activePath: "" || storage.getItem("activePath"),
    mutations,
    activePath: "" || storage.getItem("activePath"),

}
)
export default state