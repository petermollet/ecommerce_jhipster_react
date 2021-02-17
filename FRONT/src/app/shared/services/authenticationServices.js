
import { setToken, removeToken } from './tokenServices';

export function signIn(token) {
    setToken(token)
}

export function signOut() {
    removeToken()
}