<template>
    <div class="choosed-docs-container">
        <shadow-block v-for="(doc, idx) in docs" :key="`cdoc_${idx}`" class="doc-container">
            <div class="doc_block">
                <div class="doc_block-name">{{ doc.name }}</div>
                <BasketIcon @click="$emit('delete-item', idx)"/>
            </div>
        </shadow-block>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import ShadowBlock from '../blocks/ShadowBlock.vue'
import BasketIcon from '../icons/BasketIcon.vue'

export default defineComponent({
    name: 'ChoosedDocs',
    components:{
        ShadowBlock,
        BasketIcon
    },
    props:{
        docs: Array
    }
})
</script>

<style>
.doc-container{
    margin-bottom: 16px;
}
.doc-container:hover .basket-icon{
    fill: var(--primary-black);
}
.doc_block{
    display: flex;
    justify-content: space-between;
}
.doc_block-name{
    max-width: calc(100% - 32px);
}
.doc-container .basket-icon:hover{
    fill: var(--accent-danger)
}
</style>