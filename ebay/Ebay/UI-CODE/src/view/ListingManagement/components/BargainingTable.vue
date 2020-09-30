<template>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        style="width: 100%;margin:30px 0"
    >
        <el-table-column
        type="selection"
        align="center"
        width="55"
      />
        <el-table-column
            label="产品信息"
            align="center"
            prop="sku"
        >
            <template slot-scope="{ row }">
                <a :href="row.link" target="_blank" v-if="path">
                <el-popover placement="right" width="350" trigger="hover">
                    <img :src="row.thumbnail" alt style="width:100%;" />
                    <div slot="reference">
                    <img
                        :src="row.thumbnail"
                        alt
                        style="width:50%; text-align:center;margin-top:10px"
                    />
                    </div>
                </el-popover>
                </a>
                <p class="item-id">{{ row.item_id }}</p>
                <p>{{row.currency}} {{row.buy_it_now_price}}</p>
            </template>
        </el-table-column>
        <el-table-column
            prop="sku"
            align="center"
            label="SKU"        
        >
        </el-table-column>
        <el-table-column
            align="center"
            width="100"
            label="买家出价"     
        >
            <template slot-scope="{ row }">
                <div class="icon">
                    <p class="item-id">{{ row.user_price }}</p>
                    <el-popover placement="right" width="550" trigger="hover">
                        <div :class="{'overflow-scroll': row.detail_info.length > 5 }">
                            <buyers-ontent :item="item" v-for="(item ,index) in row.detail_info" :key="index"/>
                        </div>
                        <div slot="reference">
                        <i class="el-icon-chat-dot-square"></i>
                        </div>
                    </el-popover>
                </div>            
            </template>
        </el-table-column>
        <el-table-column
            prop="user_quantity"
            width="100"
            align="center"
            label="数量"
        >
        </el-table-column>
        <el-table-column
            align="center"
            width="100"
            label="卖家出价"     
        >
            <template slot-scope="{ row }">
                <div class="icon">
                    <p class="item-id">{{ row.seller_price }}</p>
                    <el-popover placement="right" width="550" trigger="hover">
                        <div :class="{'overflow-scroll': row.detail_info.length > 5 }">
                            <buyers-ontent :item="item" v-for="(item ,index) in row.detail_info" :key="index"/>
                        </div>
                        <div slot="reference">
                        <i class="el-icon-chat-dot-square"></i>
                        </div>
                    </el-popover>
                </div>            
            </template>
        </el-table-column>
        <el-table-column
            prop="seller_quantity"
            align="center"
            width="100"
            label="数量"
        >
        </el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="买家账号/邮箱"
        >
            <template slot-scope="{row}">
                <div>{{ row.user_id }}</div>
                <div>{{row.email}}</div>
            </template>
        </el-table-column>
        <el-table-column
            prop="core_word"
            align="center"
            label="店铺/站点"
        >
            <template slot-scope="{row}">
                <div>{{ row.shop_name }}</div>
                <div>{{row.site}}</div>
            </template>
        </el-table-column>
        <el-table-column
            prop="recommend_platform"
            align="center"
            label="过期时间"
        >
            <template slot-scope="{row}">
                <p>{{ row.expiration_time }}</p>
                <p class="time">{{ row.left_time }}</p>
            </template>
        </el-table-column>
        <el-table-column
            prop="status_text"
            align="center"
            label="还价状态"
        >
        </el-table-column>
        <el-table-column
            label="操作"
            align="center"
        >
            <template slot-scope="{row}">
            <div>
              <el-button
                type="text"
                @click="accept(row.id, row.best_offer_id)"
                v-if="row.status === 0 && buttons.accept"
                class="synColor"
              >接受</el-button>
              <!-- <el-button
                type="text"
                v-if="row.status !== 0 && buttons.note"
                @click="note(row.id)"
                class="synColor"
              >备注</el-button> -->
              <el-dropdown trigger="click" v-if="row.status === 0">
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item>
                    <el-button
                      type="text"
                      @click="refused(row.id, row.best_offer_id)"
                      v-if="buttons.refused"
                      class="editColor"
                    >拒绝</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      type="text"
                      class="copyColor"
                      v-if="buttons.counteroffer"
                      @click="counteroffer(row.id, row.best_offer_id)"
                    >还价</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      class="logColor"
                      type="text"
                      v-if="buttons.note"
                      @click="note(row.id)"
                    >备注</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <!-- <div v-else>
              <el-button
                type="text"
                class="copyColor"
              >备注</el-button>
            </div> -->
          </template>
      </el-table-column>
    </el-table>
</template>
<script>
import buyersOntent from './buyersOntent'
export default {
    props: {
        tableData: Array,
        showEdit: {
            type: Boolean,
            default: false
        },
        buttons: {
            type: Object,
            default: {}
        }
    },
    components: {
        buyersOntent
    },
    data() {
        return {
            path: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1596008430&di=60fee641aa72262c0997f4e9beb66d41&src=http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg'
        }
    },
    methods: {
        accept(id, bestID) {
            this.$emit('accept', id, bestID)
        },
        refused(id, bestID) {
            this.$emit('refused', id, bestID)
        },
        counteroffer(id, bestID) {
            this.$emit('counteroffer', id, bestID)
        },
        note(id) {
            this.$emit('note', id)
        },
    }
}
</script>
<style scoped lang="scss">
.item-id {
    color: #1890ff
}
.nested {
  margin: 0 15px;
  cursor: pointer;
}
.editColor {
  color: #e6a23c;
}
.synColor {
  color: #409eff;
}
.logColor {
  color: #909399;
}
.copyColor {
  color: #67c23a;
}
.time {
    color: #e02433;
}
.icon {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .el-icon-chat-dot-square {
        font-size: 16px;
        cursor: pointer;
        margin-left: 15px;
    }
}
.overflow-scroll{
    height: 300px;
    overflow-y: scroll;
}
</style>