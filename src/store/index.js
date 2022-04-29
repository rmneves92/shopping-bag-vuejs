import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    products: [],
    productsInBag: [],
  },
  mutations: {
    loadProducts(state, products) {
      state.products = products;
    },

    loadBag(state, products) {
      state.productsInBag = products;
    },

    addToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));
    },

    removeFromBag(state, productId) {
      const updatedBag = state.productsInBag.filter(item => productId !== item.id);
      state.productsInBag = updatedBag;
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));
    },
  },
  actions: {
    loadProducts({ commit }) {
      axios.get('https://fakestoreapi.com/products').then(response => {
        commit('loadProducts', response.data);
      });
    },

    loadBag({ commit }) {
      const productsInBag = localStorage.getItem('productsInBag');

      if (productsInBag) {
        commit('loadBag', JSON.parse(productsInBag));
      }
    },

    addToBag({ commit }, product) {
      commit('addToBag', product);
    },

    removeFromBag({ commit }, productId) {
      if (confirm('Are you sure you want to remove the item from bag?')) commit('removeFromBag', productId);
    },
  },
  modules: {},
});
