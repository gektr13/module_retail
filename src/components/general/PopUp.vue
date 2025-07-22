<template>
  <UiModalWindow :visible="modalOpen" @close="$emit('close')">
    <slot></slot>
  </UiModalWindow>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import UiModalWindow from '../retailcrm/UiModalWindow.vue'

export default defineComponent({
    name: 'PopUp',
    components: { UiModalWindow },
    props: {
        modalOpen: {
            require: true,
            type: Boolean,
        }
    }
})
</script>

<style scoped>
.modal-container{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
}
.modal{
    padding: 15px;
    background-color: #fff;
    border-radius: 6px;
    margin: 0 auto;
    width: fit-content;
    top: 50%;
    position: relative;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
}
.close-btn{
    position: absolute;
    top: 20px;
    left: 0;
    transform: translateX(-100%);
    padding: 8px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    background-color: #a7a7a7;
    border: none;
    cursor: pointer;
}
</style>