<template>
  <button class="btn" :class="`btn-${type}`">{{ title }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PButton',
  props: {
    title: String,
    type: String
  },
});
</script>

<style scoped>
    .btn{
        padding: 11px;
        background-color: var(--main-color);
        border: none;
        border-radius: 4px;
        color: #fff;
        width: 100%;
        cursor: pointer;
    }
    .btn:hover{
        background-color: var(--main-accent);
    }
    .btn.btn-grey{
      background-color: var(--primary-dark);
    }
</style>