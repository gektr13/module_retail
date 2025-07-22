<template>
    <PSwitcher label="Отправить позже" v-model="checked" @click="switchSendLate()"/>
    <div class="send-late" v-if="form?.send_late && form.send_late > 0 && checked">{{date.toLocaleString()}}</div>
    <PopUp :modalOpen="modalOpen"
        @close="modalOpen = false"
    >
        <DatePicker v-model="date" 
            mode="dateTime" 
            is24hr 
        />
        <UiToolbarButton style="margin-top: 20px" :title="'Отправить позже'" @click="setSendLate()"/>
    </PopUp>
    <div class="agreement">
        <CheckBoxComp v-model="agreemntChecked" @update:model-value="$emit('update', agreemntChecked)"/>
        <div class="agreement-text" :class="{'agreement-checked': agreemntChecked, error: !valid}"
            @click="agreemntChecked = !agreemntChecked; $emit('update', agreemntChecked)"
        >Подтверждаю, что получено согласие на обработку и передачу персональных данных клиента</div>
    </div> 
</template>

<script lang="ts">
import CheckBoxComp from '@/components/ui/CheckBox.vue';
import PSwitcher from '@/components/ui/PSwitcher.vue';
import { DocForm } from '@/interfaces/interface';
import { defineComponent, PropType, ref } from 'vue'
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import PopUp from '@/components/general/PopUp.vue';
import UiToolbarButton from '@/components/retailcrm/UiToolbarButton.vue';

export default defineComponent({
    name: 'COptions',
    components: {
        PSwitcher, CheckBoxComp,
        DatePicker,
        PopUp,
        UiToolbarButton
    },
    props: {
        form: Object as PropType<DocForm>
    },
    setup(props){
        const checked = ref<boolean>(false)
        const modalOpen = ref<boolean>(false)
        const valid = ref<boolean>(true)
        const agreemntChecked = ref<boolean>(props.form?.agreement === 'Y')
        const date = ref<Date>(new Date())
        const validateEvent = (res: boolean) => {
            valid.value = res;
        }
        
        return {checked, agreemntChecked, date, modalOpen, valid, validateEvent}
    },
    methods:{
        setSendLate(){
            this.modalOpen = false;
            if(this.date)
                this.$emit('updateProp', {send_late: +this.date.getTime()/1000})
        },
        switchSendLate(){
            this.modalOpen = this.checked === true
            if(this.checked === false) this.$emit('updateProp', {send_late: 0})
        }
    }
})
</script>

<style>
.agreement{
    margin-top: 20px;
    display: flex;
}
.agreement-text{
    margin-left: 8px;
    max-width: calc(100% - 32px);
    font-size: 12px;
    color: var(--primary-dark);
    cursor: pointer;
}
.agreement-text.error{
    color: var(--accent-danger);
}
.agreement-text.agreement-checked{
    color: var(--primary-black);
}
</style>