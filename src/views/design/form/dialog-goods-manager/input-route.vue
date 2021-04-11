<template>
    <!--数据配置-->
    <design-dialog
        :visible="visible"
        :width="960"
        wrapClassName="dialog-goods-source-manager"
        :title="'填写链接'"
        :confirmLoading="loading"
        @isOk="handleConfirm"
        @isCancel="handleCancel">
        <div class="container-body">
			<a-input class="link-input" type="text" v-model="url" placeholder="请填写小程序链接,例如/pages/goods/detail?id=123"></a-input>
        </div>
    </design-dialog>
</template>

<script>

export default {
    name: 'goods-source-manager',

    data () {
        return {
			url: '',
            // 是否展示
            visible: false,
            loading: false
        };
    },

    methods: {

        /**
         * 打开弹窗
         * @param {Array} list 商品列表
         */
        show (url = '') {
            this.visible = true;
            this.url = url;
        },

        /**
         * 弹窗按钮 - 确认
         */
        handleConfirm () {
            if (this.url) {
                this.$emit('confirm', this.url);
                this.visible = false;
            } else {
                this.$message.warning('请填写链接');
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
	display: flex;
	align-items: center;
	justify-content: center;
	.link-input{
		width: 400px;
	}
}
</style>