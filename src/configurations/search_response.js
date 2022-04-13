import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['searchResponse']),
    searchResults() {
      return this.searchResponse.folders;
    },
    hasResults() {
      return this.searchResponse &&
             this.searchResponse.folders &&
             this.searchResponse.folders.length > 0
    }
  },
};
