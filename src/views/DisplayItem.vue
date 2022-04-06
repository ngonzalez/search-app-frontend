<template>
  <v-container fluid>
    <LoadFolder></LoadFolder>
  </v-container>
</template>

<script>
import LoadFolder from '../components/LoadFolder.vue';

export default {
  name: 'FolderShow',
  components: { LoadFolder },
};
</script>
