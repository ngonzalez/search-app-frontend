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
                <v-list-item link @click="handleClick($event, dataUrl)">
                  <!-- Icon -->
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon>mdi-folder-open</v-icon>
                    </v-list-item-title>
                  </v-list-item-content>

                  <!-- Folder / Subfolder -->
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-chip color="blue darken-2"
                        class="ma-1"
                        x-small
                        outlined
                        pill>
                        {{ folder }}
                      </v-chip>

                      <v-chip color="purple darken-2"
                        class="ma-1"
                        x-small
                        outlined
                        pill
                        v-if="subfolder != 'N/A'">
                        {{ subfolder }}
                      </v-chip>
                    </v-list-item-title>
                  </v-list-item-content>

                  <!-- Name -->
                  <v-list-item-content>
                    <v-list-item-title>
                      <div class="ma-2">
                        {{ name }}
                      </div>
                    </v-list-item-title>
                  </v-list-item-content>
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
            this.$toast.warning(this.$t('error.uknonwn'));
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
