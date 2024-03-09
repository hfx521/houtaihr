const getters = {
  sidebar: state => state.app.sidebar, //app模块属性
  device: state => state.app.device,
  token: state => state.user.token, //user模块属性
  userId:state => state.user.userInfo.userId,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
//getters便捷访问
export default getters
