<template>
    <!--数据配置-->
    <design-dialog
        :visible="visible"
        width="1200px"
        wrapClassName="dialog-goods-source-manager"
        :title="'选择商品'"
        :confirmLoading="loading"
        @isOk="handleConfirm"
        @isCancel="handleCancel">
        <div class="container-body">
			<!-- <div class="search-box">
				<a-input-search class="search-input"  placeholder="请输入关键字" enter-button @search="onSearch" />
			</div> -->
            <a-table
                :columns="tableColumns"
                :data-source="goods_list"
				:row-key="record => record.goods_id"
                :rowSelection="rowSelection"
				:pagination="pagination"
				:loading="loading"
				:scroll="{ y: 400, x: true }"
				@change="handleTableChange"
                bordered>
                <a slot="pic" slot-scope="text">
                    <img :src="text" height="50px">
                </a>
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
			searchValue: '',
			type: 'radio',
			pagination: {
				pageSize: 20,
				current: 1
			},
            selectedRowKeys: [],
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
                }
            ]
        };
    },

    computed: {
        rowSelection () {
            return { 
                selectedRowKeys: this.selectedRowKeys, 
                onChange: this.onSelectChange,
                type: this.type
            }

        }
    },
	
	created () {
		this.fetch({
			page: 1,
			size: 20
		})
	},

    methods: {
		handleTableChange(pagination, filters) {
		      console.log(pagination, filters, 'pagination and filters');
		      const pager = { ...this.pagination };
		      pager.current = pagination.current;
		      this.pagination = pager;
		      this.fetch({
		        size: pagination.pageSize,
		        page: pagination.current,
				title: this.searchValue,
		        ...filters,
		      });
		},
		fetch (params = {}) {
			// let data = {
			// 	size: 20,
			// 	page: 1
			// }
			this.loading = true;
			this.$service.searchGoods({
				size: 20,
				...params,
			}).then((res) => {
				if (res) {
					this.goods_list = res.list
					const pagination = { ...this.pagination };
					pagination.total = res.pagination.total;
					this.loading = false;
					this.pagination = pagination;
				}
			}).catch((err) => {
				this.loading = false;
			})
		},
		onSearch (value) {
			this.searchValue = value
			this.pagination.current = 1
			this.fetch({
				title: value,
				page: 1,
				size: 20
			})
		},
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
        show (current_skus = {}, type = 'radio') {
			console.log(current_skus, type, '哈哈哈哈')
			this.type = type
            this.visible = true;
			this.selectedRowKeys = []
			if (this.type === 'radio' && (current_skus instanceof Object)) {
				this.goods_list.map((item, index) => {
					if (item.id == current_skus.id) {
						this.selectedRowKeys.push(index);
					}
				});
			} else if (current_skus instanceof Array) {
				current_skus.map(p => {
				    this.goods_list.map((x, index) => {
				        if (x.id == p.id) {
				            this.selectedRowKeys.push(index);
				        }
				    });
				});
			}
            
        },

        /**
         * 弹窗按钮 - 确认
         */
        handleConfirm () {
            const list = this.selectedRowKeys.map(index => this.goods_list[index]);
            if (list.length) {
                if (this.type === 'radio') {
					this.$emit('confirm', list[0]);
				} else {
					this.$emit('confirm', list);
				}
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
	.search-box{
		display: flex;
		justify-content: flex-end;
		padding-bottom: 10px;
		.search-input{
			width: 300px;
		}
	}

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