<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shopinfo"/>
      <detail-comment-info :commentInfo="commentInfo" />
      <detail-goods-info :detailInfo="detailinfo"/>
      <detail-param-info :paramInfo="paramInfo"/>
    </scroll>
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

import Scroll from 'common/scroll/Scroll'
import {getDetail ,Goods ,Shop ,GoodsParam} from 'network/detail'

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
    Scroll
  },
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shopinfo: {},
      detailinfo: {},
      paramInfo: {},
      commentInfo: {}
    }
  },
  created() {
    // * 保存传入的ID
    this.id = this.$route.params.id

    //* 根据ID --->请求商品详情数据
    getDetail(this.id).then(res => {

      console.log( res[0].data.result);

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
    })
  }
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
  height: calc(100% - 44px);
}

</style>
