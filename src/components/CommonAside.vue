<template>
  <el-menu 
    default-active="1-4-1" 
    class="el-menu-vertical-demo" 
    @open="handleOpen" 
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse">

    <h3>{{ isCollapse ?  '后台': '图书后台管理系统' }}</h3> 

    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu v-for="item in hasChildren" :key="item.label"  :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item v-for="subItem in item.children" :key="subItem.name" :index="subItem.name" @click="clickMenu(subItem)">
        <i :class="`el-icon-${subItem.icon}`"></i>
        <span slot="title">{{ subItem.label }}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
  height:100vh;
  border-right: none;//左侧白线消失
  h3 {
      color:#fff;
      text-align:center;//文字居中
      line-height: 48px;
      font-size:16px;
      font-weight: 400px;

  }
}
</style>

<script>
export default {
  data() {
    return {
      //isCollapse: false,
      //isCollapse(),
      menuData: [
        {
          path: "/home",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "图书管理",
          icon: "goods",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面一",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面二",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //点击菜单
    clickMenu(item){
      console.log(item)
      //当页面的路由与跳转的路由不一致的时候才允许跳转
      if(this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path ==="/"))){
        this.$router.push(item.path)//route已挂载到vue下，可以实现页面跳转
      }
      this.$store.commit('selectMenu',item)
    }
  },
  computed:{
    //没有子菜单
    noChildren(){
      return this.menuData.filter(item => !item.children)
    },
    //有子菜单
    hasChildren(){
      return this.menuData.filter(item => item.children) 
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    }

  }
}
</script>