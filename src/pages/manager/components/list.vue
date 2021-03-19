<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="roleid" label="所属角色"> </el-table-column>

      <el-table-column prop="status" label="状态">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.status == 1">启用</el-button>
          <el-button type="danger" v-else>禁止</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="url" label="操作">
        <template v-slot="prop">
          <el-button type="primary" @click="edit(prop.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(prop.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :page-size='2' @current-change='cPage'  :total="count">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import  {delManager}  from "../../../utils/requset";
import  {successAlert}  from "../../../utils/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      tableData: "manager/managerList",
      count: "manager/count",
    }),
  },
  methods: {
    ...mapActions({
      'requestManagerList': "manager/managerListActions",
      'requestCount': "manager/countActions",
      'requestPage':'manager/pageActions'
    }),
    // 
    cPage(page){
      this.requestPage(page)
      this.requestManagerList()
    },
    edit(uid){
      this.$emit('edit',uid)
    },
    del(uid){
      this.$confirm('确定要删除嘛?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            delManager({uid}).then(res=>{
              // 已经删除成功
              successAlert(res.data.msg)
              this.requestCount()
              this.requestManagerList()
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  mounted() {
    this.requestCount();
    this.requestManagerList();
  },
};
</script>

<style>
</style>