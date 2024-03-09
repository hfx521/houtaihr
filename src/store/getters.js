const getters = {
  sidebar: state => state.app.sidebar, //app模块属性
  device: state => state.app.device,
  token: state => state.user.token, //user模块属性
  userId:state => state.user.userInfo.userId,
  avatar: state => state.user.userInfo.staffPhoto, //头像
  name: state => state.user.userInfo.username //用户名称
}
//getters便捷访问
export default getters
