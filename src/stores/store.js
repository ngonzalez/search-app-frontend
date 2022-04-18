import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    storeData: {},
  },
  getters: {
    storeData: (state) => state.storeData,
  },
  plugins: [
    createPersistedState({
      getState: (key) => $cookies.get(key),
      setState: (key, state) => {
        $cookies.set(key, state, { expires: 1 });
      },
    }),
  ],
  mutations: {
    setStoreData(state, data) {
      for (const k in data) {
        state.storeData[k] = data[k]
      }
    },
  },
});
