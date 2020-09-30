<template>
    <div class="content-data main">
        <Header>订单详情</Header>
        <p>订单号: {{ orderID }}</p>         
        <h3>订单详情</h3>
        <order-content-table :tableData="orderDetailItems"/>
        <go-back routerName="FBAOrder" />
    </div>
</template>
<script>
import OrderContentTable from './components/OrderContentTable'
import GoBack from '@/components/Back'
import { mapState } from 'vuex'
export default {
    name: 'Ordercontent',
    components: {
        OrderContentTable,
        GoBack
    },
    computed: {
        ...mapState({
            orderDetail: state => state.DeliveryManagement.orderDetail,
            orderDetailItems: state => state.DeliveryManagement.orderDetailItems,
        })
    },
    data() {
        return {
            orderID: '',
            orderId: ''
        }
    },
    created() {
        this.orderID = this.$route.query.orderID
        this.$store.dispatch('DeliveryManagement/getContent', this.orderID)
    }
}
</script>
<style scoped lang="scss">
.content-data {
    Header {
        padding: 12px 0;
        border-bottom: 1px solid #dfe6ec;
        padding-left: 15px;
        color: #333;
        font-size: 18px;
    }
    & > p {
        min-height: 70px;
    }
    h3 {
        line-height: 30px;
    }
}
</style>