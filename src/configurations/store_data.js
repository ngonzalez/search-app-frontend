import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['storeData']),
    searchResults() {
      return this.storeData.search.response.results;
    },
    hasResults() {
      return this.storeData.search.response &&
             this.storeData.search.response.results &&
             this.storeData.search.response.results.length > 0
    },
    hasAudiofiles() {
      return this.storeData.displayItem &&
             this.storeData.displayItem.audioFiles &&
             this.storeData.displayItem.audioFiles.length > 0
    },
    hasImages() {
      return this.storeData.displayItem &&
             this.storeData.displayItem.images &&
             this.storeData.displayItem.images.length > 0
    },
  },
};
