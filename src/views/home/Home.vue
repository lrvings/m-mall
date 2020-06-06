<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.id">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import { getHomeMultidata } from 'network/home'
import {Swiper,SwiperItem} from 'common/swiper'
export default {
  name: 'Home',
  components:{
    NavBar,
    Swiper,
    SwiperItem
  },
  data() {
    return {
      banners: [],
      recommend: [],
    }
  },
  created() {
    //* 请求首页全部数据
    getHomeMultidata()
    .then(res => {
      console.log(res)
      this.banners = res.data.banner.list
      this.recommend = res.data.recommend.list
    })
  },
}

</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
