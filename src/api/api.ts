import { ClientDoc } from "@/interfaces/interface";
import { state } from "@/store/state";

const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://gektr1309.retailcrm.ru/api/v5'; // Прокси для обхода CORS

async function fetchRetailCrm(endpoint: string, params: Record<string, any> = {}) {
  const url = new URL(BASE_URL + endpoint);
  url.searchParams.set('apiKey', state.apiKey || '');
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('RetailCRM API error: ' + res.status);
  return res.json();
}

export default {
  // Получить клиента по ID
  async getClientById(clientId: string) {
    if (!state.apiKey) throw new Error('API-ключ RetailCRM не задан');
    const data = await fetchRetailCrm(`/customers/${clientId}`);
    // Преобразуем ответ к нужному виду
    const c = data.customer;
    return {
      id: c.id,
      name: c.firstName || '',
      last_name: c.lastName || '',
      second_name: c.patronymic || '',
      phone: (c.phones && c.phones[0]?.number) || ''
    };
  },
  // Получить текущего клиента (заглушка: возвращает первого клиента)
  async getCurrentClient() {
    if (!state.apiKey) throw new Error('API-ключ RetailCRM не задан');
    const data = await fetchRetailCrm('/customers', {limit: 20}); // исправлено на 20
    if (data.customers && data.customers.length > 0) {
      const c = data.customers[0];
      return {
        id: c.id,
        name: c.firstName || '',
        last_name: c.lastName || '',
        second_name: c.patronymic || '',
        phone: (c.phones && c.phones[0]?.number) || ''
      };
    }
    return {id: 0, name: '', last_name: '', second_name: '', phone: ''};
  },
  // Получить список документов клиента (через заказы)
  async getClientFiles(clientId: string) {
    if (!state.apiKey) throw new Error('API-ключ RetailCRM не задан');
    // Получаем заказы клиента
    const ordersData = await fetchRetailCrm('/orders', { customer: clientId, limit: 100 }); // исправлено на 100
    const docs: any[] = [];
    if (ordersData.orders) {
      for (const order of ordersData.orders) {
        // Вложения могут быть в order.files или order.attachments (зависит от версии RetailCRM)
        const files = order.files || order.attachments || [];
        for (const file of files) {
          docs.push({
            id: file.id || file.fileId || file.name, // универсально
            name: file.filename || file.name,
            full_link: file.url || file.downloadUrl || file.link
          });
        }
      }
    }
    return { status: true, files: { data: docs } };
  },
  async getKey() {
    // TODO: реализовать хранение/получение ключа RetailCRM
    return state.apiKey || '';
  },
  async getIsKeyAdded() {
    return !!state.apiKey;
  },
  async saveApiKey(apiKey: string) {
    state.apiKey = apiKey;
    return true;
  },
  async getDocByURLFetch(url: string, fileName: string) {
    // Заглушка: возвращаем ссылку как "file"
    if (!url) throw new Error('Пустой URL');
    return { status: true, file: url };
  }
};