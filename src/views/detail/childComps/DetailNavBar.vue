<template>
   <nav-bar>
     <div slot="left" class="nav-back" @click="backHandle">
       <img src="~assets/img/common/back.svg" alt="">
     </div>
     <div class="title" slot="center">
        <div class="title-item"
        v-for="(item,index) in titles" :key="index"
        :class="{active: index === currenIndex}" @click="itemClick(index)">
      {{ item }}
    </div>
     </div>
   </nav-bar>
</template>

<script>
import NavBar from 'common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  data() {
    return {
      titles: ['商品','评论','参数','推荐'],
      currenIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    itemClick(index){
      this.currenIndex = index
      this.$emit('titleClick',index)
    },
    backHandle(){
      this.$router.back()
    }
  }
}

</script>

<style scoped>
.title{
  display: flex;
  font-size: 13px;
}

.title-item{
  flex: 1;
}

.nav-back img{
  margin-top: 10px;
}

.active{
  color: var(--color-high-text)
}
</style>
