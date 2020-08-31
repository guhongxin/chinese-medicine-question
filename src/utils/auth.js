import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getCookie(Key) {
  return Cookies.get(Key)
}

export function setCookie(Key, value) {
  return Cookies.set(Key, value)
}
export function removeCookie(Key) {
  return Cookies.remove(Key)
}
