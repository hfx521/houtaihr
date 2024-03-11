<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理内容 -->
      <div class="role-operate">
        <el-button @click="showDialog = true" size="mini" type="primary">添加角色</el-button>
      </div>
      <!-- 放置table组件 -->
      <el-table :data="list">
        <!--放置列  -->
        <el-table-column prop="name" align="center" width="200" label="角色" />
        <el-table-column prop="state" align="center" width="200" label="启用" >
          <!-- 自定义列结构 -->
          <template v-slot="{row}">
            <span>{{ row.state === 1 ? "已启用" : row.state === 0 ? "未启用" : "无" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述" />
        <el-table-column align="center" label="操作">
          <!-- 放置操作按钮 -->
          <template>
            <el-button size="mini" type="text">分配权限</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 放置分页组件 -->
      <el-row type="flex" style="height: 60px;" align="middle" justify="end">
        <!-- 放置分页组件 -->
        <el-pagination :page-size="pageParams.pagesize" :current-page="pageParams.page" :total="pageParams.total" @current-change="changePage"
         layout="prev, pager, next" />
      </el-row>
    </div>
    <!-- 放置弹出层 -->
    <el-dialog @close="btnCancel" width="500px" title="新增角色" :visible.sync="showDialog">
      <!-- 表单内容 -->
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item prop="name"  label="角色名称">
          <el-input v-model="roleForm.name" style="width:300px;" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="启用" prop="state">
          <!--重置表单数据 需要添加prop -->
          <!-- 如果不需要校验 就不需要添加prop属性 -->
          <el-switch :active-value="1"
    :inactive-value="0" v-model="roleForm.state" size="mini"></el-switch>
        </el-form-item>
        <el-form-item prop="description" label="角色描述">
          <el-input v-model="roleForm.description" type="textarea" :rows="3" style="width: 300px;"size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button @click="btnOK" type="primary" size="mini">确定</el-button>
              <el-button @click="btnCancel" size="mini">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {getRoleList,addRole} from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      list:[],
      showDialog:false, //控制弹层 
      // 将分页信息放置到一个对象当中
      pageParams:{
        page:1, //第几页
       pagesize:5, //每页多少条
       total:0
    },
    roleForm: {
      name:'',
      description:'',
      state:0 //1启用 0关闭
    },
    rules: {
      name:[{required:true,message:'角色名称不能为空',trigger:'blur'}],
      description:[{required:true,message:'角色描述不能为空',trigger:'blur'}],
    }
  }
},
  created() {
    this.getRoleList()
  },
    methods: {
      async getRoleList() {
        const {rows,total} = await getRoleList(this.pageParams)
        this.list = rows //赋值数据
        this.pageParams.total = total
      },
      //切换分页时请求新的数据
      changePage(newPage) {
       this.pageParams.page = newPage //赋值当前页码
       this.getRoleList()
      },
      btnOK() {
        this.$refs.roleForm.validate(async isOK => {
          if (isOK) {
            await addRole(this.roleForm)
            this.$message('新增角色成功')
            this.getRoleList()
            this.btnCancel()
          }
        })
      },
      btnCancel() {
        this.$refs.roleForm.resetFields() //重置表单数据
        this.showDialog = false //关闭弹层
      }
    }
}
</script>
<style scoped>
.role-operate {
  padding: 10px;
}


</style>
