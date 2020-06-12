<template>
  <swiper class="d-content detail-swiper">
    <swiper-item v-for="item in topImages" :key="item.id" class="swiper-item">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "common/swiper";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  created() {

  },
  methods: {}
};
</script>

<style scoped>
.d-content {
  height: 300px;
  overflow: hidden;
}
</style>
