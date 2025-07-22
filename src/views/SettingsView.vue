<template>
  <h2>{{$t('settings')}}</h2>
  <div v-if="errorMsg" style="color: red; margin-bottom: 16px;">{{ errorMsg }}</div>
  <section v-if="company?.name">
    <CompanyBlock :company="company" />
    <p class="sign-text">
      {{$t('remaining_signings')}} <span class="sign-count">{{ signings }}</span>
    </p>
  </section>
  <section v-if="isKeyAdded">
    <div class="success-block">
      {{$t('api_key_added')}}
    </div>
  </section>
  <section>
    <div class="btns">
      <PInput :placeholder="$t('api_key_placeholder')" v-model="apiKey" :status="true" />
    </div>
    <UiToolbarButton :title="$t('save')" @click="save()" />
  </section>
  <section class="no_profile">
    {{$t('module_instruction')}}
  </section>
</template>

<script lang="ts">
import PInput from "@/components/ui/PInput.vue";
import UiToolbarButton from "@/components/retailcrm/UiToolbarButton.vue";
import { defineComponent, onMounted, ref } from "vue";
import api from "../api/api";
import { state } from "@/store/state";
import CompanyBlock from "@/components/blocks/CompanyBlock.vue";
import { CompanyInfo } from "@/interfaces/company";

export default defineComponent({
  components: { PInput, UiToolbarButton, CompanyBlock },
  setup() {
    const apiKey = ref<string>("");
    const company = ref<CompanyInfo>();
    const signings = ref<number | string>(),
      isKeyAdded = ref<boolean>(false);
    const errorMsg = ref("");
    onMounted(async () => {
      isKeyAdded.value = await api.getIsKeyAdded();
      apiKey.value = await api.getKey();
    });
    return {
      apiKey,
      company,
      signings,
      isKeyAdded,
      errorMsg
    };
  },
  methods: {
    async save() {
      if (!this.apiKey.length) return;
      this.errorMsg = "";
      try {
        state.apiKey = this.apiKey;
        // Пробуем получить клиента для проверки ключа
        await api.getCurrentClient();
        const saveRes = await api.saveApiKey(state.apiKey);
        if (saveRes) {
          this.isKeyAdded = true;
        }
      } catch (e) {
        this.errorMsg = "Ошибка: не удалось проверить API-ключ RetailCRM. Проверьте правильность ключа." // Можно добавить локализацию, если нужно
      }
    },
    // getData можно удалить или реализовать позже для RetailCRM
  },
});
</script>
<style>
p {
  margin-bottom: 16px;
}
.sign-text {
  font-size: 12px;
  color: var(--primary-dark);
}
.sign-count{
    color: var(--primary-black);
    font-size: 14px;
    font-weight: 500;
}
.no_profile{
    margin-top: 16px;
}
.no_profile a{
    color: var(--main-color);
}
.success-block {
    margin-bottom: 16px;
    color: #4CAF50;
    border: 1px solid #4CAF50;
    border-radius: 4px;
    padding: 10px;
    background-color: #f4fff5;
}
</style>