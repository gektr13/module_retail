<template>
  <shadow-block class="mb16 sb-doc_preview">
    <div class="doc_preview-container">
      <div class="doc-title">{{ doc?.name }}</div>
      <div class="download-btn" @click="download()"><DownloadIcon /></div>
      <div class="contact">{{ doc?.contact.name }}</div>
      <div class="status" :class="status_class">{{ doc?.status_text }}</div>
      <div class="date">{{ doc?.date_create }}</div>
    </div>
  </shadow-block>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import ShadowBlock from "./ShadowBlock.vue";
import { SDocument } from "@/interfaces/document";
import DownloadIcon from "../icons/DownloadIcon.vue";
import slon from "@/api/slon";

export default defineComponent({
  name: "DocPreview",
  components: { ShadowBlock, DownloadIcon },
  props: {
    doc: { type: Object as PropType<SDocument> },
  },
  setup(props) {
    const status_class = ref<string>("");

    if (props.doc) {
      if (+props.doc?.status === 30) {
        status_class.value = "success";
      } else if (+props.doc?.status === 40) {
        status_class.value = "cancelled";
      }
    }

    return {
      status_class,
    };
  },
  methods:{
    async download(){
      const data = new FormData();
      data.append('id', ''+this.doc?.id);
      const res = await slon.loadFile(data);

      if(!res.status){ 
        alert('Ошибка при загрузке файла');
        return;  
      }
      
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${res.result}`;
      if(this.doc?.name)
        link.setAttribute('download', this.doc?.name + (this.doc?.name.search(/\.pdf$/)>0?'':'.pdf'));
      link.click();
    }
  }
});
</script>

<style>
.doc_preview-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  cursor: pointer;
}
.sb-doc_preview {
  border: 1px solid transparent;
}
.sb-doc_preview:hover {
  border-color: #e0e3eb;
}
.sb-doc_preview:hover .download-btn svg path {
  fill: black !important;
}
.doc_preview-container .doc-title {
  margin-left: 0;
  margin-bottom: 8px;
  font-size: 12px;
  max-width: calc(100% - 20px);
}
.contact {
  width: 100%;
  font-weight: 500;
  font-size: 12px;
  margin-bottom: 8px;
}
.date {
  color: var(--primary-dark);
  font-size: 11px;
  font-weight: 500;
}
.status {
  padding: 3px 13px;
  border-radius: 12px;
  background-color: var(--main-accent);
  color: #fff;
  font-size: 11px;
}
.status.success {
  background-color: var(--accent-positive);
}
.status.cancelled {
  background-color: var(--accent-danger);
}
</style>