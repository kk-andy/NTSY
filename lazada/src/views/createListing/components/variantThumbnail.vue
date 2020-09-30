<template>
    <div class="picture-list">
        <div class="drag" v-for="(item, index) in variantThumbnailList" :key="index">
            <span>{{item.attr_label}}</span>    
            <ul class="el-upload-list el-upload-list--picture-card img-list">
                <li v-if="item.img_path" class="img_li">               
                    <img :src="item.img_path" alt class="el-upload-list__item-thumbnail" />
                    <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview">
                            <i class="el-icon-zoom-in" @click="handlePictureCardPreview(item.img_path)"></i>
                        </span>
                        <span class="el-upload-list__item-delete">
                            <i class="el-icon-delete" @click="productInfoRemove(item.id)"></i>
                        </span>
                    </span>            
                </li>
                <li v-if="!item.img_path">
                    <el-upload
                        :action="uploadUrl"
                        list-type="picture-card"
                        :headers="headers"
                        :show-file-list="false"
                        :on-success="(response, file, fileList) => onSuccess(response, file, fileList, item.id)"
                        :on-error="uploadError"
                        :before-upload="(file) => beforeUpload(file, item)"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {  Loading } from 'element-ui'
import { message  } from '@/utils/common'
import { getSesstionToken } from '@/utils/auth'
export default {
    name: 'variantThumbnail',
    props: {
        variantThumbnailList: {
            type: Array,
            required: true
        }
    },
    computed: {
        ...mapGetters(['uploadUrl'])
    },
    data() {
        return {
            dialogVisible: false,
            imgpath: '',
            headers: {
                Authorization: getSesstionToken()
            }
        }
    },
    methods: {
        handlePictureCardPreview(value) {
            window.open(value)
        },
        productInfoRemove(id) {
            let index = this.variantThumbnailList.findIndex(ele => ele.id === id)
            this.variantThumbnailList[index].img_path = ''
            this.$emit('clearVariantThumbnaiList', id)
            // this.variantThumbnailList.splice(index, 1)
        },
        onSuccess(response, file, fileList, id) {
            if (response.code === 0) {
                let index = this.variantThumbnailList.findIndex(ele => ele.id === id)
                this.variantThumbnailList[index].img_path = response.data.file
                this.$emit('changeVariantThumbnaiList', id, response.data.file)
            } else {
                message('warning', `${response.msg}`, 2000)
            } 
            Loading.service({ fullscreen: true }).close();
        },
        uploadError(err, file, fileList) {
            message('error', `${err.msg}`, 2000)
            Loading.service({ fullscreen: true }).close();
        },
        beforeUpload(file, key) {
            let type_arr = ["image/jpeg", "image/png"];
            let type = file.type;
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
    display: flex;
    align-items: center;
    flex-wrap: wrap;
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
    .drag{
        display: flex;
        flex-direction: column;
        margin-left: 25px;
        margin-bottom: 15px;
        .img-list {
            width: 148px;
            height: 148px;
            .img_li {
                overflow: hidden;
                background-color: #fff;
                border: 1px solid #c0ccda;
                border-radius: 6px;
                box-sizing: border-box;
                width: 148px;
                height: 148px;
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
</style>