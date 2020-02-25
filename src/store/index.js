import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    properties: [],
    reviews: {},
  },
  mutations: {
    ['SET_PROPERTIES'](state, { properties }) {
      state.properties = properties;
    },
    ['SET_REVIEWS'](state, { propertyId, reviews }) {
      Vue.set(state.reviews, propertyId, reviews);
    },
    ['RESET_REVIEWS'](state, { propertyId }) {
      if (propertyId) {
        Vue.set(state.reviews, propertyId, []);
      } else {
        Vue.set(state, 'reviews', {});
      }
    },
  },
  actions: {
    async fetchProperties({commit}){
      const response = await axios.get('/api/properties');
      commit('SET_PROPERTIES',{properties: response.data.properties})

    },
    fetchReviews({ commit }, propertyId) {
      return axios.get(`/api/reviews?propertyId=${propertyId}`).then(res => {
        commit('SET_REVIEWS', { propertyId, reviews: res.data.reviews });
      });
    },
    resetReviews({ commit }, propertyId = null) {
      commit('RESET_REVIEWS', { propertyId });
    },
  },
  modules: {},
});
