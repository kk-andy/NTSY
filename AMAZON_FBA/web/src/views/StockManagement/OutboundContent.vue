<template>
    <div class="main">
        <storage-content-head>
            <span>出入库单据详情</span>
        </storage-content-head>
        <ContentBody :detail="detail" />
        <storage-content-head>
            <span>SKU详情</span>
        </storage-content-head>
        <TableContent :tableData="detailItems"/>
        <div class="back">
            <el-button @click="goBack">返回</el-button>
        </div>
    </div>
</template>
<script>
import ContentBody from './components/outboundCOntentBody'
import StorageContentHead from '@/views/ProcurementManagement/components/StorageContentHead'
import TableContent from './components/outboundCOntentTable'
import { mapState } from 'vuex'
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            detail: state => state.Outbound.detail,
            detailItems: state => state.Outbound.detailItems
        })
    },
    components: {
        ContentBody,
        StorageContentHead,
        TableContent
    },
    methods: {
        goBack() {
            this.$router.push({
                name: 'Outbound'
            })
        }
    },
    created() {
        let { ticketCode, type } = this.$route.query
        this.$store.dispatch('Outbound/getContent', { type, ticketCode })
    }
}
</script>
<style lang="scss" scoped>
.main {
    width: 90% !important;
    margin: 0 auto;
    .back {
        margin: 20px 0;
        display: flex;
        flex-direction: row-reverse;
    }
}
</style>