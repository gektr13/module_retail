import { Signatory } from "./interface";

export interface SDocument {
    id: number,
    name: string,
    contact: Signatory,
    date?: string,
    date_create?: string,
    status: number,
    status_text: string
}