<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" @change="changeCate">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option v-for="item in seconedCate" :key="item"  :value="item.id" :label=" item.catename"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="form.specsid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option v-for="item in specList" :key="item.id" :label="item.specsname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-select v-model="form.specsattr" @change="changeSpec(false)">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.isnew" :label="1">是</el-radio>
            <el-radio v-model="form.isnew" :label="2">否</el-radio>
          </template>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.ishot" :label="1">是</el-radio>
            <el-radio v-model="form.ishot" :label="2">否</el-radio>
          </template>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="blue"
            inactive-color="grey"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
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
import { mapActions, mapGetters } from 'vuex';
export default {
  props: ["info"],
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        price: "",
        market_price: "",
        img: "",
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      formLabelWidth: "120px",
      seconedCate:[],//获取二级分类列表
      secondSpec:[],//获取规格属性列表
    };
  },
  computed:{
    ...mapGetters({
      cateList:'cate/cateList',
      speclist:'spec/specList'
    })
  },
  methods:{
    ...mapActions({
      requestCateList:'cate/cateListActions',
      requestSpecList:'spec/specListActions'
    }),
    changeCate(){
    
      this.form.second_cateid = ''
     
      var index = this.cateList.findIndex(item=>item.id = this.form.first_cateid)
      this.seconedCate = this.cateList[index].children
    }
  },
  mounted(){
    // 获取一级分类列表
    this.requestCateList()
    // 获取商品规格列表
    this.requestSpecList()
  }
};
</script>

<style>
</style>