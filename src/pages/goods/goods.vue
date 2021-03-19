<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 添加子组件 -->
    <v-add :info="info"></v-add>
  </div>
</template>

<script>
import vAdd from "./components/add";
export default {
  data() {
    return {
      info: {
        show: false,
        title: "",
        isAdd: true,
      },
    };
  },
  methods: {
    add() {
      this.info = {
        show: true,
        title: "添加商品",
        isAdd: true,
      };
    },
  },
  components: {
    vAdd,
  },
};
</script>

<style scoped>
.el-button{
    margin-top: 10px;
}
</style>