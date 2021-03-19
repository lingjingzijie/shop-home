import axios from "axios";
import qs from "qs";
// import { config } from "vue/types/umd";
import {errorAlert} from './alert';
import store from '../store/index'
// 设置基础路径
const baseUrl = '/api';
//设置请求拦截==》设置请求头
axios.interceptors.request.use(config=>{
    console.log("本次响应的路径为：" +config.url);
    if(config.url !== baseUrl + '/api/userlogin'){
        config.headers.authorization = store.state.user.token
    }
    // console.group('本次请求路径为:'+config.url)
    // if(config.url !== baseUrl+'/api/userlogin'){
    //   // 需要设置请求头
    //   config.headers.authorization = store.state.user.token
    // }
    // console.log(config);
return config
})



// 设置响应拦截
axios.interceptors.response.use(res=>{
    console.log("本次响应的路径为：" +res.config.url);
    // if(res.config.url != 200){
    //     errorAlert(res.data.msg);
    //     return;
    // }
    console.log(res);
    return res;
})
// 添加菜单
export const addMenu = (data)=>{
    return axios({
      method:'post',
      url:baseUrl+'/api/menuadd',
      data:qs.stringify(data)
    })
}

// 菜单列表
export const getMenu = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/menulist',
        params
    })
}

// 获取一条菜单
export const oneMenu = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/menuinfo',
        params
    })
}

//修改菜单
export const updateMenu = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+'/api/menuedit',
        data:qs.stringify(data)
    })
}
// 删除菜单
export const delMenu = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/menudelete',
        data:qs.stringify(data)
    })
}
// 添加角色
export const addRole = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/roleadd',
        data:qs.stringify(data)
    })
}
// 获取角色
export const getRole =()=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/rolelist',
    })
}

// 获取角色
export const oneRole = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/roleinfo',
        params
    })
}
// 编辑角色
export const updateRole = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/roleedit',
        data:qs.stringify(data)
    })
}
// 删除角色
export const delRole = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/roledelete',
        data:qs.stringify(data)
    })
}

//  添加管理员
export const addManager = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/useradd',
        data:qs.stringify(data)
        
    })
}

// 管理员列表
export const getManager = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/userlist',
        params
    })

}
// 获取管理员总数
export const managerCount = ()=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/usercount'
    })
}
// 获取管理员详情
export const oneManager = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/userinfo',
        params
    })

}
// 修改管理员
export const updateManager = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/useredit',
        data:qs.stringify(data)
    })
}
// 删除管理员
export const delManager = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/userdelete',
        data:qs.stringify(data)
    })
}

// 登录
export const requestLogin = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/userlogin',
        data:qs.stringify(data)
    })
}

// 添加商品分类
export const addCate = (data)=>{
    // 使用formdata来处理带有文件的数据
    var form = new FormData()
    for(let i in data){
        form.append(i,data[i])
    }
    return axios({
        method:'post',
        url:baseUrl+'/api/cateadd',
        data:form
    })
}
// 商品分类列表
export const getCate = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/catelist',
        params
    })
}
// 获取一条数据
export const oneCate = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/cateinfo',
        params
    })
}
// 修改信息
export const updateCate = (data)=>{
    
    var form = new FormData()
    for(let i in data){
        form.append(i,data[i])
    }
    return axios({
        method:"post",
        url:baseUrl+'/api/cateedit',
        data:form
    })
}
// 删除商品列表信息
export const delCate = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/catedelete',
        data:qs.stringify(data)
    })
}

// 添加商品信息
export const addSpec = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+"/api/specsadd",
        data:qs.stringify(data)
    })
}

// 获取规格属性列表
export const getSpec = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/specslist',
        params
    })
}

//获取规格总数
export const specCount = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/specscount',
        params
    })
}

// 获取一条数据
export const oneSpec = (params)=>{
    return axios({
        method: 'get',
        url:baseUrl+'/api/specsinfo',
        params
    })
}

// 修改数据请求
export const updateSpec = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/specsedit',
        data:qs.stringify(data)
    })
}
//  删除数据
export const delSpec = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+"/api/specsdelete",
        data:qs.stringify(data)
    })
}