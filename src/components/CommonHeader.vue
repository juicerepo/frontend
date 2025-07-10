<template>
  <div class="header-container">
    <div class="l-content"> 
      <!-- 左边 -->
      <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
      <!-- 面包屑 -->
      <!-- <span class="text"> -->
        <el-breadcrumb class="breadcrumb-container" separator="/">
          <el-breadcrumb-item 
            v-for="item in tags" 
            :key="item.path" 
            @click.native="handleBreadcrumbClick(item)">
            <!-- 使用自定义点击事件替代 :to -->
            <span :class="{'current-page': $route.path === item.path}">
              {{ item.label }}
            </span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      <!-- </span> -->

    </div>
    <div class="r-content">
      <!-- 右边 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="pic" src="../assets/user.png" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex'
export default{
  data(){
    return{}
  },
  methods:{
    handleMenu(){
      this.$store.commit('collapseMenu')
    },
    // 新增面包屑点击处理
    handleBreadcrumbClick(item) {
    // 检查是否已经是当前路由
    if (this.$route.path !== item.path) {
      this.$router.push(item.path);
      }
    }
  },
  computed:{
    ...mapState({
      tags: state => state.tab.tabList
    })
  },
  mounted(){
    console.log(this.tags,'tags')
  }
}
</script>

<style lang="less" scoped>
.header-container{
  background-color: #333;
  height: 60px;
  display:flex;//页面为弹性布局
  justify-content:space-between;//横向均匀分布
  align-items: center;//竖直居中对齐
  padding:0 20px; //修正避免紧靠左边

  .l-content {
    display: flex;
    align-items: center; /* 垂直居中 */
    
    /* 按钮样式 */
    .el-button {
      margin-right: 16px; /* 按钮与面包屑间距 */
      color: #333; /* 按钮图标颜色 */
      font-size: 16px; /* 图标大小 */
    }
  }
  
  /* 面包屑容器 */
  .breadcrumb-container {
    margin: 0; /* 移除原有外边距 */
    padding: 0; /* 移除原有内边距 */
    background: none; /* 移除背景色 */
    box-shadow: none; /* 移除阴影 */
  }

  /* 面包屑项 */
  .breadcrumb-container /deep/ .el-breadcrumb__item {
    font-size: 14px; /* 调整字体大小 */
    cursor: pointer; /* 添加指针样式表示可点击 */
  }

  /* 面包屑文字样式 */
  .breadcrumb-container /deep/ .el-breadcrumb__inner,
  .breadcrumb-container /deep/ .el-breadcrumb__inner a {
    color: #fff !important; /* 白色字体 */
    font-weight: normal;
    transition: color 0.3s;
  }

  /* 最后一项高亮 */
  .breadcrumb-container /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    font-weight: bold; /* 加粗 */
    color: #fff !important; /* 保持白色 */
  }

  /* 鼠标悬停效果 */
  .breadcrumb-container /deep/ .el-breadcrumb__item:hover .el-breadcrumb__inner {
    color: #a0d8ff !important; /* 悬停时浅蓝色 */
  }

  /* 分隔符样式 */
  .breadcrumb-container /deep/ .el-breadcrumb__separator {
    margin: 0 8px; /* 分隔符间距 */
    color: #ccc !important; /* 分隔符颜色 */
  }

  .r-content{//设置用户图像大小
    .pic{
      width:40px;
      height:40px;
      border-radius: 50%;
    }
  }


}

</style>