<template>
  <div id="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车( {{ cartLength }} )</div></nav-bar>

    <cart-list class="cart-list"/>
    <bottom-bar/>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";

import CartList from './childComps/CartList'
  import BottomBar from './childComps/BottomBar'

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    BottomBar
  },
  computed: {
    ...mapGetters(["cartLength","cartList"]),
  }
};
</script>

<style scoped>
#cart {
  /*position: relative;*/
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
}

.cart-list {
  position: absolute;
  top: 44px;
  bottom: 49px;
  width: 100%;
}
</style>
