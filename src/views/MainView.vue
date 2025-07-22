<template>
    <UiToolbarButton :title="$t('sign_document')" @click="openWiz()"/>
    <div class="doc-list">
      <doc-preview-component v-if="hasPhone && loadRes"/>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import UiToolbarButton from '../components/retailcrm/UiToolbarButton.vue';
import { state } from '@/store/state';
import DocPreviewComponent from '@/components/blocks/DocPreviewComponent.vue';

export default defineComponent({
  name: 'MainView',
  components: {UiToolbarButton, DocPreviewComponent},
  setup(){
    const { t } = useI18n();
    const loadRes = ref<boolean>(false)
    onMounted(async () => {
      try {
        loadRes.value = await LoadAwaitFinc();
        if(!loadRes.value){
          alert(t('add_api_key_alert'));
          // window.location.href = '/settings'; // если нужен переход
          return;
        }
      } catch (e: any) {
        alert(e.message || t('init_error'));
        // window.location.href = '/settings'; // если нужен переход
      }
    })

    const LoadAwaitFinc = (): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        let i = 0;
        const interval = setInterval(()=>{
          if(state.apiKey?.length){
            clearInterval(interval)
            resolve(true)
            return;
          } else if(i > 9){
            clearInterval(interval)
            reject(new Error('API-ключ не добавлен')) // Можно добавить локализацию, если нужно
          }
          i++;
        }, 500)
      })
    }

    const hasPhone = computed(()=> !!state.client?.phone)

    return {hasPhone, loadRes}
  },
  methods:{
    openWiz(){
        state.route = 'WizardView'
    },
  }
});
</script>

<style scoped>
.doc-list{
  display: flex;
  flex-direction: column;
  margin-top: 40px;
}
</style>