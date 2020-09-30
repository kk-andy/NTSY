<template>
    <div class="picture-list">
        <div v-for="(item, index) in variantPictureList" :key="item.id">
            <div class="drag_picture" v-if="lazadaTableHead.length">
                <div class="bianzhong_name">
                    <p>
                        <span v-for="(ele, index) in lazadaTableHead" :key="index">{{ ele.attr_label }}: {{ getName(ele, item) }}</span>
                    </p>
                    <span>支持png、jpg格式，最多上传8张图</span>
                </div>
                <!-- <varant-name :item="item" :lazadaTableHead="lazadaTableHead" /> -->
                <ul class="el-upload-list el-upload-list--picture-card img-list">
                    <draggable 
                    v-model="item.img_list" 
                    class="dragArea" 
                    v-bind="dragOptions"
                    @change="(e) => toChange(e, item)"  
                    @start="(e) => start(e, item)"
                    @end="(e) => end(e, item)">
                        <li
                            :tabindex="index"
                            class="el-upload-list__item is-success animated"
                            v-for="(src, index) in item.img_list"
                            :key="index"
                        >
                            <img :src="src" alt class="el-upload-list__item-thumbnail" />
                            <label class="el-upload-list__item-status-label">
                                <i class="el-icon-upload-success el-icon-check"></i>
                            </label>
                            <i class="el-icon-close"></i>
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview">
                                    <i class="el-icon-zoom-in" @click="handlePictureCardPreview(src)"></i>
                                </span>
                                <span class="el-upload-list__item-delete">
                                    <i class="el-icon-delete" @click="productInfoRemove(item.img_list, index)"></i>
                                </span>
                            </span>          
                        </li>
                    </draggable>
                    <li>
                        <el-upload
                            v-show="item.img_list.length < 8"
                            :action="uploadUrl"
                            list-type="picture-card"
                            :headers="headers"
                            multiple
                            :show-file-list="false"
                            :on-success="(response, file, fileList) => onSuccess(response, file, fileList, item)"
                            :on-error="uploadError"
                            :before-upload="(file) => beforeUpload(file, item)"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
import VarantName from './varianName'
import { message } from '@/utils/common'
import {  Loading } from 'element-ui'
import { mapGetters } from 'vuex'
import { getSesstionToken } from '@/utils/auth'
export default {
    name: 'variantPicture',
    components: { draggable, VarantName },
    props: {
        variantPictureList: {
            type: Array,
            default: () => []
        },
        lazadaTableHead: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            dialogVisible: false,
            dragOptions: { animation: 500 },
            imgPath: '',
            headers: {
                Authorization: getSesstionToken()
            },
        }
    },
    computed: {
        ...mapGetters(['uploadUrl']),
        getName() {
            return function(ele, item) {
                return item[ele.attr_label]
            }
        }
    },
    methods: {
        toChange(e, item) {
            this.imgPath = e.moved.element
            // console.log(e, '============>>>' ,item)
        },
        end(e, item) {
            console.log(e)
            if (e.newIndex === 0 || e.oldIndex === 0) {
                this.$emit('change-image-path',item.id, item.img_list)
            }
            // console.log(item.img_list)
        },
        start(e, item) {
            // console.log(item.img_list)
            // console.log(e, 'start', item)
        },
        handlePictureCardPreview(src) {
            window.open(src)
        },
        productInfoRemove(list, index) {
            list.splice(index, 1)
        },
        onSuccess(response, file, fileList, item) {
            if (response.code === 0) {
                item.img_list.push(response.data.file);
                if (item.img_list.length > 8) {
                    item.img_list.splice(7, item.img_list.length - 8)
                }
            } else {
                message('warning', `${response.msg}`, 2000)
            } 
            Loading.service({ fullscreen: true }).close();
        },
        uploadError(err, file, fileList) {
            message('error', `${err.msg}`, 2000)
            Loading.service({ fullscreen: true }).close();
        },
        beforeUpload(file, item) {
            if (item.img_list.length === 8) {
                Loading.service({ fullscreen: true }).close();
                return false
            }
            let type_arr = ["image/jpeg", "image/png"];
            let type = file.type;
            console.log(type)
            if (!type_arr.includes(type)) {
                message('warning', '图片格式不正确，只支持 jpg 和 png 类型图片', 2000)
                return false;
            }
            let isSmall = file.size / 1024 > 10
            let islarge = file.size / 1024 > 10240 
            if (!isSmall || islarge) {
                message('warning', 'file 必须介于 10 - 10240 KB 之间', 2000)
                return false;
            }
            Loading.service({ fullscreen: true, text: "图片上传中，请稍后" });
        }
    }
}
</script>
<style lang="scss" scoped>
.picture-list{
    // display: flex;
    align-items: center;
    & > div {
        text-align: center;
        & > span {
            margin-bottom: 10px;
        }
        & > .imgpath-content {
            width: 148px;
            height: 148px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .drag_picture{
        display: flex;
        flex-direction: column;
        width: 90%;
        margin-left: 25px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ededed;
        .bianzhong_name {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            & > P {
                span {
                    margin-right: 25px;
                }
            }
                & > span:nth-child(2) {
                    color: #ccc;
                }
        }
        .img-list {
            // width: 148px;
            // height: 148px;
            display: flex;
            .dragArea {
                display: flex;
                flex-wrap: wrap;
            }
            .img_li {
                overflow: hidden;
                background-color: #fff;
                border: 1px solid #c0ccda;
                border-radius: 6px;
                box-sizing: border-box;
                width: 100px;
                height: 100px;
                margin: 0 8px 8px 0;
                display: inline-block;
                position: relative;
            }
        }
        .img-list li div .el-upload--picture-card {
            width: 100px;
            height: 100px;
            line-height: 100px;
        }
    }
}
.overflow-picture {
    height: 500px;
    overflow-y: scroll;
}
</style>
<style lang="scss">
.drag_picture {
    .el-upload-list--picture-card  {
        .el-upload-list__item {
            width: 100px;
            height: 100px;
        }
    }
    .el-upload--picture-card  {
            width: 100px;
            height: 100px;
            line-height: 102px;
    }
}
</style>