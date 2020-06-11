<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content"
            ref="scroll"
            :probeType="3"
            @scroll="contentHandle"
            :pullUpLoad="true"
            @pullingUp="loadmore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" />
      <!-- 推荐信息 -->
      <recommend-view :recommends="recommends" />

      <featrue-view />
      <!-- 分类切换 -->
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" />
      <!-- 商品列表 -->
      <good-list :goods="goodList"></good-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodList from "content/goods/GoodsList";
import Scroll from 'common/scroll/Scroll'
import BackTop from 'content/backTop/BackTop'

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatrueView from "./childComps/FeatrueView";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatrueView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goodList: {},
      isShowBackTop: false
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods()
  },
  methods: {
    //* 点击回到顶部
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    //* 监听内容滚动高度 是否显示回到顶部图标
    contentHandle(position){
      this.isShowBackTop = -position.y > 1000
    },
    loadmore(){
      console.log('上拉加载更多');
      this.getHomeGoods()
    },
    //* 请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // * 请求商品数据
    getHomeGoods(){
    //  const page = this.goods[type].page + 1
      getHomeGoods().then(res => {
        // this.goods[type].list.push(...res.data.list)
        // this.goods[type].page += 1
        this.goodList = res
      })
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 2;
}

.tab-control {
  position: sticky;
  top: 44px;
}
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;

}
</style>
