<template>
  <div>
      <el-dialog :title="info.title" :visible.sync="info.show">
        <el-form :model="form">

        <el-form-item label="角色名称" :label-width="formLabelWidth">
            <el-input v-model="form.rolename" ></el-input>
        </el-form-item>

        <el-form-item label="角色权限" :label-width="formLabelWidth">  
            <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="defaultKey" :props="defaultProps" ref='tree'>
            </el-tree>
        </el-form-item>

        <el-form-item label="角色状态" :label-width="formLabelWidth">
            <el-switch v-model="form.status" active-color="blue" inactive-color="grey" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confrim"  v-if="info.isAdd">确 定</el-button>
            <el-button type="primary" @click="update" v-else>修 改</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import { successAlert } from '../../../utils/alert';
import { addRole,oneRole,updateRole} from "../../../utils/requset";
export default {
    props:['info'],
    data(){
        return {
            form:{
                rolename:'',
                status:1,
                menus:'',
            },
            formLabelWidth: '120px',
            defaultProps: {
                children: 'children',
                label: 'title' 
            },
            defaultKey:[],//默认选中的key值
        }
    },
    // 计算属性
    computed:{
        ...mapGetters({
            'data':'menu/menuList'
        })
    },
    methods:{
        ...mapActions({
            'requestMenuList':'menu/menuListActions',
            'requestRoleList':'role/roleListActions'

        }),
        cancel(){
            this.info.show = false;
            this.form={
                rolename:'',
                status:1,
                menus:'',
            }
            this.defaultKey=this.$refs.tree.setCheckedKeys([])
        },
        // 添加角色
        confrim(){
            this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
            // 添加角色
            addRole(this.form).then(res=>{
                successAlert(res.data.msg)
                this.cancel()
                this.requestRoleList()
            })
        },
        getDetail(id){
            // 获取角色详情
            oneRole({id}).then(res=>{
                this.form = res.data.list;
                this.form.id = id;
                this.defaultKey = JSON.parse(this.form.menus)
            })

        },
        update(){
            this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
            updateRole(this.form).then(res=>{
                successAlert(res.data.msg)
                this.cancel()
                this.requestRoleList()
            })
        },
        del(){

        }
    }, 
    mounted(){
        this.requestMenuList();
    }

}
</script>

<style>

</style>