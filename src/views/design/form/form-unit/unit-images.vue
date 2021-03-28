<template>
    <div class="form-item col-1">
        <label>图片配置</label>

        <ul class="images-preview-list">
            <li v-for="(item, index) in current_value" :key="index">
                <div class="image-container">
                    <img :src="item.image">
                    <div class="controller-layer">
                        <button @click="handle_zoom(item.image)">
                            <a-icon type="zoom-in" />
                            <label>放大</label>
                        </button>
                        <button @click="handle_remove(index)">
                            <a-icon type="delete" />
                            <label>删除</label>
                        </button>
                    </div>
                </div>

                <!-- 图片链接配置 -->
                <div class="image-data">
                    <div class="image-data-item">
                        链接：
                        <a-dropdown>
                            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                                {{getValue(item)}} 
                                <a-icon type="down" />
                            </a>
                            <a-menu slot="overlay">
                                <a-menu-item  
                                    v-for="item2 in select_options"
                                    @click="selectHandler(item2, index)"
                                    :key="item2.code">
                                    <a href="javascript:;">{{ item2.name }}</a>
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </div>
                </div>
            </li>
        </ul>

        <a-button-group class="button-group">
            <a-button type="primary" @click="handle_open_manager">添加图片</a-button>
            <a-button @click="handle_dialog_open"> 图片排序( {{ current_value.length }} ) </a-button>
        </a-button-group>

        <!-- 图片管理器 -->
        <images-sort
            ref="images-sort"
            v-if="dialog.visible"
            :value="current_value"
            :options="config.options"
            :rootConfig="rootConfig"
            @confirm="handle_dialog_confirm"
            @cancel="handle_dialog_cancel">
        </images-sort>

        <images-manager
            ref="imagesManager"
            @onSelected="handle_add_image" />

        <!-- 商品管理器 -->
        <goods-source-manager
            ref="goodsSourceManager"
            :value.sync="current_value"
            @confirm="handle_dialog_good_confirm" />
    </div>
</template>

<script>

// 图片管理弹窗
import imagesSort from "../../../../system-components/images-sort/index.vue";
import imagesManager from "../../../../system-components/images-manager/index.vue";
import goodsSourceManager from "../../../../system-components/dialog-goods-manager/choose-good.vue";

// Main code
export default {
    name: 'unit-images',
    props: {
        value: {
            type: Array
        },
        // 配置
        config: {
            type: Object,
            required: true
        },
        // 根配置
        rootConfig: {
            type: Object,
            required: true
        }
    },
    components: {
        imagesSort,
        imagesManager,
        goodsSourceManager 
    },
    data () {
        return {
            current_value: this.value,
            current_image_index: 0,  // 当前编辑的图片项目 index
            dialog: {
                visible: false
            },
            select_options: [
                {
                    name: '商品',
                    code: 'good-detail'
                },
                {
                    name: '商品分组',
                    code: 'good-category'
                },
                {
                    name: '小程序微页面',
                    code: 'design-page'
                }
            ]
        }
    },

    watch: {
        value (newVal) {
            this.current_value = this.value;
        }
    },

    methods: {
        getValue (item) {
            if (item.link_data && item.link_data.goods_title) {
                return item.type.name + ' | ' + item.link_data.goods_title
            } else {
                return '设置链接到的页面地址'
            }
        },
        /**
         * 打开商品数据配置的弹窗
        */
        handle_open_dialog (item) {
            this.$refs.goodsSourceManager.show(item,'7608891');
        },

        selectHandler(item, index) {
            this.handle_open_dialog(item)
            this.current_image_index = index
            // if (item.key === 'good-detail') {
            // } else if (item.key === 'good-category') {
            // } else if (item.key === 'design-page') {
            // }
        },

         /**
         * 商品数据配置弹窗 - 确认回调
         * @param {Array} list 商品数据列表
         */
        handle_dialog_good_confirm (info) {
            this.value[this.current_image_index].type = info.type
            this.value[this.current_image_index].link_data = info.link_data
            this.$emit('input', this.value);
        },
        /**
         * 打开商品数据配置的弹窗
         */
        handle_dialog_open () {
            this.$message.warning('功能还没准备好，别急');
        },

        /**
         * 弹层-确认回调
         * @param {Array} list 具体数据
         */
        handle_dialog_confirm (list) {
            this.current_value = [...list];
            this.$emit('input', [...list]);
        },

        /**
         * 取消弹层
         */
        handle_dialog_cancel () {
            this.dialog.visible = false;
        },

        /**
         * 放大查看
         * @param {String} url 图片地址
         */
        handle_zoom (url) {
            this.$message.warning('功能还没准备好，别急');
        },

        /**
         * 删除图片
         * @param {Number} index 数组索引
         */
        handle_remove (index) {
            this.current_value.splice(index, 1);
            this.$message.success('删除成功');
        },

        /**
         * 打开素材管理
         */
        handle_open_manager () {
            this.$refs.imagesManager.show();
        },

        /**
         * 添加图片
         * @param {String} url
         */
        handle_add_image (url) {
            this.current_value.push({
                image: url,
                type: {},
                link_data: {}
            });
        }
    }
}
</script>

<style lang="less" scoped>

// 排序按钮
.button-group {
    width: 100%;
    font-size: 14px;
    display: flex;
    > button {
        width: 50%;
    }
}

// 预览区域
.images-preview-list {
    list-style: none;
    padding: 0px;
    margin: 0px;
    li {
        position: relative;
        margin-bottom: 10px;
    }
    img {
        max-width: 100%;
        max-height: 100%;
    }
    li .image-container:hover {
        .controller-layer {
            display: flex;
        }
    }


    // 图片链接
    .image-data{
        margin: 15px 0;
    }
    // 预览区域的按钮操作
    .controller-layer {
        display: none;
        position: absolute;
        background-color: rgba(255, 255, 255, .5);
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
        justify-content: center;
        align-content: center;
        align-items: center;


        > button {
            display: inline-block;
            width:48px;
            height:32px;
            line-height: 30px;
            margin: 0 6px;
            border-radius:16px;
            vertical-align: middle;
            border:1px solid rgba(64,158,255,1);
            background-color: #fff;
            cursor: pointer;
            outline: none;
            i {
                display: block;
                color: #409EFF;
                font-size: 22px;
            }
            label {
                display: none;

            }
        }
        > button:hover {
            background:rgba(64,158,255,1);
            label {
                display: block;
                color: #fff;
                font-size: 12px;
                cursor: pointer;
            }
            i {
                display: none;
            }
        }
    }
}

// 编辑区域
.form-goods {
    display: flex;
    flex-flow: row nowrap;

    .ant-input {
        flex-shrink: 1;
        margin-right: 8px;
        text-overflow: ellipsis;
    }
    .button-edit {
        font-size: 14px;
        flex-shrink: 0;
    }
}
</style>
