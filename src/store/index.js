import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
  },
  actions:{
    addCart(context, payload) {
      return new Promise((resolve, reject) => {

        let oldProduct = context.state.cartList.find(item => item.id === payload.id);

        if (oldProduct) {
          oldProduct.count += 1;
          resolve('当前数量+1')
        } else {
          payload.count = 1;
          payload.checked = true;
          context.state.cartList.push(payload);
          resolve('加入购物车成功')
        }
      })
    }
  },
  getters: {
    cartLength(state) {
      return state.cartList.length;
    },
    cartList(state) {
      return state.cartList;
    }
  }
});

export default store;
