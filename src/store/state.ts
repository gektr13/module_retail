import { CompanyInfo } from '@/interfaces/company';
import { Signatory } from '@/interfaces/interface';
import { Keyable } from '@/interfaces/keyable';
import { reactive } from 'vue'

export const state = reactive({
  route: <string>'MainView',
  setRouteFromPath(path: string){
    if(path === '/' 
      || path === '/widget'
    ) path = '/main';
    path = path.slice(1);
    path = path[0].toUpperCase() + path.slice(1);
    this.route = path + 'View';
  },
  setClient(data: Keyable){
    this.client = {
      name: data.firstname,
      last_name: data.surname,
      second_name: data.patronymic,
      phone: data.phone,
      id: data.id
    }
  },
  salon_id: <number>0,
  apiKey: 'hAMniUsAWyd7FC2XKRzZD1kWXKREGCAs', // API-ключ RetailCRM
  apiKeyPodpislon: 'Tvr_1WROkKNJOKzbmphfq03h2qeSwxeVSPgJfsBfkzhuWsME10580', // API-ключ Podpislon
  companyInfo: <CompanyInfo|null> null,
  client: <Signatory|null>null,
  hash: <string> '',
  order: null,
  settings: null,
})