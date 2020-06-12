<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 障眼法 -->
    <tab-control  ref="tabControl" :titles="['流行', '新款', '精选']" class="tab-control" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probeType="3"
            @scroll="contentHandle"
            :pullUpLoad="true"
            @pullingUp="loadmore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!-- 推荐信息 -->
      <recommend-view :recommends="recommends" />

      <featrue-view />
      <!-- 分类切换 -->

      <tab-control  ref="tabControl" :titles="['流行', '新款', '精选']" />
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
import {debounce} from '../../common/utils'

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
      isShowBackTop: false,
      tabControl: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  activated() {
    // *保持 home的状态高度
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    //* 离开时 记录离开的高度
    this.saveY = this.$refs.scroll.getScrollY()
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods()
  },
  mounted() {
    //*  图片加载完成的事件监听
    let refresh = debounce(this.$refs.scroll.refresh)
    this.$bus.$on('itemImageLoad',() => {
      refresh()
    })
  },
  methods: {
    //* 点击回到顶部
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    //* 监听内容滚动高度
    contentHandle(position){
      //* 是否显示BackTop
      this.isShowBackTop = -position.y > 1000

      this.isTabFixed = -position.y > this.tabControl
    },
    loadmore(){
      console.log('由于接口数据不完善 暂无更多数据');
    },
    swiperImageLoad(){
      //* 获取tabControl的 offsetTop  --> 组件中$el属性 用于获取组件中的元素
      this.tabControl = this.$refs.tabControl.$el.offsetTop
    },
    //* 请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        const data = res[0].data
        this.banners = data.banner.list;
        this.recommends = data.recommend.list;
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
  position: relative;
  padding-top: 44px;
  height: 100vh;
}
.home-nav {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  background-color: var(--color-tint);
  color: #fff;
  z-index: 2;
}


.content{
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
}
.tab-control{
  position: relative;
  z-index: 9;

}
</style>
