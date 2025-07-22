<template>
    <div class="checkbox" :class="{checked: modelValue}" @click="toogle()">
        <CheckedIcon />
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import CheckedIcon from '../icons/CheckedIcon.vue';
  
export default defineComponent({
    name: 'CheckBox',
    components:{CheckedIcon},
    props: {
      modelValue: Boolean,
    },
    emits: ['update:modelValue'],
    methods:{
        toogle(){
            this.$emit('update:modelValue', !this.modelValue)
        }
    }
});
</script>
  
<style scoped>
    .checkbox{
        border: 1px var(--primary-dark) solid;
        border-radius: 6px;
        height: 20px;
        width: 20px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .checkbox.checked{
        border-color: var(--main-color);
        background-color: var(--main-color);
    }
</style>