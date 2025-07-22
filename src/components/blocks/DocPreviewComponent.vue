<template>
    <div>
        <doc-preview v-for="doc in docs.docs" :key="`doc_${doc.id}`" :doc="doc"/>
    </div>
</template>

<script lang="ts">
import slon from '@/api/slon'
import { state } from '@/store/state';
import {defineComponent, onMounted, reactive} from 'vue'
import DocPreview from './DocPreview.vue';
import { SDocument } from '@/interfaces/document';
import api from '@/api/api';

export default defineComponent({
    name: 'DocPreviewComponent',
    components:{
        DocPreview
    },
    setup(){
        const docs = reactive<{docs: SDocument[]}>({docs: []});
        onMounted(async()=>{
            if (state.client?.id) {
                const filesReq = await api.getClientFiles(String(state.client.id));
                if (filesReq.status) {
                    docs.docs = filesReq.files.data;
                }
            }
        })
        return {docs};
    }
})
</script>