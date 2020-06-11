<template>
  <div id="my-swiper" >
    <div class="swiper">
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">
      <slot name="indicator">
      <div class="indi-item"> </div>
      </slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Swiper',
  props:{

  },
  data() {
    return {
      slideCount: 0, //元素个数
      totalWidth: 0, //Swiper的宽度
      swiperStyle: {}, //swiperd的样式
      currentIndex: 1,
      scrolling: false,
    }
  },
}

</script>

<style scoped>

</style>
