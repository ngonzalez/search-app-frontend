import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['audioFiles']),
    hasAudiofiles() {
      return this.audioFiles &&
             this.audioFiles.length > 0
    }
  },
};
