<template>
  <div v-if="visible" class="ui-modal-window">
    <div class="window-content">
      <slot />
    </div>
    <div class="window-backdrop" @click="$emit('close')"></div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ visible: boolean }>()
</script>
<style scoped>
.ui-modal-window {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  z-index: 1000;
  min-width: 500px;
  min-height: 300px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.2);
  border-radius: 8px;
}
.window-content {
  padding: 32px;
}
.window-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.2);
  z-index: 999;
}
</style> 