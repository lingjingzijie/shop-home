export const state = {
    user:sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,//用来存储登录之后的登录信息
}
export const mutations = {
    changeUser(state,user){
        // 1将用户信息存入store中的state中
        state.user = user
        if(user){
            // 同时将用户信息存入sessionStorage中
            sessionStorage.setItem('user',JSON.stringify(user))
        }else{
            sessionStorage.removeItem('user')
        }
    }
}
export const getters = {
    user(state){
        return state.user
    }
}
