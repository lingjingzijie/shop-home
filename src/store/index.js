import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

import { state,mutations,getters } from "./mutations";
import actions from "./actions";
import menu from './modules/menu'
import role from './modules/role'
import manager from './modules/manager'
import cate from './modules/cate'
import spec from './modules/spec'

const store =  new Vuex.Store({
    state,// 储存数据
    mutations, //操作数据 
    actions,//组件中的对接方法
    getters,//返回数据并对接组件
    modules:{
        //子模块中的方法
        menu,
        role,
        manager,
        cate,
        spec
    }
})

export default store