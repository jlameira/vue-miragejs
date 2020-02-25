import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { filterBase } from './utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    properties: [],
    reviews: {},
    filters: {},
  },
  mutations: {
    ['SET_FILTER'](state, { item, value }) {
      if (!state.filters[item]) {
        Vue.set(state.filters, item, []);
      }

      const filters = state.filters[item];

      if (filters.includes(value)) {
        state.filters[item] = filters.filter(item => item != value);
      } else {
        filters.push(value);
      }
    },
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
    async fetchProperties({ commit }) {
      const response = await axios.get('/api/properties');
      commit('SET_PROPERTIES', { properties: response.data.properties });
    },
    fetchReviews({ commit }, propertyId) {
      return axios.get(`/api/reviews?propertyId=${propertyId}`).then(res => {
        commit('SET_REVIEWS', { propertyId, reviews: res.data.reviews });
      });
    },
    resetReviews({ commit }, propertyId = null) {
      commit('RESET_REVIEWS', { propertyId });
    },
    setFilter({ commit }, { item, value }) {
      commit('SET_FILTER', { item, value });
    },
  },
  getters: {
    // eslint-disable-next-line no-unused-vars
    filters({ properties }) {
      return filterBase(properties);
    },
    listProperties({ properties, filters }) {

      properties = properties.filter(item => {
        for (var key in filters) {
          if (
            item[key] === undefined ||
            (!filters[key].includes(item[key]) && filters[key].length > 0)
          ) {
            return false;
          }
        }
        return true;
      });

      return properties.sort();
    },
  },
});
