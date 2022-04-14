<template>
  <ul>
    <li v-if="!searchResults.length">
      {{ $t('search.loading') }}
    </li>
    <li v-for="item in searchResults">
      <slot name="item" v-bind="item" />
    </li>
  </ul>
</template>
