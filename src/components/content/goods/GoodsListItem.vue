<template>
  <div class="goods-all">
    <div v-for="item in goodsItem" :key="item.ids"  class="goods-item" @click="gotodetail">
      <img :src="item.img" alt="" @load="imageLoad"/>
      <div class="goods-info">
        <p>{{ item.title }}</p>
        <span class="price">{{ item.price }}</span>
        <span class="collect">{{ item.cfav }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    imageLoad(){
      // *事件总线
      this.$bus.$emit('itemImageLoad')
    },
    gotodetail(){;
      //* Bug  总是拿到最后一个ID
      // this.goodsItem.forEach(item => {  this.id = item.id })
      // let ids = this.iid
      // let p = new Promise((resolve,reject) => {
      //     for(var item of this.goodsItem) {
      //      resolve(item)
      //     }
      // })
      // p.then(res => {
      //   ids = res.id
      // })
       this.$router.push('/detail/'+ this.goodsItem[0].id)
    }

  },

}
</script>

<style scoped>
.goods-all{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 10px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
