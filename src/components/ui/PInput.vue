<template>
    <div class="cinput-container" 
        :class="{active: modelValue || focused, error: !status}" 
        @click="tInput?.focus()">
        <div class="cinput-title">{{ placeholder }}</div>   
        <input class="input" ref="tInput" 
            @focus="focused=true" 
            @blur="focused=false"
            type="text" @input="updateVal($event)"
            :value="modelValue"
            :required="required"
            >
    </div>
    <div class="hint" :class="{error: !status}" v-if="hint?.length && !status">{{ hint }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
name: 'PButton',
props: {
    modelValue: String,
    placeholder: String,
    required: Boolean,
    hint: String,
    status: Boolean
},
emits:['update:modelValue'],
setup(){
    const tInput = ref<HTMLElement>();
    const focused = ref<boolean>(false);

    return {tInput,focused}
},
methods:{
    updateVal(e: InputEvent){
        if(e.target instanceof HTMLInputElement)
            this.$emit('update:modelValue', e.target.value)
    }
}
});
</script>

<style scoped>
.cinput-container{
    border-radius: 4px;
    border: 1px solid var(--lines-color);
    padding: 15px;
    position: relative;
    cursor: text;
    height: 50px;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 16px;
}
.cinput-container.active{
  padding-top: 7px;
}
.cinput-container.error{
    border-color: var(--accent-danger);
    background-color: #FEDFE0;
}
.cinput-title{
  color: var(--primary-dark);
  font-size: 14px;
  transition: font-size 0.5s;
}
.cinput-container.active .cinput-title{
  font-size: 11px;
}
.input{
    border: none;
    outline: none;
    width: 100%;
    background-color: transparent;
}
.hint{
    color: var(--accent-danger);
    font-size: 11px;
    padding-left: 16px;
    margin-top: -14px;
}
</style>