import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)//全局注册组件

//require.context （目标目录，是否扫描子目录，正则表达式）扫描目录上的的文件
const req = require.context('./svg', false, /\.svg$/)
console.log(req.keys)
const requireAll = requireContext => requireContext.keys().map(requireContext)
//数组方法map 和for rach一样
//map循环每一项 svg图片 map() =》{}）
//req函数能够引图片到项目中
//将所有的svg都引用到项目中
requireAll(req)//调用函数

//webpack loader
