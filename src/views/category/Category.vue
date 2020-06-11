<template>
  <div>
    <h1 class="tit">分类界面</h1>
    <div class="wrapper">
      <ul class="content">
       
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Category',
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(document.querySelector('.wrapper'),{
      probeType: 3
    })
    this.scroll.on('scroll',(position) => {
      console.log(position);
    })
  },
}

</script>

<style scoped>
.wrapper{
  height: 300px;
  background: lawngreen;
}
</style>
