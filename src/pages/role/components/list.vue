<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="角色编号"> </el-table-column>
      <el-table-column prop="rolename" label="角色名称"> </el-table-column>

      <el-table-column prop="status" label="状态">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.status == 1">启用</el-button>
          <el-button type="danger" v-else>禁止</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="url" label="操作">
        <template v-slot="prop">
          <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(prop.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import { delRole } from "../../../utils/requset";
import { successAlert } from "../../../utils/alert";
export default {
    computed:{
        ...mapGetters({
            'tableData':'role/roleList'
        })
    },
    methods:{
        ...mapActions({
            'requestRoleList':'role/roleListActions'
        }),
        edit(id){
            this.$emit('edit',id)
        },
        del(id){
          this.$confirm('确定要删除嘛?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            delRole({id}).then(res=>{
              // 已经删除成功
              successAlert(res.data.msg),
              this.requestRoleList()
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
        this.requestRoleList();
    }

};
</script>

<style>
</style>