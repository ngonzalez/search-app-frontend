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
  <div v-if="hasResults">
    <v-table>
      <thead>
        <tr>
          <th>
            <span>{{ $t('search.title_name') }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in searchResponse.folders" :key="item.name">
          <td class="pa-3">
            <span class="group pa-2 teal">
              <v-icon color="blue darken-2">mdi-folder-open</v-icon>
            </span>
            <router-link :to="{ name: 'show', params: { id: item.dataUrl }}">{{ item.name }}</router-link>
          </td>
        </tr>
      </tbody>
    </v-table>
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
  </div>
  <div v-else>
    <h5 class="pa-5">
      {{ $t('search.no_results') }}
    </h5>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import search from '../mutations/search';
  import _get from 'lodash/get';

  export default {
    name: 'SearchTable',
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
    },
  };
</script>
