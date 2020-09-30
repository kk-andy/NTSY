const baseURL = process.env.VUE_APP_AUTHORITY_API_DOMAIN
    // import request from '@/utils/request'
import auth from '@/utils/http'
export const getMenus = (query) => {
    return auth({
        url: '/rest/auth/user/perms',
        method: 'get',
        params: query,
        baseURL
    })
}

