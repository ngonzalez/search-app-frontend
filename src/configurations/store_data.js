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
    currentFolder() {
      if (!this.storeData.displayItem) return;
      return this.storeData.displayItem.folder;
    },
    audioFiles() {
      if (!this.storeData.displayItem) return;
      return this.storeData.displayItem.audioFiles;
    },
    hasAudiofiles() {
      return this.storeData.displayItem &&
             this.storeData.displayItem.audioFiles &&
             this.storeData.displayItem.audioFiles.length > 0
    },
    images() {
      if (!this.storeData.displayItem) return;
      return this.storeData.displayItem.images;
    },
    hasImages() {
      return this.storeData.displayItem &&
             this.storeData.displayItem.images &&
             this.storeData.displayItem.images.length > 0
    },
  },
};
