<template>
    <ArrowIcon @click="back()" class="go-back_btn"/>
</template>

<script lang="ts">
import { state } from '@/store/state'
import {defineComponent} from 'vue'
import ArrowIcon from '../icons/ArrowIcon.vue'

export default defineComponent({
    name: 'GoBack',
    components: {ArrowIcon},
    methods:{
        back(){
            state.setRouteFromPath('/');
        }
    }
})
</script>

<style>
.go-back_btn{
    cursor: pointer;
}
</style>