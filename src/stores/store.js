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
      getItem: (key) => $cookies.get(key),
      setItem: (key, state) => {
        $cookies.set(key, state, { expires: 1 });
      },
      removeItem: (key) => $cookies.remove(key),
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
