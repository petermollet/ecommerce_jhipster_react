import apiBackEnd from './api.Backend';
import { URL_GEL_ALL_PRODUCT } from '../../shared/constants/urlBackEnd';

export function getAllProduct() {
    return apiBackEnd.get(URL_GEL_ALL_PRODUCT)
}