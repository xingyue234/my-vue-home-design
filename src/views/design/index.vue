<template>
    <div class="design-layout">

        <!-- 加载效果 -->
        <a-spin v-if="loading" :spinning="loading"></a-spin>

        <!-- 真实组件 -->
        <template v-if="first_loaded">
            <!-- 头部 -->
            <layout-top />

            <!-- 左侧组件列表 -->
            <layout-component-list v-if="env == 1" />

            <!-- 中间预览区域 -->
            <layout-preview />

            <!-- 组件表单 -->
            <layout-form  v-if="env == 1" />

            <!-- 组件顺序 -->
            <layout-sortable  v-if="env == 1" />
        </template>
    </div>
</template>

<script>

import {
    get_native_apis
} from '@/interface/index';

import layoutTop from './layout/top.vue'; // 头部区域
import layoutPreview from './layout-preview/index.vue'; // 组件预览区域
import layoutForm from './form/index.vue'; // 组件表单区域
import layoutComponentList from './layout/left.vue'; // 组件列表区域
import layoutSortable from './layout/right.vue'; // 组件顺序区域

export default {
    components: {
        layoutTop,
        layoutPreview,
        layoutForm,
        layoutComponentList,
        layoutSortable,
    },

    computed: {
		// 当前环境, 1=装修页, 2=预览, 3=发布
		env () {
		    return this.$store.state.page.env;
		},
        first_loaded () {
            return this.$store.state.design.first_loaded;
        },
        loading () {
            return this.$store.state.design.loading;
        }
    },

    methods: {
        /**
         * 页面初始化
         */
        async page_init () {
            // 开启页面级loading
            this.$store.state.design.first_loaded = false;
            // 初始化表单状态
            this.$store.state.design.selected_id = null;
            this.$store.state.design.show_component_form = false;

            const page_id = this.$route.query.id || '';
            // 请求页面数据
            if (page_id) {
				this.$store.dispatch('design/page_load', page_id);
			} else {
				const res = {
				    "pageTitle":"空白页",
				    "lang":"en",
				    "pageId": "",
				    "platform":"wap",
				    "banner": "",
				    "components": []
				}
				const data = {
				    page_id: res.pageId || '',
				    lang: res.lang || 'en',
				    platform: res.platform || 'm',
				    title: res.pageTitle || '',
				    components: res.components.map(x => new Vdc(x))
				};

				// 存储页面数据
				this.$store.dispatch('page/load', data, { root: true });  
				
				// 11-10 通过 API 获取当前页面组件的商品数据 - Cullen
				// this.$store.dispatch('page/load_remote_goods_data', {
				//     is_first: 1
				// }, { root: true });
				
				// 更新状态
				this.$store.state.design.loading = false;
				this.$store.state.design.first_loaded = true;
				
			}
        }
    },

    watch: {
        '$route' () {
            this.page_init();
        }
    },

    created () {
		console.log(this.env, 'env哈哈哈');
        
        /**
         * 页面初始化
         */
        this.page_init();

        // 设置dom的根样式
        document.documentElement.style.fontSize = '37.5px';
		// console.log(this.$service.list(), 'this.$service.list()');
		this.$service.list().then((res) => {
			console.log(res, 'res哈哈哈')
		})
    }
}
</script>

<style lang="less">
    #app {
        height: 100%;
    }
</style>

<style lang="less" scoped>
    .design-layout {
        display: block;
        position: relative;
        min-width: 100%;
        min-height: 100%;
        height: 100%;
        background: #EDEFF2;
    }

    // loding 菊花图
    .ant-spin.ant-spin-spinning {
        position: fixed;
        left: 0px;
        top: 0px;
        bottom: 0px;
        right: 0px;
        background: rgba(255, 255, 255, 0.5);
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
