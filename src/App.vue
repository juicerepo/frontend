<template>
  <div class="element-demo">
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  name:'App'
}
</script>

<style lang="less">
//去掉默认样式
  html,body,h3,p{
    margin :0;
    padding:0
  }
</style>