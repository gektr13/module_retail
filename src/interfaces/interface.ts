import { Keyable } from "./keyable";

export interface SItem  {
    id: number,
    title: string
}

export interface ClientDoc {
    id: number,
    name: string,
    checked?: boolean,
    full_link?: string
}

export interface Signatory {
    name: string,
    last_name: string,
    second_name: string,
    phone: string,
    id?: number
}

export interface DocForm {
    contact: Signatory,
    files?: Array<File|ClientDoc|Blob>,
    send_late?: number,
    agreement: string
}

export interface FilterDocs extends Object {
    fio?: string,
    status?: number,
    phone?: string,
    dates?: {'>=': number, '<=': number} 
}