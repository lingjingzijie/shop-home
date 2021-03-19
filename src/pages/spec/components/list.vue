<template>
  <div>
    <el-table
      :data="specData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="规格编号"  > 
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" >
      </el-table-column>
      <el-table-column prop="attrs" label="规格属性">
           <template  v-slot='prop'>
               <el-tag v-for="(item,index) in prop.row.attrs" :key='index' >
                   {{item}}
               </el-tag>
           </template>
      </el-table-column>
      
      <el-table-column prop="status" label="状态"> 
        <template  v-slot='prop'>
          <el-button type="primary" v-if="prop.row.status==1">启用</el-button>
          <el-button type="danger" v-else>禁止</el-button>
        </template> 
      </el-table-column>
      <el-table-column prop="url" label="操作">
        <template v-slot='prop'>
          <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(prop.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :page-size='2' @current-change='cPage'  :total="count">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import { delSpec } from "../../../utils/requset";
import { successAlert } from "../../../utils/alert";
export default {
    data(){
        return{
        }
    },
    computed:{
        ...mapGetters({
            specData:'spec/specList',
            count:'spec/count'
        })
    },
    methods:{
        ...mapActions({
            requestSpecList:'spec/specListActions',
            requestCount:'spec/countActions',
            requestPage:'spec/pageActions'
        }),
        cPage(page){
            this.requestPage(page)
            this.requestSpecList()
        },
        edit(id){
          this.$emit('edit',id)
        },
        del(id){
          this.$confirm('确定要删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // 发起删除菜单请求
              delSpec({id}).then(res=>{
                  // 已经删除成功
                  successAlert(res.data.msg);
                  this.requestCount()
                  this.requestSpecList()
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
        this.requestCount()
        this.requestSpecList()
        
    }
}
</script>

<style>

</style>