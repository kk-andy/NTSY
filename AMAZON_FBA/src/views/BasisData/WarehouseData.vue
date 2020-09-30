<template>
    <div class="main">
        <storage-content-head>
            <span>仓库信息</span>
        </storage-content-head>
        <storage-content-body :form="form" />
        <div class="actions-group">
            <el-button class="btn_button_primary" type="primary" @click="confirmSave">保存</el-button>  
        </div>
    </div>
</template>
<script>
import StorageContentHead from '@/views/ProcurementManagement/components/StorageContentHead'
import StorageContentBody from './components/StorageContenInfo'
import { message  } from '@/utils/common'
let regPhone = /^1[3456789]\d{9}$/
export default {
    components: {
        StorageContentHead,
        StorageContentBody,
    },
    computed: {
        form: {
            get() {
                return this.$store.state.WarehouseData.form
            },
            set(val) {
                this.$store.state.WarehouseData.form = val
            }
        }
    },
    data() {
        return {   
            level: '',
            pid: '',
            whouseId: '',
            showComponent: true,
        }
    },
    beforeRouteLeave(to, from, next) {
        this.$store.commit('WarehouseData/CLEAR_FORM')
        next()
    },
    methods: {
        /* 保存 */
        confirmSave() {
            if(!this.form.whouseName || !this.form.type) {
                message('warning', '仓库类型和仓库名称必须填写')
                return
            }
            if (this.form.contactPhone) {
                if (!regPhone.test(this.form.contactPhone)) {
                    message('warning', '手机号填写不正确')
                    return
                }
            }
            let data = this.form
            data.type = Number(this.form.type)
            if (this.$route.query.type === 'addChildren') { /* 判断当前是添加子集仓库 */
                data.level = Number(this.level) + 1
                data.pid = Number(this.whouseId)

            } else if (this.$route.query.type === 'edit') { /* 修改仓库 */

                data.whouseId = Number(this.whouseId)
            } else { /* 添加顶级仓库 */

                data.pid = 0
                data.level = 1
            }
            this.$store.dispatch('WarehouseData/addWarehouse', data)
        }
    },
    created() {
        if (this.$route.query.type !== 'addParent') {
            let { level, pid, whouseId } = this.$route.query
            this.level = level
            this.pid = pid
            this.whouseId = whouseId
        }  
        if (this.$route.query.type === 'edit') {
            let parmas = { whouseId: this.$route.query.whouseId }
            this.$store.dispatch('WarehouseData/getWarehouseContent', parmas)
        }
    }
}
</script>
<style scoped lang="scss">
.main {
    width: 80% !important;
    margin: 0 auto;
    Header {
        font-weight: bold;
        font-size: 16px;
        color: #333;
        padding: 15px 0;
        border-bottom: 1px solid #dfe6ec;
    }
    .actions-group {
        display: flex;
        flex-direction: row-reverse;
        margin-top: 25px;
        button {
            margin-left: 15px;
        }
    }
}
</style>