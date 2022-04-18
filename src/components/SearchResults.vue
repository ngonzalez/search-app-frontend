<template>
  <ul>
    <li v-for="item in storeData.search.response.results" v-if="hasResults">
      <slot name="item" v-bind="item" />
    </li>
  </ul>
</template>
