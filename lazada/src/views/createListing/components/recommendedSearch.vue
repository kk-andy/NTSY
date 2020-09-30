<template>
    <div>
        <div class="keyword_row">
            <p class="search-title">Lazada</p>
            <div>
                <el-tag
                v-for="(tag, index) in tags"
                size="medium"
                :key="index"
                @click="handeleAddTag(tag.name)"
                type="info">
                {{tag.name}}
                </el-tag>
            </div>
        </div>
        <div class="keyword_row">
            <p class="search-title">Google</p>
            <div>
                <el-tag
                v-for="(tag, index) in tags"
                :key="index"
                @click="handeleAddTag(tag.name)"
                type="info">
                {{tag.name}}
                </el-tag>
            </div>
        </div>
        <div class="keyword_row">
            <p class="search-title">Amazon</p>
            <div>
                <el-tag
                v-for="(tag, index) in tags"
                :key="index"
                @click="handeleAddTag(tag.name)"
                type="info">
                {{tag.name}}
                </el-tag>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        tags: {
            type: Array,
            default: () => []
        } 
    },
    data() {
        return {
            
        }
    },
    methods: {
        handeleAddTag(title) {
            this.$emit('addTitleTag', title)
        },
    }
}
</script>
<style lang="scss" scoped>
.keyword_row {
    .search-title {
        margin-top: 15px !important;
        margin-bottom: 5px !important;
        font-size: 13px;
        color: #a0a3a6;
        cursor: context-menu;
    }
    & > div {
        & > span {
            margin-right: 5px;
            margin-bottom: 5px;
            min-width: 80px;
            color: #424648;
            cursor: pointer;
            // line-height: 26px;
            // height: 26px;
        }
        & > span:hover {
            color: #000;
            color: gray;
        }
    }
}
</style>