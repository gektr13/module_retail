<template>
  <UiToolbarButton :title="$t('show_field')" @click="sidebar = true" />
  <UiModalSidebar :visible="sidebar" @close="sidebar = false">
    <div style="padding: 16px;">
      <h2>{{ $t('custom_field_title') }}</h2>
      <p>{{ $t('custom_field_content') }}</p>
    </div>
  </UiModalSidebar>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import UiToolbarButton from '@/components/retailcrm/UiToolbarButton.vue'
import UiModalSidebar from '@/components/retailcrm/UiModalSidebar.vue'

const { t } = useI18n()
const sidebar = ref(false)
</script>

<style>
:root {
  --main-color: #ffa800;
  --main-accent: #ffcb00;
  --lines-color: #e0e3eb;
  --primary-dark: #71757f;
  --primary-black: #2b3134;
  --accent-positive: #29c235;
  --accent-danger: #f72c32;
}
* {
  padding: 0;
  margin: 0;
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  color: var(--primary-black);
}
h2 {
  font-weight: 500;
  font-size: 20px;
  text-align: center;
}
#app {
  padding: 40px 20px;
  max-width: 375px;
  font-size: 14px;
  margin: 0 auto;
}
.mb16 {
  margin-bottom: 16px;
}
.doc-title,
.title {
  margin-left: 12px;
}
</style>
