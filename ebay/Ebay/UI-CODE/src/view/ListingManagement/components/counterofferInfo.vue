<template>
    <div class="user-info">
        <div>
            <a :href="info.link" target="_blank">    
                <!-- <el-popover placement="right"  trigger="hover"> -->
                        <!-- <img :src="info.thumbnail" alt="" style="w" /> -->
                        <!-- <div slot="reference">                         -->
                            <img :src="info.thumbnail" alt="" />                       
                        <!-- </div> -->
                <!-- </el-popover> -->
            </a>
        </div>
        <div>
            <p>ID:<span>{{ info.item_id }}</span></p>
            <p>售价:<span>{{ info.buy_it_now_price }}</span></p>
            <p>买家地址:<span>{{ info.address }}</span></p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'UserInfo',
    props: {
        info: {
            type: Object
        }
    },
    data() {
        return {
            
        }
    }
}
</script>
<style scoped lang="scss">
.user-info{
    padding: 5px 0 5px 5px;
    display: flex;
    box-shadow: rgba(71, 51, 51, 0.18) 0px 4px 12px 0px;
    // align-items: center;
    & > div:nth-child(1) {
        height: 100%;
        width: 100px;
        border: 1px solid #dedede;
        padding: 1px;
        margin-right: 20px;
        border-radius: 2px;
        img {
            width: 100%;
            cursor: pointer;
        }
    }
    & > div:nth-child(2) {
        p {
            line-height: 26px;
            font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;        
            & > span {
                margin-left: 6px;
                font-weight: bold;
            }
        }
        & > p:nth-child(1) {
            span {
                color: #1890ff;
            }
        }
    }
}
</style>