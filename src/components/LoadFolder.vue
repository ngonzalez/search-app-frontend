<template>
  <v-card class="container" elevation=5>
    <v-container>
      <v-breadcrumbs :items="breadcrumbs" align="center" justify="center">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
      <a-affix :style="{ position: 'sticky', top: 0 }" v-if="hasImages">
        <v-carousel
          cycle
          height="320"
          hide-delimiter-background
          show-arrows-on-hover>

          <v-carousel-item
            v-for="image in images"
            :src="'https://link12.ddns.net:9090' + image.thumbUrl">
          </v-carousel-item>
        </v-carousel>
      </a-affix>
      <FilesList>
        <template #item="{ id, itemId, dataUrl }">
          <v-list>
            <v-list-item link @click="handleClick($event, itemId)" elevation>
              <v-list-item-content class="listItem pa-1 ma-1">
                <v-list-item-title>
                  <v-icon>mdi-console-line</v-icon>
                  {{ dataUrl }}
                </v-list-item-title>

                <v-list-item class="video" v-bind:id="'player-' + itemId">
                  <v-progress-linear
                    indeterminate
                    reverse
                    stream
                    v-show="loading"
                    class="pa-1 ma-1"
                    color="blue">
                  </v-progress-linear>
                </v-list-item>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
      </FilesList>
    </v-container>
  </v-card>
</template>

<script>
  import { mapMutations } from 'vuex';
  import showItem from '../mutations/showItem';
  import FilesList from '../components/FilesList.vue';
  import _ from 'lodash';
  import _get from 'lodash/get';
  import axios from 'axios';

  export default {
    name: 'LoadFolder',
    components: { FilesList },
    created() {
      this.emptyStore();
      this.loadFolder();
      this.breadcrumbs = [];
      this.addBreadcrumb(this.$t('home.title'), '/');
    },
    data: {
      intervals: {},
      loading: false,
      breadcrumbs: [],
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
      addBreadcrumb(text, href) {
        this.breadcrumbs.push({
          text: text,
          disabled: false,
          href: href
        });
      },
      loadFolder() {
        showItem({
          apollo: this.$apollo,
          id: this.$route.params.id,
        }).then((response) => _get(response, 'data.showItem', {}))
          .then((response) => {
            this.setResponse(response);
            this.addBreadcrumb(this.folder.name, this.folder.dataUrl);
          }).catch((error) => {
            this.$toast.warning($t('error.uknonwn'));
          });
      },
      railsImportExternalUrl(itemId) {
        return 'https://link12.ddns.net:3000/audio_files/' + itemId + '.json';
      },
      hlsServerExternalUrl(itemId) {
        return 'https://link12.ddns.net:3000/hls/' + itemId + '.m3u8';
      },
      buildIframe(url) {
        let iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.height = 60;
        return iframe;
      },
      clearIframes() {
        _.map(document.getElementsByClassName('video'), function(el) {
          _.map(el.getElementsByTagName('iframe'), function(iframe) {
            iframe.src = '';
          });
        });
      },
      showPlayer(itemId) {
        _.map(document.getElementsByClassName('video'), function(el) {
          el.style.display = el.id == 'player-' + itemId ? 'block' : 'none';
        });
      },
      getPlayer(itemId) {
        return document.getElementById('player-' + itemId);
      },
      handleClick(event, itemId) {
        if (this.loading) return;
        if (this.getPlayer(itemId).getElementsByTagName('iframe').length > 0) return;
        this.loading = true;
        this.clearIframes();
        this.showPlayer(itemId);
        this.intervals[itemId] = setInterval(() => {
          axios.get(this.railsImportExternalUrl(itemId))
          .then((response) => _get(response, 'data', {}))
          .then((response) => {
            if (response.m3u8_exists) {
              clearInterval(this.intervals[itemId]);
              this.getPlayer(itemId).appendChild(
                this.buildIframe(
                  this.hlsServerExternalUrl(itemId)
                )
              );
              this.loading = false;
            }
          })
          .catch((error) => {
            this.$toast.warning($t('error.uknonwn'));
          })
        }, 2000);
      },
    },
  };
</script>
