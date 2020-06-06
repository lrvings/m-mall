<template>
  <div id="app">
    <!-- 底部导航 -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>

import MainTabBar from 'content/mainTabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar,
  }
}
</script>

<style>
@import url("assets/css/base.css");
</style>
