<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container" v-if="showUpload">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div>
  </div>
</template>

<script>
import editorImage from './components/EditorImage'
import plugins from './plugins'
import font_formats from './fontFormats'
import toolbar from './toolbar'
import load from './dynamicLoadScript'
// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'

export default {
    name: 'Tinymce',
    components: { editorImage },
    props: {
        id: {
            type: String,
            default: function() {
                return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
            }
        },
        value: {
            type: String,
            default: ''
        },
        flag: {
            type: Boolean,
        },
        toolbar: {
            type: Array,
            required: false,
            default() {
                return []
            }
        },
        menubar: {
            type: String,
            default: 'file edit insert view format table'
        },
        height: {
            type: [Number, String],
            required: false,
            default: 450
        },
        width: {
            type: [Number, String],
            required: false,
            default: 'auto'
        },
        showUpload: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            hasChange: false,
            hasInit: false,
            tinymceId: this.id,
            fullscreen: false,
            languageTypeList: {
                'en': 'en',
                'zh': 'zh_CN',
                'es': 'es_MX',
                'ja': 'ja'
            }
        }
    },
    computed: {
        containerWidth() {
            const width = this.width
            if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
                return `${width}px`
            }
            return width
        }
    },
    watch: {
        value(val) {
            if (!this.hasChange && this.hasInit) {
                this.$nextTick(() =>
                    window.tinymce.get(this.tinymceId).setContent(val || ''))
            }
            // let str = window.tinymce.activeEditor.getContent(); 
            // let num = this.removeHTMLTag(str);
            // if (num.length > 14540) {
            //     this.$message({
            //         type: 'warning',
            //         message:'字符已超出上限，请修改后重新输入！'
            //     })
            //     this.$emit('update: flag', false)
            // } else {
            //     this.$emit('update: flag', false)
            // }
        }
    },
    mounted() {
        this.init()
    },
    activated() {
        if (window.tinymce) {
            this.initTinymce()
        }
    },
    deactivated() {
        this.destroyTinymce()
    },
    destroyed() {
        this.destroyTinymce()
    },
    methods: {
        init() {
            // dynamic load tinymce from cdn
            load(tinymceCDN, (err) => {
                if (err) {
                    this.$message.error(err.message)
                    return
                }
                this.initTinymce()
            })
        },
        removeHTMLTag(str) {
            str = str.replace(/<\/?[^>]*>/g, '');
            str = str.replace(/[ | ]*\n/g, '\n');
            str = str.replace(/&nbsp;/ig, '');
            str = str.replace(/\s/g, '');
            return str;
        },
        initTinymce() {
            const _this = this
            window.tinymce.init({
                selector: `#${this.tinymceId}`,
                language: this.languageTypeList['zh'],
                height: this.height,
                body_class: 'panel-body ',
                object_resizing: false,
                toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
                menubar: this.menubar,
                plugins: plugins,
                end_container_on_empty_block: true,
                powerpaste_word_import: 'clean',
                fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
                font_formats: font_formats,
                code_dialog_height: 450,
                code_dialog_width: 1000,
                advlist_bullet_styles: 'square',
                advlist_number_styles: 'default',
                imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
                default_link_target: '_blank',
                link_title: false,
                plugin_preview_width : 900, //调整预览窗口的大小
                plugin_preview_height : 600,
                nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
                init_instance_callback: editor => {
                    if (_this.value) {
                        editor.setContent(_this.value)
                    }
                    _this.hasInit = true
                    editor.on('NodeChange Change KeyUp SetContent', () => {
                        this.hasChange = true
                        this.$emit('input', editor.getContent())
                    })
                },
                setup(editor) {
                    editor.on('FullscreenStateChanged', (e) => {
                        _this.fullscreen = e.state
                    })
                }
            })
        },
        destroyTinymce() {
            const tinymce = window.tinymce.get(this.tinymceId)
            if (this.fullscreen) {
                tinymce.execCommand('mceFullScreen')
            }

            if (tinymce) {
                tinymce.destroy()
            }
        },
        // getCount() {
        //     const tinymce = window.tinymce.get(this.tinymceId)
        //     var editor = tinymce.activeEditor, 
            
        //     // words = editor.plugins.wordcount._getCount(editor); 
        //     // console.log(editor)
        // },
        setContent(value) {
            window.tinymce.get(this.tinymceId).setContent(value)
        },
        getContent() {
            window.tinymce.get(this.tinymceId).getContent()
        },
        imageSuccessCBK(arr) {
            const _this = this
            arr.forEach(v => {
                window.tinymce.get(_this.tinymceId).insertContent(`<img style="width:100%" class="wscnph" src="${v.url}" >`)
            })
        }
    }
}
</script>

<style scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
