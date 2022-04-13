<template>
  <v-card>
    <v-progress-linear
      indeterminate
      v-show="loading"
      color="blue darken-2">
    </v-progress-linear>
    <h3 class="ma-4 pa-4">
      {{ folder.name }}
    </h3>
    <v-container fluid class="ma-4 pa-4">
      <v-row>
        <v-col>
          <FilesList>
            <template #item="{ id, itemId, dataUrl }">
              <v-list>
                <v-list-item link @click="handleClick($event, itemId)">
                  <v-list-item-action class="ma-4 pa-4">
                    <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title class="text-h6">
                      {{ dataUrl }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ id }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </template>
          </FilesList>
        </v-col>
        <v-col>
          <div v-if="hasImages">
            <v-carousel
              cycle
              height="500"
              hide-delimiter-background
              show-arrows-on-hover>

              <v-carousel-item
                v-for="image in images"
                :src="'https://link12.ddns.net:9090' + image.thumbUrl">
              </v-carousel-item>
            </v-carousel>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import { mapMutations } from 'vuex';
  import showItem from '../mutations/showItem';
  import FilesList from '../components/FilesList.vue';
  import _get from 'lodash/get';
  import axios from 'axios';

  export default {
    name: 'LoadFolder',
    components: { FilesList },
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
      railsImportExternalUrl(itemId) {
        return 'https://link12.ddns.net:3000/audio_files/' + itemId + '.json';
      },
      hlsServerExternalUrl(itemId) {
        return 'https://link12.ddns.net:3000/hls/' + itemId + '.m3u8';
      },
      handleClick(event, itemId) {
        if (this.loading) return;
        this.loading = true;
        this.intervals[itemId] = setInterval(() => {
          axios.get(this.railsImportExternalUrl(itemId))
          .then((response) => _get(response, 'data', {}))
          .then((response) => {
            if (response.m3u8_exists) {
              this.loading = false;
              clearInterval(this.intervals[itemId]);
              window.location = this.hlsServerExternalUrl(itemId);
            }
          })
          .catch((error) => {
            this.$toast.warning(error);
          })
        }, 2000);
      },
    },
  };
</script>
