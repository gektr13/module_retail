import { Keyable } from "./keyable";

export interface CompanyInfo extends Keyable {
    id: number,
    title: string,
    sign_left?: number
}