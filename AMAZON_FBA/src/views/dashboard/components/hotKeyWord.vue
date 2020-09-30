<template>
    <div>
        <div class="keyword_row">
            <div>
                <p class="search-title">Lazada</p>
                <p>换一批</p>
            </div>       
            <div>
                <el-tag
                v-for="(tag, index) in tags"
                size="medium"
                :key="index"
                @click="handeleAddTag(tag.name)"
                :class="getClass(tag.type)"
                type="info">
                {{tag.name}}
                </el-tag>
            </div>
        </div>
        <div class="keyword_row">
            <div>
                <p class="search-title">Google</p>
                <p>换一批</p>
            </div>
            <div>
                <el-tag
                v-for="(tag, index) in tags"
                :key="index"
                @click="handeleAddTag(tag.name)"
                :class="getClass(tag.type)"
                type="info">
                {{tag.name}}
                </el-tag>
            </div>
        </div>
        <div class="keyword_row">
            <div>
                <p class="search-title">Amazon</p>
                <p>换一批</p>
            </div>   
            <div>
                <el-tag
                v-for="(tag, index) in tags"
                :key="index"
                @click="handeleAddTag(tag.name)"
                :class="getClass(tag.type)"
                type="info">
                {{tag.name}}
                </el-tag>
            </div>
        </div>
        <div class="keyword_row">
            <div>
                <p class="search-title">说明: <span>点击添加，颜色越深，搜索热度越高（多<span class="keyword-grade"></span>少）</span></p>
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
        getClass(type) {
            switch(type) {
                case 'info':
                return 'info';
                case 'success':
                return 'success';
                case 'danger':
                return 'danger';
                case 'warning':
                return 'warning';
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.keyword_row {
    & > div:nth-child(1) {
        display: flex;
        justify-content: space-between;
        p {
            margin: 10px 0;
        }
        .search-title {
            margin-top: 15px !important;
            margin-bottom: 5px !important;
            font-size: 13px;
            color: #a0a3a6;
            cursor: context-menu;
            .keyword-grade {
                display: inline-block;
                height: 15px;
                width: 60px;
                margin: 0 5px;
                vertical-align: middle;
                background: -webkit-linear-gradient(left, #fc4d4d, #ffebeb);
            }
        }
        & > p:nth-child(2) {
            color: #235270;
            cursor: pointer;
        }
        & > p:nth-child(2):hover {
            color: #286090;
        }
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
        span.info {
            background-color: #fff0f0;
        }
        span.danger {
            background: #ff8a8a;
        }
        span.warning {
            background: #ffbdbd;
        }
        span.success{
            background: #ffa3a3;
        }
        .span
        & > span:hover {
            color: #000;
            color: gray;
        }
    }
}
</style>