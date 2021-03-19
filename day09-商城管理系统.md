# 一.建库建表

```
1.开启mysql服务
2.打开navicat,创建数据库名: 见图1所示;
  打开doc命令,创建数据名. create database shop1102
  use shop1102
  source 文件路径
建库建表完成.  
```

# 二.开启服务端

```js
shop_admin/config/global.js
// 数据库连接参数
exports.dbConfig = {
    host: 'localhost', //数据库主机名
    user: 'root',//用户名
    password: '123456',//密码
    port:3306 ,//端口号
    database: 'shop1102' 
}

npm i  安装依赖项
npm start 开启服务端
服务端运行在: http://localhost:3000
```

# 三.搭建项目

## 1.创建项目

```
1.vue init webpack shop_home
2.cnpm i
3.npm run dev
```

## 2.清空工作

```
assets:  logo.png 删除
components: helloword 删除
router/index.js   有关helloword内容删除
App.vue  根组件只留模板
main.js  唯一入口文件
```

## 3.引入重置样式

```js
1.assest/css/reset.css
*{
  margin:0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  color:#333;
}

2.main.js引入
	// 1.引入重置样式
import './assets/css/reset.css'
```

## 4.引入公共组件

```js
1.components/index.js
	export default{}

2.main.js
// 2.引入公共组件
import comComponents from './components'
for(let i in comComponents){
  Vue.component(i,comComponents[i])
}
```

## 5.引入全局过滤器

```js
1.filters/index.js
    export default {

    }
2.在main.js引入
	// 3.引入全局过滤器
    import comFilters from './filters'
    for(let i in comFilters){
      Vue.filter(i,comFilters[i])
    }
```

## 6.数据请求

6-1.安装

```
npm i axios qs --save
```

6-2.配置跨域请求

```js
config/index.js
    proxyTable: {
      "/api":{
        target:"http://localhost:3000",
        changeOrigin:true,//是否跨域
        pathRewrite:{
          "^/api":"http://localhost:3000"
        }
      }
    },
```

6-3.配置请求数据文件

```js
utils/request.js
import axios from 'axios'
import qs from 'qs'

//设置基础路径
const baseUrl = "/api";


// 设置一个响应拦截
axios.interceptors.response.use(res=>{
  console.group('本次响应路径为:')
  console.log(res);
  return res;
})

```

## 7.配置状态管理vuex

7-1.安装

```
cnpm i vuex --save
```

7-2.配置

`store/index.js`

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {state,mutations,getters} from './mutations'
import actions from './actions'


const store = new Vuex.Store({
  state,//存储数据
  mutations,//操作数据
  actions,//对接组件中的方法
  getters,//返回数据并对接组件
  modules:{//modules中存放子模块信息

  }
})

export default store

```

`store/mutations.js`

```js
export const state = {}
export const mutations = {}
export const getters = {}

```

`store/actions.js`

```js
export default {

}

```

`main.js`

```js
// 4.引入store
import store from './store'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

```

## 8.引入element-ui

8-1.安装

```
cnpm i element-ui --save
```

8-2.引用

```js
//5.引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```

## 9.引入消息提示弹框

```js
import Vue from 'vue'
const vm = new Vue()

// 成功消息提示
export const successAlert = (msg)=>{
  vm.$message({
    message: msg,
    type: 'success'
  });
}

// 警告消息提示
export const warningAlert = (msg)=>{
  vm.$message({
    message: msg,
    type: 'warning'
  });
}

// 错误消息提示
export const errorAlert = (msg)=>{
  vm.$message.error(msg);
}

```

## 10.启动项目

```
npm run dev   正常启动表配置没有问题
```

# 四.项目目录结构

```
src
	assets
		css/reset.css   #重置样式
	components
		index.js		#公共组件入口
	filters
		index.js		#全局过滤器入口
	router
		index.js 		#路由规则配置文件
	store
		index.js		#状态管理配置文件
	utils
		request.js		#配置数据请求文件
		alert.js		#配置消息提示文件
	App.vue   			#根组件
	main.js				#入口文件	
	pages				#你的功能模块
```

# 五.代码开发

## 1.login.vue(页面布局)

