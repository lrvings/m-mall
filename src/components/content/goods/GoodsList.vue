<template>
  <div class="good">

    <good-list-item v-for="item in goods" :key="item.id" :goodsItem="item"></good-list-item>

  </div>
</template>

<script>
import GoodListItem from './GoodsListItem'
export default {
  name: 'GoodsList',
  components: {
    GoodListItem
  },
  props: {
    goods:{
      type: Object,
      default(){
        return {}
      }
    }
  },
}

</script>

<style scoped>

</style>
