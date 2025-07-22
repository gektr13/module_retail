<template>
    <section class="btns-block">
        <ShadowBlock class="clickable" :class="{checked:docsFrom === 'comp'}" @click="toogComp()"><CompFileIcon /> С компютера</ShadowBlock>
        <ShadowBlock class="clickable" :class="{checked:docsFrom === 'client'}" @click="docsFrom = 'client';clearFiles()"><PeopleIcon /> Из клиента</ShadowBlock>
    </section>
    <input
        style="display: none;"
        type="file" 
        multiple 
        @change="getfiles($event)" 
        accept="application/pdf"
        ref="finput"
    >
    <section class="docs" v-if="docsFrom === 'client' && !files.value.length">
        <DocsList :docs="clientDocs.value" @checkDoc="checkDocF($event)"
            @resume="docsFrom = ''"
            @save="getClientFiles()"
        />
    </section>
    <ChoosedDocs v-if="files.value.length" :docs="files.value"
        @delete-item="deleteFile($event)"
    />

</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref } from 'vue'
import ShadowBlock from '../ShadowBlock.vue';
import CompFileIcon from '@/components/icons/CompFileIcon.vue';
import PeopleIcon from '@/components/icons/PeopleIcon.vue';
import type { ClientDoc } from '@/interfaces/interface';
import DocsList from '@/components/general/DocsList.vue';
import ChoosedDocs from '@/components/general/ChoosedDocs.vue';
import api from '@/api/api';
import { state } from '@/store/state';

export default defineComponent({
    name: 'CStep1',
    components: {
        ShadowBlock,
        CompFileIcon,
        PeopleIcon,
        DocsList,
        ChoosedDocs
    },
    props:[
        'modelValue'
    ],
    emits:['update:modelValue'],
    setup() {
        const clientDocs: {value:ClientDoc[]} = reactive({value:[{id:1, name: 'договор 1'}, {id:2, name: 'договор 2'}]})
        const docsFrom = ref('')
        const files: {value:File[]|ClientDoc[]} = reactive({value: []})
        const finput = ref<HTMLElement>()

        onMounted(async ()=>{
            if (state.client?.id) {
                const filesReq = await api.getClientFiles(String(state.client.id));
                if(!filesReq.status) {
                    alert('Ошибка при загрузке файлов'); 
                }
                clientDocs.value = filesReq.files.data;
            }
        })

        return {
            clientDocs,
            docsFrom,
            files,
            finput
        }
    },
    methods:{
        checkDocF(idx: number){
            this.clientDocs.value[idx].checked = !this.clientDocs.value[idx].checked
        },
        toogComp(){
            this.clearFiles();
            this.docsFrom = 'comp'
            if(this.finput)
                this.finput.click();
        },
        getfiles(e: Event){
            if(e.target instanceof HTMLInputElement && e.target.files){
                this.files.value = Array.from(e.target.files);
                this.setFilesVal()
            }
        },
        getClientFiles(){
            this.files.value = this.clientDocs.value.filter(doc => doc.checked)
            this.setFilesVal()
        },
        setFilesVal(){
            this.$emit('update:modelValue', this.files.value)
        },
        deleteFile(e: number){
            this.files.value.splice(e, 1)
        },
        clearFiles(){
            this.files.value = []
        }
    }
})
</script>
<style>
.btns-block{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}
.btns-block > div{
    width: 40%;
    text-align: center;
    display: flex;
    align-items: center;
}
.clickable{
    cursor: pointer;
    border: 1px transparent solid;
}
.clickable:hover, .clickable.checked{
    border: 1px var(--main-color) solid;
    color: var(--main-color);
}
.clickable:hover svg, .clickable.checked svg{
    fill: var(--main-color)
}
.clickable svg{
    margin-right: 12px;
    fill: var(--primary-dark)
}</style>