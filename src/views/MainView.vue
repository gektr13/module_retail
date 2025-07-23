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

<style scoped>
.doc-list{
  display: flex;
  flex-direction: column;
  margin-top: 40px;
}
</style>