<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="*所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            type="password"
            v-model="form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="菜单状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="blue"
            inactive-color="grey"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm" v-if="info.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addManager, oneManager, updateManager } from "../../../utils/requset";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/roleList",
    }),
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/roleListActions",
      requestCount: "manager/countActions",
      requestManagerList: "manager/managerListActions",
    }),
    cancel() {
      this.info.show = false;
      this.form = {
        username: "",
        password: "",
        status: 1,
      };
    },
    confirm() {
      // 的发起数据请求
      addManager(this.form).then((res) => {
        this.cancel();
        successAlert(res.data.msg);
        // 获取总的记录数
        this.requestCount();
        // 更新了表
        this.requestManagerList();
      });
    },
    getDetail(uid) {
      // 发起管理员详情请求
      oneManager({ uid }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    update() {
      //发起修改请求
      updateManager(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        this.requestManagerList();
      });
    },
  },

  mounted() {
    this.requestRoleList();
  },
};
</script>

<style scoped>
.el-input {
  width: 70%;
}
</style>