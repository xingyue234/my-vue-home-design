<template>
    <!--数据配置-->
    <design-dialog
        :visible="visible"
        :width="960"
        wrapClassName="dialog-goods-source-manager"
        title="已选商品数据"
        :confirmLoading="loading"
        @isOk="handleConfirm"
        @isCancel="handleCancel">

        <div class="container-body">
            <a-table
                :columns="tableColumns"
                :data-source="goods_list"
                bordered>
                <a slot="pic" slot-scope="text">
                    <img :src="text" height="50px">
                </a>
                <span slot="action" slot-scope="record">
                    <a @click="handleRemoveItem(record)">Delete</a>
                </span>
                <template slot="footer">
                    <a-button @click="openSource">添加商品</a-button>
                </template>
            </a-table>
        </div>

        <goods-manager
            ref="goodsManager"
            @confirm="update_goods_list" />

    </design-dialog>
</template>

<script>

// 商品数据
import goodsManager from './choose-good.vue';

export default {
	name: 'goodSource',

    data () {
        return {
            // 是否展示
            visible: false,
            loading: false,
            goods_list: [],
            tableColumns: [
				{
				    dataIndex: 'pic',
				    key: 'pic',
				    title: 'Image',
				    scopedSlots: { customRender: 'pic' },
				},
				{
				    title: 'ID',
				    key: 'id',
				    dataIndex: 'id',
				},
				{
				    title: 'Title',
				    key: 'title',
				    dataIndex: 'title',
				},
				{
				    title: '保留价',
				    key: 'reservePrice',
				    dataIndex: 'reservePrice',
				},
                {
                    title: 'Action',
                    key: 'action',
                    scopedSlots: { customRender: 'action' },
                },
            ]
        };
    },

    components: {
        goodsManager
    },

    methods: {

        /**
         * 打开弹窗
         * @param {Array} list 商品列表
         */
        show (list = []) {
            this.visible = true;
            this.goods_list = [...list];
        },

        /**
         * 删除商品
         */
        handleRemoveItem (row) {
            this.goods_list = this.goods_list.filter(x => x.id != row.id);
        },

        /**
         * 弹窗按钮 - 确认
         */
        handleConfirm () {
            this.$emit('confirm', this.goods_list);
            this.visible = false;
        },

        /**
         * 弹窗按钮 - 取消
         */
        handleCancel () {
            this.visible = false;
        },

        /**
         * 打开数据源
         */
        openSource () {
            this.$refs.goodsManager.show(this.goods_list, 'checkbox');
        },

        /**
         * 更新商品列表
         */
        update_goods_list (list) {
			console.log(list, 'list');
            this.goods_list = [...list];
        }
    }
}
</script>

<style lang="less" scoped>
// 容器
.container-body {
    .goods-list {
        list-style: none;
        padding: 0;
        margin: 0px;
        display: flex;
        flex-wrap: wrap;
        > li {
            width: 80px;
            height: 80px;
            margin-right: 14px;
            margin-bottom: 14px;
            > img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>