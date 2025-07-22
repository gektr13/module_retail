<template>
  <div class="mb40">
    <GoBack />
  </div>
  <section class="mb40">
    <company-block :company="company" />
  </section>
  <section class="mb40">
    <h2>{{$t('add_documents')}}</h2>
    <CStep1 v-model="DocForm_.files" />
    <CSignatore v-if="DocForm_.files?.length" v-model="DocForm_.contact" />
    <COptions
      v-if="DocForm_.files?.length"
      :form="DocForm_"
      @update="setAgreement($event)"
      @updateProp="updateForm($event)"
      ref="OptionsComponent"
    />
  </section>
  <section v-if="DocForm_.files?.length">
    <UiToolbarButton :title="$t('sign_and_send')" @click="send()" />
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useI18n } from 'vue-i18n';
import type { DocForm, SItem } from "@/interfaces/interface";
import CStep1 from "@/components/blocks/wizard/CStep1.vue";
import CSignatore from "@/components/blocks/wizard/CSignatore.vue";
import COptions from "@/components/blocks/wizard/COptions.vue";
import { state } from "@/store/state";
import UiToolbarButton from "@/components/retailcrm/UiToolbarButton.vue";
import GoBack from "@/components/general/GoBack.vue";
import CompanyBlock from "@/components/blocks/CompanyBlock.vue";
import slon from "@/api/slon";
import api from "@/api/api";

type ParameterName = keyof DocForm;

export default defineComponent({
  name: "WizardView",
  components: {
    GoBack,
    CStep1,
    CSignatore,
    COptions,
    UiToolbarButton,
    CompanyBlock,
  },
  setup() {
    const company = ref<SItem>();
    const selectedId = ref<number>(0);
    const OptionsComponent = ref<typeof COptions>();

    onMounted(() => {
      if (state.client) DocForm_.contact = state.client;
      if (state.companyInfo) company.value = state.companyInfo;
    });

    const DocForm_: DocForm = reactive({
      files: [],
      contact: {
        name: "",
        last_name: "",
        second_name: "",
        phone: "",
      },
      agreement: "N",
      send_late: 0,
    });

    return { company, selectedId, DocForm_, OptionsComponent };
  },
  methods: {
    t() { return useI18n().t },
    setAgreement(val: string) {
      this.DocForm_.agreement = val ? "Y" : "N";
    },
    updateForm(data: DocForm) {
      console.log(data);
      let prop: ParameterName;
      for (prop in data) {
        if (!data[prop]) continue;
        if (prop === "send_late") {
          this.DocForm_.send_late = data[prop];
        }
      }
    },
    validate(): boolean {
      let res = true;
      if (
        !this.DocForm_.contact.name.length ||
        !this.DocForm_.contact.last_name.length ||
        !this.DocForm_.contact.phone.length ||
        this.DocForm_.agreement !== "Y"
      ) {
        res = false;
        if (this.DocForm_.agreement !== "Y") {
          this.OptionsComponent?.validateEvent(false);
        }
      }

      return res;
    },
    async send() {
      if (!this.validate()) return;

      const data = new FormData();

      data.append("name", this.DocForm_.contact.name);
      data.append("last_name", this.DocForm_.contact.last_name);
      data.append("second_name", this.DocForm_.contact.second_name ?? "");
      data.append("phone", this.DocForm_.contact.phone);
      data.append("agreement", this.DocForm_.agreement);

      if (this.DocForm_.files?.length) {
        for (const file of this.DocForm_.files) {
          if (file instanceof Blob) data.append("file[]", file);
          else {
            if(!file.full_link) continue;
            const fileData = await api.getDocByURLFetch(
              file.full_link,
              file.name
            );

            data.append("file[]", fileData.file);
            data.append("fileName[]", file.name);
          }
        }
      }
      const res = await slon.addDocument(data);
      if (res.status) {
        state.setRouteFromPath("/");
      } else {
        alert(this.t()('doc_not_sent'));
      }
    },
  },
});
</script>

<style scoped>
.mb40 {
  margin-bottom: 40px;
}
h2 {
  margin-bottom: 20px;
}
</style>