<template>
    <div class="buyers-Ontent" :class="{'buyers-Ontent-right': item.message_type === 'SellerMessage' }">
        <p><span>{{item.user_id}}</span> <span>{{item.action}}</span> <span>{{item.expiration_time}}</span></p>
        <div>
            <p>
                <span>{{ item.message_type === 'BuyerMessage' ? '买家' : '卖家' }}出价：{{item.price}}</span>
                <span>数量：{{item.quantity}}</span>
            </p>
            <p>留言：{{item.message}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'BuyersOntent',
    props: {
        item: {
            type: Object,
        }
    },
    data() {
        return {
            
        }
    }
}
</script>
<style scoped lang="scss">
.buyers-Ontent {
    margin-bottom: 10px;
    & > p:nth-child(1) {
        color: gray;
        line-height: 22px;
        & > span {
            margin-right: 5px;
        }
    }
    & > div {
        & > p:nth-child(1) {
            margin-bottom: 5px;
        }
        min-height: 65px;
        width: 90%;
        border-radius: 6px;
        border: 1px solid #dfdfdf;
        padding: 5px 2px 0 5px;
        
    }
}
.buyers-Ontent-right {
    margin-bottom: 10px;
    overflow: hidden;
    & > p {
        float: right;
    }
    & > div {
        float: right;
        background-color: #dedede;
    }
}
</style>