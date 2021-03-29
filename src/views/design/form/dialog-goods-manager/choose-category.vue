<template>
    <!--数据配置-->
    <design-dialog
        :visible="visible"
        :width="960"
        wrapClassName="dialog-goods-source-manager"
        title="商品分组"
        :confirmLoading="loading"
        @isOk="handleConfirm"
        @isCancel="handleCancel">

        <div class="container-body">
            <a-table
                :columns="tableColumns"
                :data-source="list"
                :rowSelection="rowSelection"
                bordered>
            </a-table>
        </div>
    </design-dialog>
</template>

<script>

export default {
    name: 'goods-source-manager',

    data () {
        return {
            // 是否展示
            visible: false,
            loading: false,
            currentItem: {},
            selectedRowKeys: [],
            list: [
                {
                    "goods_id": "7608891",
                    "goods_sn": "466555503",
                    "goods_number": "213",
                    "goods_title": "Marvel Spider-Man Print Short Sleeve Graphic T-shirt - BLUE - L",
                    "goods_img": "https:\/\/gloimg.rglcdn.com\/rosegal\/pdm-product-pic\/Clothing\/2020\/06\/15\/goods-img\/1592164049059038664.jpg",
                    "market_price": "30.36",
                    "shop_price": "22.49",
                    "discount": 26,
                    "create_at": '2019-09-09' 
                },
                {
                    "goods_id": "7608886",
                    "goods_sn": "468514403",
                    "goods_number": "175",
                    "goods_title": "Marvel Spider-Man Allover Print Tank Top - MULTI - L",
                    "goods_img": "https:\/\/gloimg.rglcdn.com\/rosegal\/pdm-product-pic\/Clothing\/2020\/06\/15\/goods-img\/1592165314707062669.jpg",
                    "market_price": "25.45",
                    "shop_price": "18.99",
                    "discount": 25,
                    "create_at": '2019-09-09' 
                },
                {
                    "goods_id": "7609041",
                    "goods_sn": "467447903",
                    "goods_number": "219",
                    "goods_title": "Marvel Spider-Man Pattern Short Sleeve T-shirt - MULTI - L",
                    "goods_img": "https:\/\/gloimg.rglcdn.com\/rosegal\/pdm-product-pic\/Clothing\/2020\/06\/08\/goods-img\/1591898621405637747.jpg",
                    "market_price": "27.39",
                    "shop_price": "19.99",
                    "discount": 27,
                    "create_at": '2019-09-09' 
                }
            ],
            tableColumns: [
                {
                    title: 'ID',
                    key: 'goods_id',
                    dataIndex: 'goods_id',
                },
                {
                    title: 'Title',
                    key: 'goods_title',
                    dataIndex: 'goods_title',
                },
                {
                    title: '创建时间',
                    key: 'create_at',
                    dataIndex: 'create_at',
                }
            ]
        };
    },

    computed: {
        rowSelection () {
            return { 
                selectedRowKeys: this.selectedRowKeys, 
                onChange: this.onSelectChange,
                type: 'radio'
            }

        }
    },

    methods: {
        /**
         * 选择行
         */
        onSelectChange (selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
        },

        /**
         * 打开弹窗
         * @param {Array} list 商品列表
         */
        show (current_skus = {}) {
            this.visible = true;
            this.list.map((x, index) => {
                if (x.goods_id == current_skus.goods_id) {
                    this.selectedRowKeys.push(index);
                }
            });
        },

        /**
         * 弹窗按钮 - 确认
         */
        handleConfirm () {
            const list = this.selectedRowKeys.map(index => this.list[index]);
            if (list.length) {
                this.$emit('confirm', list[0]);
                this.visible = false;
            } else {
                this.$message.warning('请选择');
            }
        },

        /**
         * 弹窗按钮 - 取消
         */
        handleCancel () {
            this.visible = false;
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