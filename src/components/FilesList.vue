<template>
  <ul>
    <li v-if="!audioFiles.length">
      {{ $t('loading') }}
    </li>
    <li v-for="item in audioFiles">
      <slot name="item" v-bind="item" />
    </li>
  </ul>
</template>
