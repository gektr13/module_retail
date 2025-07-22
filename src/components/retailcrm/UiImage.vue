<template>
  <img :src="src" :alt="alt" class="ui-image" />
</template>
<script setup lang="ts">
defineProps<{ src: string, alt?: string, resize?: string }>()
</script>
<style scoped>
.ui-image {
  max-width: 100%;
  border-radius: 4px;
}
</style> 