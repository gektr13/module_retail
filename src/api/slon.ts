import { FilterDocs } from '@/interfaces/interface';
import { Keyable } from '@/interfaces/keyable';
import { state } from '../store/state'
import { PropType } from 'vue';
import { CompanyInfo } from '@/interfaces/company';
export default {
    sendRequest(url: string, method = 'GET', data: Keyable | FormData | null = null) {
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('X-API-KEY', state.apiKeyPodpislon ?? '');

        const params = <Keyable>{
            method,
            headers: requestHeaders,
        }
        if (data) {
            params.body = data instanceof FormData ? data : new URLSearchParams(data)
        }
        return fetch(`https://podpislon.ru/integration/${url}`, params)
            .then(res => {
                if (!res.ok && res.status === 401) {
                    alert('Не корректный api-ключ')
                    throw new Error('Не корректный api-ключ');
                }

                return res.json()
            })
    },
    getInfo(): Promise<{ status: boolean, signings: string, company: CompanyInfo }> {
        return this.sendRequest('get-info')
    },
    getDocs(filter: Keyable) {
        const fd = new FormData;
        for (const key in filter) {
            fd.append(`filter[${key}]`, filter[key])
        }
        return this.sendRequest('', 'POST', fd);
    },
    addDocument(body: FormData) {
        return this.sendRequest('add-document', 'PUT', body);
    },
    loadFile(body: FormData){
        return this.sendRequest('get-file', 'POST', body);
    }
}