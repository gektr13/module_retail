<template>
  <img :src="src" :alt="alt" class="ui-avatar" :style="{ width: size+'px', height: size+'px' }" />
</template>
<script setup lang="ts">
defineProps<{ src: string, alt?: string, size?: number }>()
</script>
<style scoped>
.ui-avatar {
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
}
</style> 