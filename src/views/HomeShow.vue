<template>
  <v-container fluid>
    <SearchTable></SearchTable>
  </v-container>
</template>

<script>
import SearchTable from '../components/SearchTable.vue';

export default {
  name: 'HomeShow',
  components: { SearchTable },
};
</script>
