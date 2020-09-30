<template>
  <span>总共{{ total }}条记录 第{{ totalPages }}页</span>
</template>
<script>
export default {
    name: 'PageTotal',
    props: {
        total: {
            type: Number,
            default: 0
        },
        size: {
            type: Number,
            default: 10
        },
        currentPage: {
            type: Number,
            default: 1
        }
    },
    computed: {
        totalPages() {
            const pages = Math.ceil(this.total / this.size)
            return `${this.currentPage}/${pages}`
        }
    }
}
</script>
