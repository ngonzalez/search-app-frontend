<template>
  <v-card class="container">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          {{ searchQuery }}
          {{ searchFolder }}
          {{ searchSubfolder }}
          <hr />
          {{ searchResponse }}
          <hr />
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
            v-model:model-value="searchResponse.currentPage"
            v-model:length="searchResponse.totalPages"
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
  import _get from 'lodash/get';

  export default {
    name: 'SearchTable',
    components: { SearchResults },
    created() {
      // this.handleSearch();
      console.log('---');
      console.log(this.searchQuery);
      console.log(this.searchResponse);
    },
    data() {
      return {
        currentPage: 1,
      };
    },
    methods: {
      ...mapMutations(['setSearchResponse', 'setSearchQuery', 'setSearchFolder', 'setSearchSubfolder']),
      handleSearch() {
        search({
          apollo: this.$apollo,
          page: this.currentPage,
          q: this.searchQuery,
          folder: this.searchFolder,
          subfolder: this.searchSubfolder,
        }).then((response) => _get(response, 'data.search', {}))
          .then((response) => {
            this.setSearchResponse(response);
          }).catch((error) => {
            this.$toast.warning(this.$t('error.uknonwn'));
          });
      },
      handleClick(event, dataUrl) {
        this.$router.push(dataUrl);
      },
      handleClickClear(event) {
        this.setSearchQuery('');
        this.setSearchFolder('');
        this.setSearchSubfolder('');
        this.handleSearch();
      },
      handleSearchFromInput(event) {
        this.setSearchQuery(event.target.value);
        this.setSearchFolder('');
        this.setSearchSubfolder('');
        this.currentPage = 1;
        this.handleSearch();
      },
      handleSearchFromPagination(event) {
        this.currentPage = event;
        this.handleSearch();
      },
      handleClickFolder(event, dataUrl, folder) {
        this.setSearchQuery('');
        this.setSearchFolder(folder);
        this.setSearchSubfolder('');
        this.currentPage = 1;
        this.handleSearch();
      },
      handleClickSubfolder(event, dataUrl, folder, subfolder) {
        this.setSearchQuery('');
        this.setSearchFolder(folder);
        this.setSearchSubfolder(subfolder);
        this.currentPage = 1;
        this.handleSearch();
      }
    },
  };
</script>
