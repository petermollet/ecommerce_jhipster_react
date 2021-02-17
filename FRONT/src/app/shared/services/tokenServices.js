
const TOKEN_NAME = 'token'

export function setToken(token) {
    localStorage.setItem(TOKEN_NAME, token)
}

export function getToken() {
    return localStorage.getItem(TOKEN_NAME)
}

export function removeToken() {
    localStorage.removeItem(TOKEN_NAME)
}