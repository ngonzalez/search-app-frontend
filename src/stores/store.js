import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    searchResponse: {},
    searchQuery: "",
    folder: {},
    audioFiles: {},
    images: {},
  },
  getters: {
    searchResponse: (state) => state.searchResponse,
    searchQuery: (state) => state.searchQuery,
    folder: (state) => state.folder,
    audioFiles: (state) => state.audioFiles,
    images: (state) => state.images,
  },
  actions: {
    setSearchResponse(context, searchResponse) {
      context.commit('setSearchResponse', searchResponse);
    },
    setSearchQuery(context, query) {
      context.commit('setSearchQuery', searchQuery);
    },
    setFolder(context, folder) {
      context.commit('setFolder', folder);
    },
    setAudioFiles(context, audioFiles) {
      context.commit('setAudioFiles', audioFiles);
    },
    setImages(context, images) {
      context.commit('setImages', images);
    },
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
    setSearchResponse(state, searchResponse) {
      state.searchResponse = searchResponse;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    setFolder(state, folder) {
      state.folder = folder;
    },
    setAudioFiles(state, audioFiles) {
      state.audioFiles = audioFiles;
    },
    setImages(state, images) {
      state.images = images;
    },
  },
});
