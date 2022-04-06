<template>
  <v-card>
    <v-progress-linear
      indeterminate
      v-show="loading"
      color="blue darken-2">
    </v-progress-linear>
    <v-container fluid>
      <v-row dense>
        <v-col>
          <h4 class="ma-2 pa-2">
            {{ folder.name }}
          </h4>
          <br />
          <ol v-for="file in audioFiles">
            <li @click="handleClick($event, file)">
              <span class="cursor-pointer">
                {{ file.dataUrl }}
              </span>
            </li>
          </ol>
        </v-col>
        <v-col>
          <div v-for="image in images">
            <img :src="'https://link12.ddns.net:443' + image.thumbUrl">
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import { mapMutations } from 'vuex';
  import showItem from '../mutations/showItem';
  import _get from 'lodash/get';
  import axios from 'axios';

  export default {
    name: 'LoadFolder',
    created() {
      this.emptyStore();
      this.loadFolder();
    },
    data: {
      intervals: {},
      loading: false,
    },
    methods: {
      ...mapMutations(['setFolder', 'setAudioFiles', 'setImages']),
      emptyStore() {
        this.setFolder({});
        this.setAudioFiles({});
        this.setImages({});
      },
      setResponse(response) {
        this.setFolder(response.folder);
        this.setAudioFiles(response.audioFiles);
        this.setImages(response.images);
      },
      loadFolder() {
        showItem({
          apollo: this.$apollo,
          id: this.$route.params.id,
        }).then((response) => _get(response, 'data.showItem', {}))
          .then((response) => {
            this.setResponse(response);
          }).catch((error) => {
            this.$toast.warning(error);
          });
      },
      railsImportExternalUrl(file) {
        return 'http://192.168.1.13:3002/audio_files/' + file.itemId + '.json';
      },
      hlsServerExternalUrl(file) {
        return 'http://192.168.1.13:8080/hls/' + file.itemId + '.m3u8';
      },
      handleClick(event, file) {
        if (this.loading) return;
        this.loading = true;
        this.intervals[file.id] = setInterval(() => {
          axios.get(this.railsImportExternalUrl(file))
          .then((response) => _get(response, 'data', {}))
          .then((response) => {
            if (response.m3u8_exists) {
              this.loading = false;
              clearInterval(this.intervals[file.id]);
              window.location = this.hlsServerExternalUrl(file);
            }
          })
          .catch((error) => {
            this.$toast.warning(error);
          })
        }, 2000)
      },
    },
  };
</script>
