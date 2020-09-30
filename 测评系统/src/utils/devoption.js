import {
    getstaffdept,
    getserverfee,
    getproductName,
} from '@/api/commons'
export function Getstaffdept(data) {
    return getstaffdept(data).then(res => {
        return res
    })
}
export function Getserverfee(data) {
    return getserverfee(data).then(res => {
        return res
    })
}
export function GetproductName(data) {
    return getproductName(data).then(res => {
        return res
    })
}
