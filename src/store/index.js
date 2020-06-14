import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state,payload) {

      //? 判断是否有该商品
      let oldProduct = state.cartList.find(item => item.id === payload.id)

      if(oldProduct) {
        oldProduct.count += 1
      }else {
        payload.count = 1
        payload.checked = true
        state.cartList.push(payload)
      }
    }
  },
  getters: {
    cartLength(state) {
      return state.cartList.length
    },
    cartList(state) {
      return state.cartList
    },
  }
})

export default store
