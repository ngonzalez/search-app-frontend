<template>
  <ul>
    <li v-if="!searchResults.length">
      {{ $t('loading') }}
    </li>
    <li v-for="item in searchResults">
      <slot name="item" v-bind="item" />
    </li>
  </ul>
</template>
