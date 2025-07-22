<template>
  <div v-if="visible" class="ui-modal-sidebar">
    <div class="sidebar-content">
      <slot />
    </div>
    <div class="sidebar-backdrop" @click="$emit('close')"></div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ visible: boolean }>()
</script>
<style scoped>
.ui-modal-sidebar {
  position: fixed;
  top: 0; right: 0; bottom: 0;
  width: 400px;
  background: #fff;
  z-index: 1000;
  box-shadow: -2px 0 8px rgba(0,0,0,0.1);
}
.sidebar-content {
  padding: 24px;
}
.sidebar-backdrop {
  position: fixed;
  top: 0; left: 0; right: 400px; bottom: 0;
  background: rgba(0,0,0,0.2);
  z-index: 999;
}
</style> 