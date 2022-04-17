import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    searchResponse: {},
    searchQuery: "",
    searchFolder: "",
    searchSubfolder: "",
    folder: {},
    audioFiles: {},
    images: {},
  },
  getters: {
    searchResponse: (state) => state.searchResponse,
    searchQuery: (state) => state.searchQuery,
    searchFolder: (state) => state.searchFolder,
    searchSubfolder: (state) => state.searchSubfolder,
    folder: (state) => state.folder,
    audioFiles: (state) => state.audioFiles,
    images: (state) => state.images,
  },
  plugins: [
    createPersistedState({
      getState: (key) => $cookies.get(key),
      setState: (key, state) => {
        console.log('key: ' + key);
        console.log(state);
        $cookies.set(key, state, { expires: 1 });
      },
    }),
  ],
  mutations: {
    setSearchResponse(state, searchResponse) {
      console.log('setSearchResponse');
      console.log(searchResponse)
      state.searchResponse = searchResponse;
    },
    setSearchQuery(state, searchQuery) {
      console.log('setSearchQuery');
      console.log(searchQuery)
      state.searchQuery = searchQuery;
    },
    setSearchFolder(state, searchFolder) {
      console.log('setSearchFolder');
      console.log(searchFolder)
      state.searchFolder = searchFolder;
    },
    setSearchSubfolder(state, searchSubfolder) {
      console.log('setSearchSubfolder');
      console.log(searchSubfolder)
      state.searchSubfolder = searchSubfolder;
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
