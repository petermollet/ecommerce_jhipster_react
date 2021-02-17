
import apiBackEnd from './api.Backend';
import { URL_AUTHENTICATE } from '../../shared/constants/urlBackEnd';

export function authenticated(values) {
    return apiBackEnd.post(URL_AUTHENTICATE, values)
}