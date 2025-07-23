<template>
  <div style="background: #ffe066; padding: 16px; font-size: 18px;">
    Подпислон: тестовый модуль для RetailCRM
    <button @click="someAction">Подписать документ</button>
  </div>
  <component :is="_state.route" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import MainView from "./views/MainView.vue";
import WizardView from "./views/WizardView.vue";
import { state } from "./store/state";
import SettingsView from "./views/SettingsView.vue";
import api from "./api/api";
import slon from "./api/slon";
// Интеграция с RetailCRM
import { useOrderCardContext, useSettingsContext } from '@retailcrm/embed-ui';

export default defineComponent({
  name: "App",
  components: {
    MainView,
    WizardView,
    SettingsView,
  },
  setup() {
    const _state = state;
    const errorMsg = ref("");
    // Получаем контекст заказа и настроек из RetailCRM, если приложение встроено
    let orderContext: any = null;
    let settingsContext: any = null;
    try {
      orderContext = useOrderCardContext?.();
      settingsContext = useSettingsContext?.();
      if (orderContext) {
        _state.order = orderContext.order;
      }
      if (settingsContext) {
        _state.settings = settingsContext.settings;
      }
    } catch (e) {
      // Не встраиваемся в RetailCRM или ошибка получения контекста
    }
    // Удалена логика YCLIENTS (salon_id, hash, postMessage)
    // TODO: добавить инициализацию через RetailCRM (например, получение текущего клиента)

    onMounted(async () => {
      try {
        const client = await api.getCurrentClient();
        if (client && client.id) {
          _state.client = client;
        } else {
          errorMsg.value = "Клиенты не найдены или не удалось получить данные. Проверьте настройки API-ключа.";
        }
      } catch (e: any) {
        errorMsg.value =
          "Ошибка при получении клиента: " + (e?.message || e);
      }
    });

    return {
      _state,
      errorMsg
    };
  },
});
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
