import { getManager, managerCount } from "../../utils/requset";

const state = {
    managerList:[],
    //size :每页显示的条数
    size:2,
    // page:当前页码数
    page:1,
    // 计算总的记录数
    count:0
    
}
const mutations = {
    changeManagerList(state,arr){
        state.managerList = arr
    },
    changeCount(state,num){
        state.count = num
    },
    // 修改当前页码数
    changePage(state,page){
        state.page = page
    }
}

const actions = {
    managerListActions(context){
        // 判断当前
        var params ={
            size:context.state.size,
            page:context.state.page
        }
        // 
        //发起获取管理员列表请求
        getManager(params).then(res=>{
        //    判断返回列表的数据是否为空
            if((res.data.list == null || res.data.list.length == 0)&&context.state.page>1){
               var p =  context.state.page-1;
               context.commit('changePage',p)
            //    自掉
               context.dispatch('managerListActions')
               return;
            }
             //提交数据
            context.commit('changeManagerList',res.data.list)
        })
    },
    countActions(context){
        // 发起总的记录数请求
        managerCount().then(res=>{
            context.commit('changeCount',res.data.list[0].total)
        })
    },  
    pageActions(context,page){
        context.commit('changePage',page)
    }
}

const getters = {
    managerList(state){
        return state.managerList
    },
    count(state){
        return state.count
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
    namespaced:true
}