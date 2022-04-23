<template>
  <v-card class="container">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-bind:label="$t('search.input_label')"
            class="pa-1 ma-1"
            color="blue darken-2"
            outlined
            variant="outlined"
            clearable
            clear-icon="mdi-delete"
            @click:clear="handleClickClear"
            @keydown.enter="handleSearchFromInput"
            v-model="searchQuery">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="hasResults">
        <v-col cols="12">
          <SearchResults>
            <template #item="{ id, dataUrl, name, folder, subfolder }">
              <v-list>
                <v-list-item>
                  <!-- Icon -->
                  <v-list-item-title>
                    <v-icon>mdi-folder-open</v-icon>
                  </v-list-item-title>

                  <!-- Folder / Subfolder -->
                  <v-list-item-title>
                    <v-chip
                      color="blue darken-2"
                      @click="handleClickFolder($event, dataUrl, folder)"
                      class="ma-1"
                      x-small
                      outlined
                      pill>
                      {{ folder }}
                    </v-chip>

                    <v-chip
                      color="purple darken-2"
                      @click="handleClickSubfolder($event, dataUrl, folder, subfolder)"
                      v-if="subfolder != 'N/A'"
                      class="ma-1"
                      x-small
                      outlined
                      pill>
                      {{ subfolder }}
                    </v-chip>
                  </v-list-item-title>

                  <!-- Name -->
                  <v-list-item-title
                    @click="handleClick($event, dataUrl)"
                    class="ma-2 cursorPointer">
                    {{ name }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </template>
          </SearchResults>
        </v-col>
      </v-row>
      <v-row v-if="!hasResults" align="center" justify="center" class="noResults">
        <v-col cols="12">
          {{ $t('search.no_results') }}
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols=12 class="ma-5 pa-5">
          <v-pagination
            color="blue darken-2"
            :size="10"
            :show-first-last-page="true"
            :total-visible="10"
            v-model:model-value="currentPage"
            v-model:length="totalPages"
            @update:modelValue="handleSearchFromPagination">
          </v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import { mapMutations } from 'vuex';
  import SearchResults from '../components/SearchResults.vue';
  import search from '../mutations/search';
  import _ from 'lodash';
  import _get from 'lodash/get';

  export default {
    name: 'SearchTable',
    components: { SearchResults },
    data() {
      return {
        search: {},
        defaultSearchParams: {
          page: 1,
          q: '',
          folder: '',
          subfolder: '',
        },
      };
    },
    methods: {
      ...mapMutations(['setStoreData']),
      handleSearch() {
        search(_.assign({ apollo: this.$apollo }, this.search))
          .then((response) => _get(response, 'data.search', {}))
          .then((response) => {
            this.setStoreData({
              'search': _.assign(this.search, {
                response: response
              })
            });
          }).catch((error) => {
            this.$toast.warning(this.$t('error.uknonwn'));
          });
      },
      handleClick(event, dataUrl) {
        this.$router.push(dataUrl);
      },
      handleClickClear(event) {
        _.assign(this.search, this.defaultSearchParams);
        this.handleSearch();
      },
      handleSearchFromInput(event) {
        _.assign(this.search,
          _.assign(this.defaultSearchParams, {
            q: event.target.value,
          })
        );
        this.handleSearch();
      },
      handleSearchFromPagination(event) {
        _.assign(this.search,
          _.assign(this.storeData.search, {
            page: event,
          })
        );
        this.handleSearch();
      },
      handleClickFolder(event, dataUrl, folder) {
        _.assign(this.search,
          _.assign(this.defaultSearchParams, {
            folder: folder,
          })
        );
        this.handleSearch();
      },
      handleClickSubfolder(event, dataUrl, folder, subfolder) {
        _.assign(this.search,
          _.assign(this.defaultSearchParams, {
            folder: folder,
            subfolder: subfolder,
          })
        );
        this.handleSearch();
      },
    },
  };
</script>
