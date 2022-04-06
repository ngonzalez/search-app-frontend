import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['searchResponse']),
    hasResults() {
      return this.searchResponse &&
             this.searchResponse.folders &&
             this.searchResponse.folders.length > 0
    }
  },
};
