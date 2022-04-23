<template>
  <ul>
    <li v-for="item in searchResults" v-if="hasResults">
      <slot name="item" v-bind="item" />
    </li>
  </ul>
</template>
