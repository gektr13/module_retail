<template>
  <a class="ui-toolbar-link" :href="href">
    <slot>{{ title }}</slot>
  </a>
</template>
<script setup lang="ts">
defineProps<{ title?: string, href?: string }>()
</script>
<style scoped>
.ui-toolbar-link {
  color: #ffa800;
  text-decoration: underline;
  cursor: pointer;
}
</style> 