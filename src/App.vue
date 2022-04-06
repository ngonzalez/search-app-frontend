<template>
  <v-app>
    <v-main>
      <v-toolbar>
        <router-link :to="{ name: 'home' }">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </router-link>
        <v-toolbar-title></v-toolbar-title>
      </v-toolbar>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'ApplicationRootComponent',
};
</script>
