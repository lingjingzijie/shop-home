<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="*规格名称" :label-width="formLabelWidth">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item v-for="(item,index) in attrArr" :key="index" label="规格属性" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="item.value" ></el-input>
          </el-col>
          <el-button class="attr" type="primary" v-if="index==0" @click="addAttr">添加商品属性</el-button>
          <el-button class="attr" type="danger" v-else @click="delAttr(index)">删除商品属性</el-button>
        </el-form-item>
        
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch  v-model="form.status" active-color="blue" inactive-color="grey" :active-value="1" :inactive-value="2" >
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
import { successAlert, waringAlert } from '../../../utils/alert'
import { addSpec, oneSpec, updateSpec } from '../../../utils/requset'
import { mapActions } from "vuex";
export default {
  props:['info'],
  data(){
    return {
      attrArr:[{value:''}],//添加规格属性
      form:{
        specsname:'',
        attrs:'',
        status:1,
      },
      formLabelWidth:'120px',
    }
  },
  methods:{
    ...mapActions({
      "requestCount":"spec/countActions",
      "requestSpecList":"spec/specListActions",
    }),
    addAttr(){
      this.attrArr.push({value:''})
    },
    delAttr(index){
      this.attrArr.splice(index,1)
    },
    cancel(){
      this.info.show = false;
      this.form={
        specsname:'',
        attrs:'',
        status:1,
      }
      this.attrArr=[{value:''}]
    },
    confirm(){
     
      if(this.attrArr.some(item=>item.value === '')){
        waringAlert('加商品属性值不能为空')
        return
      }
      this.form.attrs = this.attrArr.map(item=>item.value).join(',')
      addSpec(this.form).then(res=>{
        successAlert(res.data.msg)
        this.cancel()
        this.requestCount()
        this.requestSpecList()
      })
    },
    getDetail(id){
      oneSpec({id}).then(res=>{
        this.form = res.data.list[0]
        this.id = id
        // 商品属性
        // 通过split方法吧字符串分割成数组
        var arr = this.form.attrs.split(',');
        this.attrArr = [];
        for(let i in arr){
          this.attrArr.push({value:arr[i]})
        }
      })
    },
    update(){
      // 判断商品是佛为空
      if(this.attrArr.some(item=>item.value === '')){
        waringAlert('加商品属性值不能为空')
        return
      }
      // map()方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
      // join() 方法用于把数组中的所有元素转换一个字符串。
      this.form.attrs = this.attrArr.map(item=>item.value).join(',')
      // 发起修改数据请求
      updateSpec(this.form).then(res=>{
        successAlert(res.data.msg)
        this.cancel()
        this.requestSpecList()
      })
    }
  },

}
</script>

<style>
.attr{
  margin-top: -10px ;
}
</style>