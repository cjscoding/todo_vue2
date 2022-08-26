import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import todoStore from './todoStore';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    todoStore,
  },
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});

export default store;
