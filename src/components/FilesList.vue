<template>
  <ul>
    <li v-if="!audioFiles.length">
      Loading...
    </li>
    <li v-for="item in audioFiles">
      <slot name="item" v-bind="item" />
    </li>
  </ul>
</template>
