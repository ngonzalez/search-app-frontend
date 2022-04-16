import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['searchResponse']),
    searchResults() {
      return this.searchResponse.results;
    },
    hasResults() {
      return this.searchResponse &&
             this.searchResponse.results &&
             this.searchResponse.results.length > 0
    }
  },
};
