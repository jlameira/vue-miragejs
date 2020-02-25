<script>
import PropertyCard from '@/components/PropertyCard';
import { mapActions, mapState } from 'vuex';

const actions = mapActions(['resetReviews', 'fetchProperties']);
const state = mapState(['properties', 'reviews']);

export default {
  name: 'Properties',
  data() {
    return {
      message: '',
    };
  },
  computed: {
    ...state,
    hasDisplayedReviews() {
      return Object.keys(this.reviews).some(key => this.reviews[key].length > 0);
    },
  },
  components: { PropertyCard },
  async mounted() {
    try {
      this.fetchProperties();
    } catch (error) {
      this.message = error.response.data;
    }
  },
  methods: {
    ...actions,
    clearReviews() {
      this.resetReviews();
    },
  },
};
</script>

<template>
  <div>
    <button v-show="this.hasDisplayedReviews" @click="clearReviews()">Close all reviews</button>
    <div class="mt-20">
      <h4 data-testid="error" class="text-2xl" v-if="message !== ''">{{ message }}</h4>
      <PropertyCard
        v-else
        data-testid="property"
        v-for="property in properties"
        :key="property.id"
        :property="property"
      />
    </div>
  </div>
</template>
