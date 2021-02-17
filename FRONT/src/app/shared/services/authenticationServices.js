
import { setToken, removeToken, getToken } from './tokenServices';

export function signIn(token, setIsLogged) {
    setToken(token)
    setIsLogged(true)
}

export function signOut(setIsLogged) {
    removeToken()
    setIsLogged(false)
}

/**
 * TODO: Not complete, need to checked if token is valid (using middleware ?)
 */
export function isAuthenticated() {
    const token = getToken()
    return token !== null && token !== undefined && token!== ''
}