```vue
<template>
  <div class="container">
    <div class="con">
      <h3>欢迎登录</h3>
      <el-input placeholder="请输入用户名"></el-input>
      <el-input type="password" placeholder="请输入密码"></el-input>
      <div class="btn">
        <el-button  type="primary" @click="login">登录</el-button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  methods:{
    login(){
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.container{
  width:100vw;
  height: 100vh;
  background: linear-gradient(#563443,#2F3D60);
  position:fixed;
  top:0;
  left:0;
}
.con{
  width:400px;
  height: 300px;
  background: white;
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  border-radius: 10px;
}
h3{
  text-align: center;
  margin: 20px;
}
.el-input,.el-button{
  width:90%;
  margin:20px;
}
.el-button{
  color:white;
}
</style>

```

router/index.js

```js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 引入组件
const login = ()=>import('../pages/login/login')
const index = ()=>import('../pages/index/index')


export default new Router({
  routes: [
    {
      path:'/login',
      alias:'l',
      component:login
    },
    {
      path:'/',
      component:index,
    },
    {
      path:'*',
      redirect:'/login'
    }
  ]
})

```

## 2.index.vue(页面布局)

```vue
<template>
    <el-container>
      <el-aside width="200px">
        <!-- router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
        <el-menu
          default-active="/"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b" router>
           <el-menu-item index="/">
              <i class="el-icon-setting"></i>
              <span slot="title">首页</span>
            </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统设置</span>
            </template>
              <el-menu-item index="/menu">菜单管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
              <el-menu-item index="/manager">管理员管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商城管理</span>
            </template>
              <el-menu-item index="/cate">商品分类</el-menu-item>
              <el-menu-item index="/spec">商品规格</el-menu-item>
              <el-menu-item index="/goods">商品管理</el-menu-item>
              <el-menu-item index="/member">会员管理</el-menu-item>
              <el-menu-item index="/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/seckill">秒杀活动</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="80px">
          admin
          <el-button type="primary">退出</el-button>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

</template>

<script>
export default {

}
</script>

<style scoped>
.el-aside{
  height: 100vh;
  background: #20222A;
  color:white;
}
.el-header{
  background: #B3C0D1;
  /* height: 80px; */
  line-height: 80px;
  text-align:right;
}
</style>

```

## 3.menu.vue

```vue
<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 添加组件 -->
    <v-add :info="info" ref="add"></v-add>
    <!-- 列表组件 -->
    <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vAdd from './components/add.vue'
import vList from './components/list.vue'
export default {
  data(){
    return {
      info:{
        show:false,
        title:'',
        isAdd:true
      }
    }
  },
  methods:{
    add(){
      this.info.show = true;
      this.info.title = '添加菜单';
      this.info.isAdd = true;
    },
    edit(id){
      this.info.show = true;
      this.info.title = '编辑菜单';
      this.info.isAdd = false;
      this.$refs.add.getDetail(id);
    }
  },
  components:{
    vAdd,
    vList,
  }
}
</script>

<style scoped>
.el-button{
  margin-top:10px;
}
</style>

```

## 4.add.vue

