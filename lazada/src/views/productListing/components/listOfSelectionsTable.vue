<template>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        height="500"
        border
        style="width: 100%"
    >
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column label="SKU" align="center" prop="sku" v-if="ColList.indexOf('SKU') != -1"></el-table-column>
        <el-table-column prop="spu" align="center" label="SPU" v-if="ColList.indexOf('SPU') != -1"></el-table-column>
        <el-table-column
            prop="sku_name"
            align="center"
            label="标题"
            v-if="ColList.indexOf('标题') != -1"
        ></el-table-column>
        <el-table-column align="center" label="缩略图" v-if="ColList.indexOf('缩略图') != -1">
            <template slot-scope="{row}">
                <a :href="row.image_url" target="_blank" v-if="row.image_url">
                    <el-popover placement="right" width="350" trigger="hover">
                        <img :src="row.image_url" alt style="width:100%;" />
                        <div slot="reference">
                            <img
                                :src="row.image_url"
                                alt
                                style="width:100%; text-align:center;margin-top:10px"
                            />
                        </div>
                    </el-popover>
                </a>
            </template>
        </el-table-column>
        <el-table-column
            prop="cat_id_one_name"
            align="center"
            label="产品线"
            v-if="ColList.indexOf('产品线') != -1"
        ></el-table-column>
        <el-table-column
            prop="cat_id_two_name"
            align="center"
            label="二级品类"
            v-if="ColList.indexOf('二级品类') != -1"
        ></el-table-column>
        <el-table-column
            prop="buy_price"
            align="center"
            label="采购价(RMB)"
            v-if="ColList.indexOf('采购价') != -1"
        ></el-table-column>
        <el-table-column
            prop="pack_weight"
            align="center"
            label="重量(G)"
            v-if="ColList.indexOf('重量') != -1"
        ></el-table-column>
        <el-table-column
            align="center"
            label="采购链接"
            :show-overflow-tooltip="true"
            v-if="ColList.indexOf('采购链接') != -1"
        >
            <template slot-scope="{row}">
                <a
                    :href="row.supplier_link"
                    target="_blank"
                    v-if="row.supplier_link"
                    class="editor"
                >{{row.supplier_link}}</a>
            </template>
        </el-table-column>
        <el-table-column align="center" label="反向链接" v-if="ColList.indexOf('反向链接') != -1">
            <template slot-scope="{row}">
                <el-tooltip
                    class="item"
                    effect="dark"
                    :content="row.re_url_one"
                    placement="top-start"
                    v-if="row.re_url_one"
                >
                    <div>
                        <div>
                            <el-link
                                type="primary"
                                :underline="false"
                                @click="openUrl(row.re_url_one)"
                            >{{ row.re_url_one }}</el-link>
                        </div>
                    </div>
                </el-tooltip>
                <el-tooltip
                    class="item"
                    effect="dark"
                    :content="row.re_url_two"
                    placement="top-start"
                    v-if="row.re_url_two"
                >
                    <div>
                        <div>
                            <el-link
                                type="primary"
                                :underline="false"
                                @click="openUrl(row.re_url_two)"
                            >{{ row.re_url_two }}</el-link>
                        </div>
                    </div>
                </el-tooltip>
                <el-tooltip
                    class="item"
                    effect="dark"
                    :content="row.re_url_three"
                    placement="top-start"
                    v-if="row.re_url_three"
                >
                    <div>
                        <div>
                            <el-link
                                type="primary"
                                :underline="false"
                                @click="openUrl(row.re_url_three)"
                            >{{ row.re_url_three }}</el-link>
                        </div>
                    </div>
                </el-tooltip>
                <el-tooltip
                    class="item"
                    effect="dark"
                    :content="row.re_url_four"
                    placement="top-start"
                    v-if="row.re_url_four"
                >
                    <div>
                        <div>
                            <el-link
                                type="primary"
                                :underline="false"
                                @click="openUrl(row.re_url_four)"
                            >{{ row.re_url_four }}</el-link>
                        </div>
                    </div>
                </el-tooltip>
                <el-tooltip
                    class="item"
                    effect="dark"
                    :content="row.re_url_five"
                    placement="top-start"
                    v-if="row.re_url_five"
                >
                    <div>
                        <div>
                            <el-link
                                type="primary"
                                :underline="false"
                                @click="openUrl(row.re_url_five)"
                            >{{ row.re_url_five }}</el-link>
                        </div>
                    </div>
                </el-tooltip>
                <el-tooltip
                    class="item"
                    effect="dark"
                    :content="row.re_url_six"
                    placement="top-start"
                    v-if="row.re_url_six"
                >
                    <div>
                        <div>
                            <el-link
                                type="primary"
                                :underline="false"
                                @click="openUrl(row.re_url_six)"
                            >{{ row.re_url_six }}</el-link>
                        </div>
                    </div>
                </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column
            prop="developer"
            align="center"
            label="开发人"
            v-if="ColList.indexOf('开发人') != -1"
        ></el-table-column>
        
        <el-table-column
            prop="created_at"
            align="center"
            label="是否在售"
            v-if="ColList.indexOf('是否在售') != -1"
            width="75px"
        >
            <template slot-scope="{row}">
                <span>{{row.sale_state ? "在售" :'停售'}}</span>
            </template>
        </el-table-column>
        <el-table-column
            prop="is_tort"
            align="center"
            label="是否侵权"
            v-if="ColList.indexOf('是否侵权') != -1"
            width="75px"
        >
            <template slot-scope="{row}">
                <span>{{row.is_tort ? "侵权" :'否'}}</span>
            </template>
        </el-table-column>
        <el-table-column
            prop="core_word"
            align="center"
            label="关键词"
            v-if="ColList.indexOf('关键词') != -1"
        ></el-table-column>
        <el-table-column
            prop="recommend_platform"
            align="center"
            label="推荐平台"
            v-if="ColList.indexOf('推荐平台') != -1"
        ></el-table-column>
        <el-table-column
            prop="research_platform"
            align="center"
            label="调研平台"
            v-if="ColList.indexOf('调研平台') != -1"
        ></el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="是否已刊登"
            v-if="ColList.indexOf('是否已刊登') != -1"
        >
            <template slot-scope="{row}">
                <span>{{row.is_publish ? "是" :'否'}}</span>
            </template>
        </el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="刊登店铺"
            v-if="ColList.indexOf('刊登店铺') != -1"
        >
            <template slot-scope="{row}">
                <span v-for="item in row.shop" :key="item">{{item}}</span>
            </template>
        </el-table-column>
        <el-table-column
            prop="done_at"
            align="center"
            label="SKU生成时间"
            v-if="ColList.indexOf('SKU生成时间') != -1"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="60px">
            <template slot-scope="scope">
                <!-- <p class="text_fenpei" @click="distribution">主管分配</p> -->
                <!-- <p class="editor" @click="log">日志</p> -->
                <p class="editor" v-if="showEdit" @click="edit(scope.row.spu)">编辑</p>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    props: {
        tableData: Array,
        showEdit: {
            type: Boolean,
            default: false
        },
        ColList:Array
    },
    methods: {
         openUrl(url) {
      window.open(url)
    },
        // log() {
        //     this.$emit('viewLog')
        // },
        // distribution() {
        //     this.$emit('distribution')
        // }
        edit(spu) {
            this.$emit('edit', spu)
        }
    },
    beforeDestroy(){
        
    },
}
</script>
<style scoped>
.item {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    display: block;
    word-break: break-all;
    word-wrap: break-word;
}
</style>