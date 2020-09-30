<template>
    <ul v-if="list.length">
        <li v-for="(item, index) in list" :key="index" @click="clickLi(item.value)">{{item.value}}</li>
    </ul>
</template>
<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        clickLi(value) {
            this.$emit('selectProduct', value)
        }
    }
}
</script>
<style lang="scss" scoped>
    ul {
        width: 320px;
        // position: absolute;
        left: 0;
        right: 0;
        display: block;
        max-height: 350px;
        border: 1px solid #ccc;
        top: 36px;
        left: 0px;
        overflow-y: scroll;
        overflow-x: hidden;
        li {
            width: 100%;
            padding: 3px 1em 3px .4em;
            cursor: pointer;
            min-height: 0;
            color: rgb(34, 34, 34);
        }
        li:hover {
            background: #dadada;
            border: 1px solid #999;
            font-weight: normal;
        }
    }
</style>