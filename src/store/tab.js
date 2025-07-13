export default{
  state:{
    isCollapse:false, //控制菜单的展开还是收起
    tabList:[
      {
        path: "/home",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      }
    ]
  },
  mutations:{
    //定义修改菜单展开收起的方法
    collapseMenu(state){
      state.isCollapse = !state.isCollapse
    },
    //更新面包屑
    selectMenu(state,val){
      //console.log(val,'val')
      //判断点击数据是否为首页，为首页则不操作不添加
      if(val.name !== "home"){
        const index = state.tabList.findIndex(item => item.name === val.name)
        //如果不存在在当前tablist则添加
        if (index === -1){
          state.tabList.push(val)
        }
      }
    }
  }
}