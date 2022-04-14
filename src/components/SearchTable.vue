<template>
  <v-card class="container" elevation=5>
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
    <v-container fluid v-if="hasResults">
      <v-row>
        <v-col cols=12>
          <SearchResults>
            <template #item="{ id, dataUrl, name }">
              <v-list>
                <v-list-item link @click="handleClick($event, dataUrl)">
                  <v-list-item-action>
                    <v-icon style="color:#000;">mdi-folder-open</v-icon>
                  </v-list-item-action>

                  <v-list-item-content class="listItemHome">
                    <v-list-item-title>
                      {{ name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </template>
          </SearchResults>
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
    <v-container fluid v-else>
      <v-row>
        <v-col cols=12>
          <h5 class="pa-5">
            {{ $t('search.no_results') }}
          </h5>
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
    data() {
      return {
        currentPage: 1,
      };
    },
    methods: {
      ...mapMutations(['setSearchResponse', 'setSearchQuery']),
      handleSearchFromInput(event) {
        this.setSearchQuery(event.target.value);
        this.currentPage = 1;
        this.handleSearch();
      },
      handleSearchFromPagination(event) {
        this.currentPage = event;
        this.handleSearch();
      },
      handleSearch() {
        search({
          apollo: this.$apollo,
          page: this.currentPage,
          q: this.searchQuery,
        }).then((response) => _get(response, 'data.search', {}))
          .then((response) => {
            this.setSearchResponse(response);
          }).catch((error) => {
            this.$toast.warning(error);
          });
      },
      handleClick(event, dataUrl) {
        this.$router.push(dataUrl);
      },
      handleClickClear(event) {
        this.setSearchQuery('');
      }
    },
  };
</script>
