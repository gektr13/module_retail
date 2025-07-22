<template>
  <button class="ui-toolbar-button" @click="$emit('click')">
    <slot>{{ title }}</slot>
  </button>
</template>
<script setup lang="ts">
defineProps<{ title?: string }>()
</script>
<style scoped>
.ui-toolbar-button {
  background: #ffa800;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
}
</style> 