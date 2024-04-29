// vuex 的状态管理

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

// 保存各个信息状态集合
const state = new Vuex.Store({
    // todo
    mutations
}
)
export default state