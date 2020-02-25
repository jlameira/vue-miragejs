<template>
  <div class="cursor-pointer">
    <div class="relative px-4 py-2">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="flex mb-4 items-baseline">
          <!-- beds -->
          <div class="flex flex-row">
            <h4 class="font-bold mr-4">Beds</h4>
            <ul class="flex flex-row">
              <li class="ml-2 mr-3" v-for="(bed, index) in filters.beds" :key="index">
                <label>
                  <input type="checkbox" @click="setFilter({ item: 'beds', value: bed })" />
                  {{ bed }}
                </label>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <br />
        <!-- baths -->
        <div class="flex mb-4 items-baseline">
          <div class="flex flex-row">
            <h4 class="font-bold mr-4">Baths</h4>
            <ul class="flex flex-row">
              <li class="ml-2 mr-3" v-for="(bath, index) in filters.baths" :key="index">
                <label>
                  <input type="checkbox" @click="setFilter({ item: 'baths', value: bath })" />
                  {{ bath }}
                </label>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <br />
        <div class="flex mb-4 items-baseline">
          <!-- Ratings -->
          <div class="flex flex-row">
            <h4 class="font-bold mr-4">Rating</h4>
            <ul class="flex flex-row">
              <li class="ml-2 mr-3" v-for="(rat, index) in filters.rating" :key="index">
                <label>
                  <input type="checkbox" @click="setFilter({ item: 'rating', value: rat })" />
                  {{ rat }}
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

const getters = mapGetters(['filters']);

const actions = mapActions(['setFilter']);

export default {
  name: 'Filters',
  computed: getters,
  methods: actions,
};
</script>
