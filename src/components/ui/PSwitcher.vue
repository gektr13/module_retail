<template>
    <div class="swither-block" :class="{checked: modelValue}" @click="$emit('update:modelValue', !modelValue)">
        <div class="switcher">
            <div class="switcher-round"></div>
        </div>
        <label>{{ label }}</label>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'PSwitcher',
  props: {
    modelValue: Boolean,
    label: String
  },
  emits: ['update:modelValue']
})
</script>

<style>
.swither-block{
    display: flex;
    align-items: center;
}
.switcher{
    width: 39px;
    height: 23px;
    background-color: var(--primary-dark);
    border-radius: 12px;
    position: relative;
    margin-right: 8px;
}
.switcher-round{
    background-color: #fff;
    border-radius: 50%;
    width: 19px;
    height: 19px;
    position: absolute;
    top: 2px;
    left: 2px;
    transition: left 0.5s;
}
.swither-block.checked  .switcher{
    background-color: var(--main-color);
}
.swither-block.checked .switcher-round{
    left: calc(50% - 1px);
}
.swither-block label{
    color: var(--primary-dark);
    transition: color 0.5s;
}
.swither-block.checked label{
    color: var(--primary-black);
}
</style>