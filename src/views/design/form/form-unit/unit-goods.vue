<template>
    <div class="form-item col-1">
        <label>商品数据</label>
        <div>
            <template v-if="!is_data_set">
                    <div class="button-group">
                        <a-button
                        class="button-add"
                        type="primary"
                        @click="handle_open_dialog">选择商品数据</a-button>
                        <a-button
                        class="button-add"
                        @click="handle_open_good_dialog">从商品分组中选择</a-button>
                    </div>
            </template>
            <!-- 编辑区域 -->
            <template v-else>
                <div class="form-goods">
                    <a-input
                        :disabled="true"
                        :value="tips"
                        :data-id="current_value" />

                    <a-button
                        class="button-edit"
                        type="primary"
                        @click="handle_show_dialog">查看</a-button>
                    <a-button
                        class="button-edit"
                        style="margin-left: 8px"
                        @click="handle_clear_goods">清空</a-button>
                </div>
            </template>
        </div>
        <!-- 弹窗 -->
        <good-source
            ref="goodSource"
            :value.sync="current_value"
            @confirm="handle_dialog_confirm" />


        <!-- 选择分组弹窗  -->
        <choose-goods-data
            ref="chooseGoodsData"
            :value.sync="current_value"
            @confirm="handle_dialog_good_confirm" />

    </div>
</template>

<script>

// 商品数据弹窗
import goodSource from '../dialog-goods-manager/good-source.vue';
import chooseGoodsData from '../dialog-goods-manager/choose-category.vue';

// Main code
export default {
    props: ['value', 'config'],

    components: {
        goodSource,
        chooseGoodsData
    },

    data () {
        return {
            current_value: this.value
        }
    },

    computed: {
        // 当前选的是商品还是商品分组
        valueType () {
            let goods = this.value
            if (goods instanceof Array) {
                return 'goods'
            } else if (goods instanceof Object) {
                return 'goods-category'
            }
        },
        
        // 当前组件ID
        component_id () {
            return this.$store.state.design.selected_id;
        },
        // 是否已经设置数据
        is_data_set () {
            if (this.valueType === 'goods') {
                return this.value.length > 0;
            } else if (this.valueType === 'goods-category') {
                return JSON.stringify(this.value) !== '{}'
            }
        },
        // 提示文案
        tips () {
            if (this.valueType === 'goods') {
                return `已选数量: ${this.value.length}个`;
            } else if (this.valueType === 'goods-category'){
                return `已选分组: ${this.value.goods_title}`;
            } else {
                return ''
            }
        }
    },

    methods: {
         /**
         * 打开商品分组数据配置的弹窗 --- 分组
         */
        handle_open_good_dialog () {
            this.$refs.chooseGoodsData.show(this.current_value);
        },
        /**
         * 商品分组数据配置弹窗 - 确认回调
         * @param {Object} data 商品分组数据
         */
        handle_dialog_good_confirm (data) {
            this.current_value = data
            this.$emit('input', this.current_value);
        },

        /**
         * 查看商品数据配置的弹窗
         */
        handle_show_dialog () {
            if (this.valueType === 'goods') {
                this.handle_open_dialog()
            } else {
                this.handle_open_good_dialog()
            }
        },


        /**
         * 打开商品数据配置的弹窗
         */
        handle_open_dialog () {
            this.$refs.goodSource.show(this.current_value);
        },

        /**
         * 商品数据配置弹窗 - 确认回调
         * @param {Array} list 商品数据
         */
        handle_dialog_confirm (list) {
            this.current_value = list
			console.log(list, '哈哈哈哈');
            this.$emit('input', list);
        },


        /**
         * 清空所有商品数据
         */
        handle_clear_goods () {
            this.current_value = ''
			this.$refs.chooseGoodsData.selectedRowKeys = []
            this.$emit('input', this.current_value);
        }
    }
}
</script>

<style lang="less" scoped>
.button-group{
    display: flex;
    align-items: center;
    .button-add:last-child{
        margin-left: 20px;
    }
}
// 选择按钮
.button-add {
    width: 100%;
    font-size: 14px;
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
