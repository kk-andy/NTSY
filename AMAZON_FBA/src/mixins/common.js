/* 全局混入搜索 重置  翻页方法 */
import { clearObjValue } from '@/utils/common.js'
import SearchBtnGroup from '@/components/searchButtonGroup'
import ChangePage from '@/components/page'
export const mixin = {
    components: {
        SearchBtnGroup,
        ChangePage
    },
    data() {
        return {
            page: {
                size: 20,
                currentPage: 1
            },
            logPage: {
                size: 20,
                currentPage: 1
            },
        }
    },
    methods: {
        /* 查询 */
        doFilter() {
            this.page.currentPage = 1
            console.log(this.search.warehouse)
            this.getData()
        },
        /* 重置 */
        doReset() {
            clearObjValue(this.search)
        },
        /* 翻页 */
        handleCurrentChange(page) {
            this.page.currentPage = page
            this.getData()
        },
        /* 改变size */
        handleSizeChange(size) {
            this.page.size = size
            this.page.currentPage = 1
            this.getData()
        },
    }
}