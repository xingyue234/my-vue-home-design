<template>
    <div id="page-activity" style="background: #F0F2F5;">

        <!-- 筛选项 -->
        <list-filter
            ref="filter"
            :site="site"
            :platform="platform"
            :pageNo="main_page_pagination.current"
            :pageSize="main_page_pagination.pageSize"
            @showDialog="handle_show_dialog"
            @beforeResponse="handle_loading"
            @response="handle_get_main_page">
        </list-filter>

        <!-- 端切换 -->
        <a-tabs
            class="main-page-device-tabs"
            @change="handle_device_tab_change">
            <a-tab-pane
                v-for="item in site_platform_list"
                :tab="item.name"
                :key="item.code">
            </a-tab-pane>
        </a-tabs>

        <!-- 加载动画 -->
        <a-spin :spinning="loading">
            <!-- 主活动列表 -->
            <div class="main-page-list">
                <ul class="page-list">
                    <li
                        v-for="item in main_page_list"
                        :key="item.id">
                        <list-item
                            :info="item"
                            :site="site"
                            @onDelete="handle_delete">
                        </list-item>
                    </li>
                </ul>

                <!-- 主活动列表的分页 -->
                <a-pagination
                    class="page-pagination"
                    showQuickJumper
                    :current="main_page_pagination.current"
                    :total="main_page_pagination.total"
                    @change="handle_page_change" />
            </div>
        </a-spin>

    </div>
</template>

<script>

// 筛选组件
import listFilter from './unit/list-filter.vue';
// 列表项
import listItem from './unit/list-item.vue';

export default {
    data () {
        return {
            // 当前端，[pc/wap/app]
            platform: '',
            // 当前站点拥有的渠道
            site_support_pipelines: {},
            // 状态
            loading: false,
            // 主页列表
            main_page_list: [],
            // 主分页的页码
            main_page_pagination: {
                current: 1,
                pageSize: 10,
                total: 0
            },
        }
    },

    computed: {
        /**
         * 获取站点的所有端
         * 1. 不获取APP端
         */
        site_platform_list () {
            let base = [];
            base = base.filter(x => x.code != 'app');
            return base;
        },
        // 当前站点
        site () {
            return 'zf'
        }
    },

    components: {
        listFilter,
        listItem,
    },

    methods: {

        /**
         * 开启/关闭loading效果
         */
        handle_loading (tof) {
            this.loading = tof;
        },
        
        /**
         * 打开弹窗
         * @description 组件必须暴露 show 这个方法
         * @param {string} name 弹窗的名字 vue.$refs[name]
         * @param {object} data 弹窗的传参，默认空对象
         */
        handle_show_dialog ({ name, data = {} }) {
            this.$refs[name].show(data);
        },

        /**
         * 执行查询操作
         */
        handle_search () {
            this.$refs.filter.handle_search();
        },

        /**
         * 获取列表数据
         * @param {Array} list 页面列表
         */
        handle_get_main_page (res) {
            this.main_page_list = [...res.list];
            this.main_page_pagination.total = parseInt(res.pagination.total);
            this.main_page_pagination.current = parseInt(res.pagination.page);
            this.main_page_pagination.pageSize = parseInt(res.pagination.size);
            this.handle_loading(false);
        },
        
        /**
         * 应用端切换
         */
        handle_device_tab_change (code) {
            this.$store.commit('home/update_platform', code);
            this.main_page_pagination.current = 1;
        },

        /**
         * 分页切换
         */
        handle_page_change (page) {
            this.main_page_pagination.current = page;
        },

        /**
         * 删除页面
         * @param {string} group_id 渠道组合ID
         */
        handle_delete (params) {
			this.$confirm({
			    title: '提示',
			    content: '确定删除首页列表信息吗？删除后，不可恢复，请谨慎操作！',
			    okText: '删除',
			    okType: 'danger',
			    cancelText: '取消',
			    onOk: () => {
					this.$service.delete(params).then((res) => {
						this.$message.success('页面删除成功');
						this.handle_search();
					}).catch((err) => {
						console.log(err, '删除失败');
						// this.$message.error(err.message);
					})
			    }
			});
            // if (res.code == 0) {
            //     this.handle_search();
            //     this.$message.success(res.message);
            // }
        }
    }
}
</script>

<style lang="less" >
#page-activity {
    position: relative;

    // tab 的定制样式
    .main-page-device-tabs {
        height: 50px;
        .ant-tabs-nav-container {
            font-size: 18px !important;
        }
    }


}
</style>

<style lang="less" scoped>

// 主活动列表(左侧)
.main-page-list {
    width: 100%;
    flex-shrink: 0;

    ul.page-list {
        list-style: none;
        padding: 0px;
        margin: 0px;
        padding-top: 40px;
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
		margin-left: -18px;

        li {
			width: 267px;
			height: 272px;
			background-color: #fff;
			border-radius: 10px;
			margin: 0 18px 30px;
        }

        li:hover {
            box-shadow:0px 2px 20px 0px rgba(185,195,205,1);
        }
    }

    // 分页
    .ant-pagination {
        text-align: center;
        margin-top: 24px;
    }
}

</style>