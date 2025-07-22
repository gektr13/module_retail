<template>
    <ShadowBlock>
        <div class="doc" v-for="(doc, idx) in docs" :key="`cdoc_${doc.id}`" @click="toogle(idx)">
            <CheckBoxComp v-model="doc.checked"/>
            <div class="doc-title">{{ doc.name }}</div>
        </div>
        <div class="btns">
            <UiToolbarButton title="Сохранить" @click="$emit('save')"/>
            <UiToolbarButton title="Отмена" @click="$emit('resume')"/>
        </div>
    </ShadowBlock>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import ShadowBlock from '../blocks/ShadowBlock.vue';
import CheckBox from '../ui/CheckBox.vue';
import type { ClientDoc } from '@/interfaces/interface';
import UiToolbarButton from '../retailcrm/UiToolbarButton.vue';

export default defineComponent({
    name: 'DocsList',
    components: {
        ShadowBlock,
        CheckBoxComp: CheckBox,
        UiToolbarButton
    },
    props:{
        docs: Array as PropType<Array<ClientDoc>>
    },
    emits:['checkDoc'],
    methods:{
        toogle(idx: number){
            this.$emit('checkDoc', idx)
        }
    }
})
</script>

<style>
.doc{
    display: flex;
    cursor: pointer;
    margin-bottom: 16px;
}
</style>

<style scoped>
.btns{
    display: flex;
    justify-content: space-between;
}
.btns .btn{
    width: 144px;
}
</style>