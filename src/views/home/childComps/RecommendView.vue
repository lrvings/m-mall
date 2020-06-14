<template>
  <div  class="recommend">
    <div v-for="item in recommends" :key="item.id" class="recommend-item">
      <a :href="item.link" >
        <img :src="item.image" alt="">
        <span class="text">{{ item.title }}</span>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}

</script>

<style scoped>
.recommend{
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;

}
.recommend-item{
  flex: 1;
  padding-bottom: 10px;
}
.recommend-item img{
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}
.text{
  display: block;
  width: 80px;
  margin-left: 10px;
}
</style>
