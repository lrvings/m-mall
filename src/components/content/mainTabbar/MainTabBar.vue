<template>
    <tab-bar>
      <tab-bar-item
        v-for="(i, index) in tabarArr"
        :key="index"
        @click.native="switchTo(i.path)"
      >
        <img
          slot="item-icon"
          :src="i.path === $route.path ? i.actived : i.normal"
        />
        <div
          slot="item-text"
          :style="i.path === $route.path ? { color: 'red' } : {}"
        >
          {{ i.name }}
        </div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from "common/tabbar/Tabbar";
import TabBarItem from "common/tabbar/TabBarItem";
export default {
  name: "MainTabBar",
  components:{
    TabBar,
    TabBarItem
  },
  data() {
    return {
      tabarArr: [
        {
          path: "/home",
          name: "首页",
          normal: require("assets/img/tabbar/home.svg"),
          actived: require("assets/img/tabbar/home_active.svg")
        },
        {
          path: "/detail",
          name: "详情",
          normal: require("assets/img/tabbar/category.svg"),
          actived: require("assets/img/tabbar/category_active.svg")
        },
        {
          path: "/cart",
          name: "购物车",
          normal: require("assets/img/tabbar/cart.svg"),
          actived: require("assets/img/tabbar/cart_active.svg")
        },
        {
          path: "/profile",
          name: "我的",
          normal: require("assets/img/tabbar/profile.svg"),
          actived: require("assets/img/tabbar/profile_active.svg")
        }
      ]
    };
  },
  methods: {
    switchTo(path) {
      //*  路由跳转
      this.path = this.$router.push(path).catch(() => {});
    }
  },
};
</script>

<style scoped></style>
