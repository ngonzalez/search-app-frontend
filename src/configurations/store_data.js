import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['storeData']),
    searchQuery() {
      if (!this.storeData.search) return;
      return this.storeData.search.q;
    },
    searchResults() {
      if (!this.storeData.search) return;
      return this.storeData.search.response.results;
    },
    currentPage() {
      if (!this.storeData.search) return;
      return this.storeData.search.response.currentPage;
    },
    totalPages() {
      if (!this.storeData.search) return;
      return this.storeData.search.response.totalPages;
    },
    hasResults() {
      return this.storeData.search &&
             this.storeData.search.response &&
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
