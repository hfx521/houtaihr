<template>
    <el-dialog title="新增部门" :visible="showDialog" @close="close">
        <!-- 弹出层内容 -->
        <el-form ref="addDept" :model="formData" :rules="rules" label-width="120px">
            <el-form-item v-model="formData.name" prop="name" label="部门名称">
                <el-input v-model="formData.name" placeholder="2-10个字符" style="width: 80%;" size="mini"/>
            </el-form-item>
            <el-form-item v-model="formData.code" prop="code" label="部门编码">
                <el-input v-model="formData.code" placeholder="2-10个字符" style="width: 80%;" size="mini"/>
            </el-form-item>
            <el-form-item v-model="formData.managerId" prop="managerId" label="部门负责人">
                <el-select v-model="formData.managerId" placeholder="请选择部门负责人" style="width: 80%;" size="mini">
                    <!-- 下拉选项  循环 负责人数据 lable表示显示的字段 value表示存储的字段-->
                    <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-model="formData.introduce" prop="introduce" label="部门介绍">
                <el-input v-model="formData.introduce" placeholder="1-100个字符" type="textarea" size="mini" style="width: 80%;" />
            </el-form-item>
            <el-form-item>
                <!-- 按钮 -->
                <el-row type="flex" justify="center">
                    <el-col :span="12">
                        <el-button size="mini"> 确定</el-button>
                        <el-button size="mini">取消</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
import {getDepartment,getManagerList} from '@/api/department'
export default {
    props: {
        showDialog: {
            type:Boolean,
            default:false
        },
        currentNodeId: {
            type:Number,
            default:null
        }
    },
    data() {
       return {
        managerList:[],//存储负责人的列表
        formData:{
            code:'', //部门介绍
            managerId:'', //部门负责人名称
            name:'', //部门名称
            pid:'' //父级部门的id
        },
        rules:{
            code:[{
                required: true, message: '部门编码不能为空', trigger:'blur'
            },{
                min:2, max:10, message:'部门编码的长度为2-10个字符',trigger:'blur'
            },{
                trigger:'blur',
                // 自定义校验
                validator:async(rule,value,callback) => {
                    // value就是输入的编码
                    const result = await getDepartment()
                    // result数组中是否存在value值
                    if(result.some(item => item.code === value)) {
                        callback(new Error('部门中已经有该编码了'))
                    } else {
                        callback()
                    }
                }
            }], //部门介绍
            introduce:[{
                required: true, message: '部门介绍不能为空', trigger:'blur'
            },{
                min:2, max:10, message:'部门介绍的长度为1-100个字符',trigger:'blur'
            },],
            managerId:[{
                required: true, message: '部门负责人不能为空', trigger:'blur'
            },{
                min:2, max:10, message:'部门负责人的长度为2-10个字符',trigger:'blur'
            }], //部门负责人名称
            name:[{
                required: true, message:'部门名称不能为空', trigger:'blur'
            },{
                min:2, max:10, message:'部门名称的长度为2-10个字符',trigger:'blur'
            },{
                trigger:'blur',
                // 自定义校验
                validator:async(rule,value,callback) => {
                    // value就是输入的编码
                    const result = await getDepartment()
                    // result数组中是否存在value值
                    if(result.some(item => item.name === value)) {
                        callback(new Error('部门中已经有该名称了'))
                    } else {
                        callback()
                    }
                }
            }], //部门名称
            //pid:'' //父级部门的id 
        }
       }
    },
    created () {
        this.getManagerList()
    },
    methods: {
        //修改父组件的值 子传父
        close() {
          this.$emit('update:showDialog',false)  
        },
        async getManagerList() {
            this.managerList = await getManagerList(this.currentNoteId)  
        }
    }
}
</script>
