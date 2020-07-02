import request from '@/utils/request'
import qs from 'qs'

//登录
export function getCode() {
    return request({
        url: '/api/authorizations/captchas',
        method: 'post',
    })
}

export function login(data) {
    return request({
        url: '/api/authorizations',
        method:'post',
        data
    })
}
//注册
export function register(data) {
    return request({
        url: '/api/users',
        method: 'post',
        data
    })
}

export function ficationCodes(data) {
    return request({
        url: '/api/verificationCodes',
        method: 'post',
        data
    })
}

//修改密码
export function verificationCodes(id) {
    return request({
        url: `/api/users/phones/${id}/verificationCodes`,
        method: 'post'
    })
}

export function passWord(data) {
    return request({
        url: `/api/password?${qs.stringify(data)}`,
        method:'put'
    })
}

export function verificationCode() {
    return request({
        url: '/api/users/me/password/verificationcodes',
        method: 'post'
    })
}

export function passPay(data) {
    return request({
        url: `/api/users/me/transferPassword?${qs.stringify(data)}`,
        method:'put'
    })
}


// 商品列表
export function getGoods() {
    return request({
        url: '/api/goods',
        method: 'get'
        
    })
}

export function orderer(data) { 
    return request({
        url: '/api/orders',
        method: 'post',
        data
    })
}

//查看订单
export function getOrder(id) {
    return request({
        url: `/api/orders?type=${id}`,
        method:'get'
    })
}

export function orders() {
    return request({
        url: '/api/orders/earnings',
        method:'get'
    })
}

export function allEarn() {
    return request({
        url: '/api/orders/earnings',
        method:'post'
    })
}

//交易大厅
export function tranCenter() { 
    return request({
        url: '/api/transations',
        method:'get'
    })
}

export function getTran() { 
    return request({
        url: '/api/transations/totals',
        method:'get'
    })
}

export function tranSation(data) { 
    return request({
        url: '/api/transations/orders',
        method: 'post',
        data
    })
}

export function myOrders(id) { 
    return request({
        url: `/api/transations/orders?page=${id}`,
        method:'get'
    })
}
export function payOrders(data) { 
    return request({
        url: '/api/transations/payorders',
        method: 'post',
        data
    })
}

export function myList(id) { 
    return request({
        url: `/api/transations/me/orders?page=${id}`,
        method:'get'
    })
}

export function canOrder(id) { 
    return request({
        url: `/api/transations/me/orders/${id}`,
        method:'delete'
    })
}

export function payOrder(id,data) { 
    return request({
        url: `/api/transations/me/orders/${id}/pay?thumb_url=${data}`,
        method:'put'
    })
}

export function finishOrder(id) { 
    return request({
        url: `/api/transations/me/orders/${id}/receipts`,
        method:'put'
    })
}

export function appealOrder(id, data) { 
    return request({
        url: `/api/transations/me/orders/${id}/appeal`,
        method: 'post',
        data
    })
}

//用户中心
export function logs(id) { 
    return request({
        url: `/api/revenueLosgs?page=${id}`,
        method:'get'
    })
}

export function myUser() {
    return request({
        url: '/api/users/me',
        method:'get'
    })
}

export function sing() { 
    return request({
        url: '/api/users/me/signLogs',
        method: 'post',
    })
}

export function server(data) { 
    return request({
        url: '/api/feedbacks',
        method: 'post',
        data
    })
}

export function guildInfo() { 
    return request({
        url: '/api/users/groups',
        method:'get'
    })
}

export function guildLevel(id) { 
    return request({
        url: `/api/users/groups/levels/${id}`,
        method:'get'
    })
}

export function posters() { 
    return request({
        url: '/api/posters/default',
        method:'get'
    })
}

export function paper() { 
    return request({
        url: '/api/whitePaper',
        method:'get'
    })
}

export function customer() { 
    return request({
        url: '/api/customers',
        method:'get'
    })
}

export function getCard() { 
    return request({
        url: '/api/rechargeCards',
        method:'get'
    })
}

export function cardOrder(data) { 
    return request({
        url: '/api/rechargeCards/orders',
        method: 'post',
        data
    })
}

export function getNews() { 
    return request({
        url: '/api/notices',
        method:'get'
    })
}

export function getRules() { 
    return request({
        url: '/api/registerRules',
        method:'get'
    })
}

export function userInfo(data) { 
    return request({
        url: `/api/users/me?${qs.stringify(data)}`,
        method:'put'
    })
}

//首页
export function scrollNoti() { 
    return request({
        url: '/api/scrollNotice',
        method:'get'
    })
}