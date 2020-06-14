<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shopinfo"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <detail-goods-info :detailInfo="detailinfo"/>
      <detail-param-info :paramInfo="paramInfo" ref="params"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'common/scroll/Scroll'

import {getDetail ,Goods ,Shop ,GoodsParam} from 'network/detail'
import {backTopMixin} from '../../common/mixin'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll
  },
  mixins: [backTopMixin],
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shopinfo: {},
      detailinfo: {},
      paramInfo: {},
      commentInfo: {},
      themeTopYs: [],
      currenIndex: 0
    }
  },
  created() {
    //* 保存传入的ID
    this.id = this.$route.params.id

    //* 根据ID --->请求商品详情数据
    getDetail().then(res => {
      //*   接收请求数据
      const data = res[0].data.result
      //* 1.轮播图数据
      this.topImages = data.topImages
      //* 2.商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //* 3.店铺信息
      this.shopinfo = new Shop(data.shopInfo)
      //* 4.商品详情信息
      this.detailinfo = data.detailInfo
      //* 5.商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //* 7. 评论信息
      if(data.rateInfo.cRate !== 0){
        this.commentInfo = data.rateInfo.list[0]
      }

        //? 获取主题模offsetTop  滚动到指定位置 ---->存在Bug  因为图片高度没有被计算 会导致高度不对 ---解决：在图片加载完成后获取高度
        this.$nextTick(() => {
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)
        })
    })
  },
  methods: {
    //* 点击标题，滚动到对应内容
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
    },
    //* 滚动内容 ，显示对应标题
    contentScroll(position) {
      let positionY = -position.y
      let length = this.themeTopYs.length

      for(let i = 0;i < length -1; i++) {
        if(this.currenIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
          this.currenIndex = i
          this.$refs.nav.currenIndex = this.currenIndex
        }
      }

      //* 是否显示BackTop
      this.isShowBackTop = -position.y > 1000
    },
    addToCart(){
      const product = {}
      // 1.获取购物车需要展示的信息
      product.id = this.id
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.newPrice = this.goods.newPrice
      // 2.将商品添加到购物车
     this.$store.commit('addCart',product)
    }
  },
}

</script>

<style scoped>
#detail{
  position: relative;
  z-index: 13;
  height: 100vh;
  background-color: #fff;
}

.detail-nav {
  position: relative;
  z-index: 2;
  background-color: #fff;
}

.content {
  height: calc(100% - 93px);
}

</style>
