<template>
  <ul>
    <li v-for="item in audioFiles" v-if="hasAudiofiles">
      <slot name="item" v-bind="item" />
    </li>
  </ul>
</template>
