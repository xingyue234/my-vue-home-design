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
				@change="handleTableChange"
				:scroll="{ y: 400, x: 800 }"
				:pagination="pagination"
                bordered>
            </a-table>
        </div>
    </design-dialog>
</template>

<script>

export default {
    name: 'group-source-manager',

    data () {
        return {
            // 是否展示
            visible: false,
            loading: false,
            selectedRowKeys: [],
			pagination: {
				pageSize: 20,
				current: 1
			},
            list: [],
            tableColumns: [
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
                    title: '创建时间',
                    key: 'createTime',
                    dataIndex: 'createTime',
                }
            ]
        };
    },
	created () {
		this.fetch({
			page: 1,
			size: 20
		})
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
			this.$service.searchGroup({
				size: 20,
				...params,
			}).then((res) => {
				if (res) {
					this.list = res.list
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
        show (current_value = {}) {
            this.visible = true;
			this.selectedRowKeys = []

			this.selectedRowKeys = this.list.map((item, index) => {
				if (item.id == current_value.id) {
					return index
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