```vue
<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
        <el-form :model="form">
          <el-form-item label="菜单名称" :label-width="formLabelWidth">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="上级菜单" :label-width="formLabelWidth">
            <el-select v-model="form.pid" >
              <el-option label="--请选择--" disabled value=""></el-option>
              <el-option label="顶级菜单" :value="0"></el-option>
              <!-- 遍历菜单列表 -->
              <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单类型" :label-width="formLabelWidth">
            <template>
                <el-radio v-model="form.type" :label="1">目录</el-radio>
                <el-radio v-model="form.type" :label="2">菜单</el-radio>
            </template>
          </el-form-item>
           <el-form-item label="菜单图标" :label-width="formLabelWidth" v-if="form.type==1">
            <el-select v-model="form.icon" >
              <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
            <el-select v-model="form.url" >
              <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="菜单状态" :label-width="formLabelWidth">
              <el-switch
                  v-model="form.status"
                  active-color="blue"
                  inactive-color="grey" :active-value="1" :inactive-value="2">
                </el-switch>
           </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm" v-if="info.isAdd"> 确 定</el-button>
          <el-button type="primary" @click="update" v-else>修 改</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import {addMenu,oneMenu,updateMenu} from '../../../utils/request'
import { successAlert } from '../../../utils/alert';
import {mapGetters,mapActions} from 'vuex'
export default {
  props:['info'],
  data(){
    return {
        form: {
          pid: 0,
          title: '',
          icon: '',
          type: 1,//类型 1目录 2菜单
          url: '',
          status: 1,//状态 1正常 2 禁用
        },
        formLabelWidth: '120px',
        // 所有图标
        icons:['el-icon-setting','el-icon-help','el-icon-menu'],
        // 所有菜单地址
        urls:[
          'menu',
          'home',
          'role',
          'manager',
          'cate',
          'spec',
          'goods',
          'member',
          'banner',
          'seckill'
        ]
    }
  },
  computed:{
    ...mapGetters({
      'list':"menu/menuList"
    })
  },
  methods:{
    ...mapActions({
      "requestMenuList":"menu/menuListActions"
    }),
    // 取消
    cancel(){
      this.info.show = false;
      // 清空表单内容
      this.form = {
          pid: 0,
          title: '',
          icon: '',
          type: 1,//类型 1目录 2菜单
          url: '',
          status: 1,//状态 1正常 2 禁用
      }
    },
    // 添加数据方法
    confirm(){
      // 发起添加菜单请求
      addMenu(this.form).then(res=>{
        // 只处理成功的结果
        successAlert(res.data.msg)
        this.cancel();
        this.requestMenuList()
      })

    },
    // 获取菜单详情方法
    getDetail(id){
      // 发起菜单详情
        oneMenu({id}).then(res=>{
          this.form =res.data.list;
          this.form.id = id;
        })
    },
    // 修改菜单
    update(){
      // 发起修改菜单请求
      updateMenu(this.form).then(res=>{
        // 处理修改成功的结果
        successAlert(res.data.msg)
        this.cancel();
        this.requestMenuList()
      })
    }
  },
  mounted(){
    // 组件挂载完成时,获取菜单列表数据
    this.requestMenuList()
  }
}
</script>

<style scoped>

</style>

```

## 5.list.vue

```vue
<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children'}"
    >
      <el-table-column prop="id" label="菜单编号"  >
      </el-table-column>
      <el-table-column prop="title" label="菜单名称"  >
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column prop="status" label="状态">
          <template v-slot="prop">
              <el-button type="primary" v-if="prop.row.status==1">启用</el-button>
              <el-button type="danger" v-else>禁止</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
          <template v-slot="prop">
            <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
            <el-button type="danger" @click="del(prop.row.id)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {delMenu} from '../../../utils/request'
import { successAlert } from '../../../utils/alert';
export default {
  data(){
    return {
    }
  },
  computed:{
    ...mapGetters({
      "tableData":"menu/menuList"
    })
  },
  methods:{
    ...mapActions({
      "requestMenuList":"menu/menuListActions"
    }),
    // 事件传递方法
    edit(id){
      // 传递自定义edit事件过去
      this.$emit('edit',id)
    },
    // 删除菜单
    del(id){
       this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发起删除菜单请求
          delMenu({id}).then(res=>{
              // 已经删除成功
              successAlert(res.data.msg);
              this.requestMenuList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  },
  mounted(){
    // 发起菜单列表请求
    this.requestMenuList()
  }
};
</script>

<style></style>

```

## 6.router/index.js

```js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 引入组件
const login = ()=>import('../pages/login/login')
const index = ()=>import('../pages/index/index')
const menu = ()=>import('../pages/menu/menu')
const home = ()=>import('../pages/home/home')

export default new Router({
  routes: [
    {
      path:'/login',
      alias:'l',
      component:login
    },
    {
      path:'/',
      component:index,
      children:[
        {
          path:'home',
          name:'首页',
          component:home
        },
        {
          path:'menu',
          name:'菜单',
          component:menu
        },
        {
          path:'',
          redirect:'/home',
        }
      ]
    },
    {
      path:'*',
      redirect:'/login'
    }
  ]
})

```

## 7.request/index.js

```js
import axios from 'axios'
import qs from 'qs'
import {errorAlert} from './alert'

//设置基础路径
const baseUrl = "/api";


// 设置一个响应拦截
axios.interceptors.response.use(res=>{
  console.group('本次响应路径为:'+res.config.url)
  if(res.data.code !== 200){
    errorAlert(res.data.msg);
    return;
  }
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
    params,
  })
}


// 获取一条菜单
export const oneMenu = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/menuinfo',
    params,
  })
}


// 修改菜单
export const updateMenu = (data)=>{
  return axios({
    method:'post',
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

```

