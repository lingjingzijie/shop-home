<template>
  <div>
      <el-button type="primary" @click="add">添加</el-button>
      <!-- 添加子组件 -->
      <v-add :info='info' ref="add"></v-add>
      <!-- 列表组件 -->
      <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vList from "./components/list";
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
      this.info={
        show:true,
        title:'添加商品',
        isAdd:true
      }
    },
    edit(id){
      this.info={
        show:true,
        title:'添加商品',
        isAdd:false
      }
      this.$refs.add.getDetail(id)
    }
  },
  components:{
    vAdd,
    vList
  }

}
</script>

<style>
.el-button{
  margin-top: 10px;
}

</style>