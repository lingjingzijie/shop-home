<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="form.pid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option label="顶级分类" :value="0" ></el-option>
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="changeImg">
                <img v-if="imageUrl" :src="imageUrl" class="avatar" >
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload >
        </el-form-item>

        <el-form-item label="分类状态" :label-width="formLabelWidth">
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
import { addCate,oneCate, updateCate, } from '../../../utils/requset'
import { mapGetters,mapActions } from "vuex";
export default {
    props:['info'],
    data(){
        return{
          imageUrl:'',
            form:{
                pid:0,
                catename:'',
                img:'',
                status:1,
            },
            formLabelWidth:'120px'
        }
    },
    computed:{
      ...mapGetters({
        'cateList':'cate/cateList'
      })
    },
    methods:{
        ...mapActions({
          "requestCateList":'cate/cateListActions'
        }),
        // 改变图片时获取图片路径及星系
        changeImg(e){
          if(e.size > 2*1024*1024){
            waringAlert('文件大小不能超过2M')
            return
          }

          // 处理文件后缀
          var ext = ['.jpg','.png','.jpng','.gif']
          // 取文件后缀
          var extName = e.name.slice(e.name.lastIndexOf('.'))
          if(!ext.some(item=>item==extName)){
            waringAlert('上传文件格式不正确')
            return
          }

          // 上传正确的文件
          this.imageUrl = URL.createObjectURL(e.raw)
          // 将文件存入img中
          this.form.img = e.raw
        },
        cancel(){
            this.info.show = false
            this.form = {
                pid:0,
                catename:'',
                img:'',
                status:1,
            }
            this.imageUrl = ''
        },
        confirm(){
            addCate(this.form).then(res=>{
              successAlert(res.data.msg)
              this.cancel()
              this.requestCateList()
            })
        },
        getDetail(id){
            oneCate({id}).then(res=>{
                this.form = res.data.list
                this.form.id = id
                // 为目录没有图片时编辑不显示图片，为商品时加载图片
                if(this.form.img){
                  this.imageUrl = this.$proImg + this.form.img
                }else{
                  this.imageUrl = ''
                }
            })
        },
        update(){
          updateCate(this.form).then(res=>{
            successAlert(res.data.msg)
            this.cancel()
            this.requestCateList()
          })
        }
    },
    mounted(){
        this.requestCateList()
    }
    


}
</script>

<style>
/* .img-box{
    width: 150px;
    height: 150px;
    border: 1px dashed #000;
    position: relative;
}
.img-box h3{
    text-align: center;
    line-height: 150px;
    width: 100%;
    height: 100%;
}
.img-box img{
    width: 150px;
    height: 150px;
    position: absolute;
    left: 0;
    top: 0;
}
.img-box input{
    width: 150px;
    height: 150px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
} */


.avatar-uploader >>> .el-upload {
    
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader >>> .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    border: 1px dashed #000;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }


</style>