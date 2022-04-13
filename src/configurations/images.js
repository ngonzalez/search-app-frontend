import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['images']),
    hasImages() {
      return this.images &&
             this.images.length > 0
    }
  },
};
