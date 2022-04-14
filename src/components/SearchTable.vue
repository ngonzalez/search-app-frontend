<template>
  <v-text-field
    label="Search"
    class="pa-1 ma-1"
    color="blue darken-2"
    outlined
    variant="outlined"
    clearable
    clear-icon="mdi-delete"
    v-model="searchQuery"
    @keydown.enter="handleSearchFromInput">
  </v-text-field>
  <v-container fluid v-if="hasResults">
    <v-row>
      <v-col cols=11>
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
           class="pa-2 ma-2"
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
  <div v-else>
    <h5 class="pa-5">
      {{ $t('search.no_results') }}
    </h5>
  </div>
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
      }
    },
  };
</script>
