// import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}

export function getCookie(Key) {
  return sessionStorage.getItem(Key)
}

export function setCookie(Key, value) {
  return sessionStorage.setItem(Key, value)
}
export function removeCookie(Key) {
  return sessionStorage.removeItem(Key)
}
export function clearCookie(Key) {
  return sessionStorage.clear()
}
