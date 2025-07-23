<template>
  <div>
    <!-- Кнопка в тулбаре -->
    <UiToolbarButton :title="$t('sign_document')" @click="openSidebar" />
    <!-- Сайдбар с дополнительным контентом -->
    <UiModalSidebar :visible="sidebarVisible" @close="sidebarVisible = false">
      <div style="padding: 16px;">
        <h2>{{$t('sidebar_title')}}</h2>
        <p>{{$t('sidebar_content')}}</p>
        <UiImage src="https://via.placeholder.com/150" resize="100x100" />
      </div>
    </UiModalSidebar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import UiToolbarButton from '@/components/retailcrm/UiToolbarButton.vue'
import UiModalSidebar from '@/components/retailcrm/UiModalSidebar.vue'
import UiImage from '@/components/retailcrm/UiImage.vue'

const { t } = useI18n()
const sidebarVisible = ref(false)
function openSidebar() {
  sidebarVisible.value = true
}
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
