<template>
  <div class="header-container">
    <div class="l-content"> 
      <!-- 左边 -->
      <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
      <!-- 面包屑 -->
      <span class="text">首页</span>
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
export default{
  data(){
    return{}
  },
  methods:{
    handleMenu(){
      this.$store.commit('collapseMenu')
    }
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

  .text{
    color: #fff;
    font-size: 14px;  //文本字体大小
    margin-left: 10px;  //元素左侧外边距
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