import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const publicationRecordsEditIDKey = 'publicationRecordsEditIDKey'
const listingEditIDKey = 'listingEditIDKey'
const copyListingIDKey = 'copyListingIDKey'
const editCreateListingIDKey = 'editCreateListingIDKey'
const createListingIDKey = 'createListingIDKey'
const pendingIDKey = 'pendingIDKey'
    // export function getToken() {
    //   return Cookies.get(TokenKey)
    // }
export function getToken() {
    return sessionStorage.getItem('token')
}
export function setToken(token) {
    return sessionStorage.setItem('token', token)
}
export const setPublicationRecordsEditSku = (id) => sessionStorage.setItem(publicationRecordsEditIDKey, id)
export const getPublicationRecordsEditSku = () => sessionStorage.getItem(publicationRecordsEditIDKey)
export const setlistingEditSku = (id) => sessionStorage.setItem(listingEditIDKey, id)
export const getlistingEditSku = () => sessionStorage.getItem(listingEditIDKey)
export const setCopyListingSku = (id) => sessionStorage.setItem(copyListingIDKey, id)
export const getCopyListingSku = () => sessionStorage.getItem(copyListingIDKey)
export const setEditCreateListingSku = (id) => sessionStorage.setItem(editCreateListingIDKey, id)
export const getEditCreateListingSku = () => sessionStorage.getItem(editCreateListingIDKey)
export const setCreateListingSku = (id) => sessionStorage.setItem(createListingIDKey, id)
export const getCreateListingSku = () => sessionStorage.getItem(createListingIDKey)
export const setPendingEditSku = (id) => sessionStorage.setItem(pendingIDKey, id)
export const getPendingEditSku = () => sessionStorage.getItem(pendingIDKey)
    // export function removeToken() {
    //   return Cookies.remove(TokenKey)
    // }
export function removeToken() {
    return sessionStorage.clear();
}