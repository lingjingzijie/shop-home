<template>
  <div class="wrap">
      <div class="con">
          <h3>欢迎登陆</h3>
          <el-input v-model="user.username" placeholder="用户名" ></el-input>
          <el-input v-model="user.password" type="password" placeholder="请输入密码" ></el-input>
          <div class="btn">
              <el-button type="primary" @click="login">登录</el-button>
          </div>
      </div>
  </div>
</template>

<script>
import { successAlert, waringAlert } from '../../utils/alert';
import { requestLogin } from "../../utils/requset";
import { mapGetters,mapActions } from "vuex";
export default {
    data(){
        return {
            user:{
                username:'',
                password:''
            }
        }
    },
    methods:{
        ...mapActions({
            requestUser:'userActions'
        }),

        login(){
            //方式二：通过vuex结合sessionStorage来做用户信息存储
            if(this.user.username !== '' || this.user.userpassword !== ''){
                // 允许发起请求
                requestLogin(this.user).then(res=>{
                    successAlert(res.data.msg)
                    // 将用户信息存到vuex中\
                    this.requestUser(res.data.list)
                    this.$router.push('/')
                })
            } else{
                waringAlert('请输入用户号或密码')
            }





            // if(this.user.username !== '' || this.user.userpassword !== ''){
            //     // 允许发起请求
            //     requestLogin(this.user).then(res=>{
            //         successAlert(res.data.msg)
            //         // 将用户信息存到localhost中\
            //         if(localStorage.getItem('user') !== null){
            //             localStorage.removeItem('user')
            //         }
            //         localStorage.setItem('user',JSON.stringify(res.data.list))
            //         this.$router.push('/')
            //     })
            // } else{
            //     waringAlert('请输入用户号或密码')
            // }
            
        }
    }
};
</script>

<style scoped>
.wrap{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(#563443,#2F3D60);
    position: fixed;
    top: 0;
    left: 0;
}
.con{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 400px;
    height: 300px;
    background: #fff;
    border-radius: 20px;
}
h3{
    text-align: center;
    margin: 10px;
}
.el-input,.el-button{
    width: 80%;
    margin: 20px 40px;
}


</style>