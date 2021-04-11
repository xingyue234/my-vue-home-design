<template>
    <a-modal
        width="1000px"
        :visible="visible.material"
        title="素材库管理"
        class="material-modal"
        @cancel="visible.material = false">

        <!-- 左侧文件夹列表 -->
        <div class="tree-list">
            <a-tree
                :treeData="treeData"
                defaultExpandAll
                showIcon
                :selectedKeys.sync="selected_folder_keys"
                @select="handle_folder_selecte">
                <template slot="folder" slot-scope="{selected}">
                    <i class="iconfont geshop-icon design-folder" style="color: #81BFFF; font-size: 20px;"></i>
                </template>
            </a-tree>
			 <a-upload class="upload-image-btn"
			    name="file"
			    :multiple="true"
			    action="/admin/comm/upload"
				:data="uploadData"
			    :headers="headers"
				:beforeUpload="beforeUpload"
			    @change="handleChange"
			  >
			    <a-button> <a-icon type="upload" />上传图片素材</a-button>
			  </a-upload>
        </div>

        <!-- 目录内容 -->
		<div class="files-list">
			<div :class="{
			        'is-empty': files_list.length <= 0 && loading_files == false
			    }">
			    <a-spin :spinning="loading_files">
			        <ul class="file-list-ul">
			            <li class="file-list-li" v-for="(item, index) in files_list" :key="index">
			                <div class="image-wrapper">
			                    <img :src="item.url" :alt="item.name">
			                </div>
			                <label>{{ item.name }}</label>
			                <button @click="handle_chosen_file(item)">立即使用</button>
			            </li>
			        </ul>
					<div class="image-pagination">
						<a-pagination @change="pageChange" :default-current="1" :total="pageTotal" :pageSize="pageSize" />
					</div>
			    </a-spin>
			</div>
		</div>
    </a-modal>
</template>

<script>

import {
    get_material_folder,
    get_material_folder_detail
} from '@/interface/material.js';

// 目录递归
function toTreeData(data, pid){
    function tree(id) {
        let arr = []
        data.filter(item => {
            return item.parent == id;
        }).forEach(item => {
            arr.push({
                id: item.id,
                title: item.title,
                children: tree(item.id),
                scopedSlots: {
                    icon: 'folder'
                }
            })
        })
        return arr
    }
    return tree(pid)  // 第一级节点的父id，是null或者0，视情况传入
}

export default {
    props: {
        // 图片地址
        value: {
            type: String,
            default: ''
        },
        // 配置项
        config: {
            type: Object,
            default () {
                return {};
            }
        },
        // 根配置项
        rootConfig: {
            type: Object,
            default () {
                return {};
            }
        }
    },

    data () {
        return {
			pageTotal: 1000,
			pageSize: 15,
			uploadData: {},
			headers: {
			    Authorization: localStorage.getItem('token'),
			 },
            // 展示弹层
            visible: {
                material: false,
            },
            treeData: [], // 目录列表
            files_list: [], // 素材数据列表
            selected_folder_id: null, // 选中的目录
            selected_folder_keys: [], // 选中的目录 KEY
            selected_folder_keys_backup: [], // 选中的目录 KEY，备用，记录上次结果
            loading_files: false,
        }
    },
	
	async created () {
		// 默认选中第一个
		this.selected_folder_keys = ['0-0']
		this.get_folder_details()
	},

    methods: {
		pageChange (page, pageSize) {
			this.get_folder_details({
				page: page,
				size: pageSize
			})
		},
		beforeUpload (file) {
			// this.$service.ossUpload(file, {}).then((res) => {
			// 	console.log(res, '上传结果')
			// })
			// return false
		},
		/**
		 * 上传图片
		 */
		async handleChange (info) {
		      if (info.file.status !== 'uploading') {
		        // console.log(info.file, info.fileList, '上传图片信息');
		      }
		      if (info.file.status === 'done') {
				 this.files_list.push({
					 url: info.file.response.data,
					 name: info.file.name
				 })

		        this.$message.success(`${info.file.name} file uploaded successfully`);
		      } else if (info.file.status === 'error') {
		        this.$message.error(`${info.file.name} file upload failed.`);
		      }
		},
        /**
         * 打开素材管理的弹窗
         */
        show () {
            this.visible.material = true;
            this.get_folder();
        },

        // 获取目录数据，递归处理
        get_folder () {
            get_material_folder().then(res => {
                const folders = res.data.map(item => {
                    return {
                        id: Number(item.id),
                        title: item.text,
                        children: [],
                        parent: item.parent === '#' ? '0' : item.parent,
                    }
                });
                folders.push({
                    id: 0
                });
                this.treeData = toTreeData(folders, 0);
            });
        },

        /**
         * 获取文件夹内容
         */
        // get_folder_details () {
        //     this.loading_files = true;
        //     get_material_folder_detail({
        //         id: this.selected_folder_id
        //     }).then(res => {
        //         this.loading_files = false;
        //         // 过滤 type = 1 的图片素材
        //         this.files_list = res.data.list;
        //     });
        // },
		
		/**
		 * 获取文件夹内容
		 */
		get_folder_details (params) {
		    this.loading_files = true;
			this.$service.spaceList({
				page: 1,
				size: 15,
				...params
			}).then((res) => {
				this.loading_files = false;
				this.files_list = res.list
				this.pageTotal = res.pagination.total
			}).catch((err) => {
				this.loading_files = false;
			})
		},

        // 读取目录内容
        handle_folder_selecte (selectedKeys, e) {
			console.log(selectedKeys, e, '哈哈哈')
            if (e.selectedNodes[0]) {
                this.selected_folder_keys = selectedKeys;
                this.selected_folder_keys_backup = selectedKeys;

                // 目录唯一ID
                const dir_id = e.selectedNodes[0].data.props.id;
                // 避免重复加载
                if (this.selected_folder_id === dir_id) return false;
                // 更新选中的目录ID
                this.selected_folder_id = dir_id;
                // 读取文件夹内容
                this.get_folder_details();
            } else {
                this.selected_folder_keys = this.selected_folder_keys_backup;
            }
        },

        /**
         * 选择素材内容
         * @param {string} url 图片外连
         * @param {String} width 宽度
         * @param {String} Height 高度
         */
        handle_chosen_file ({ url, width, height }) {
            // 选择文件
            this.visible.material = false;
            this.$emit('onSelected', url);
        },

        handleCancel () {
            this.visible.material = false;
        }
    }
};

</script>

<style lang="less">
div.ant-modal{
	top: 30px;
}

// 素材管理的弹窗
.material-modal {
    .ant-modal-body {
        padding: 0px;
        display: flex;
        flex-wrap: wrap;
    }
	.upload-image-btn{
		margin-left: 20px;
	}

    // 目录列表
    .tree-list {
        width: 220px;
        height: 520px;
        border-right: solid 1px #ddd;
        padding-bottom: 20px;
        overflow-x: hidden;
        overflow-y: auto;
        box-sizing: border-box;

        .ant-tree {
            padding-left: 10px;
        }

        .ant-tree-node-content-wrapper {
            padding: 0px;
        }

        // 选中的
        .ant-tree-treenode-selected {
            background: none !important;
        }

        // 子项
        .ant-tree-node-content-wrapper {
            &:hover {
                background: none !important;
            }
            &.ant-tree-node-selected {
                background: none !important;
            }
        }

        // 选择项标题
        .ant-tree-node-selected .ant-tree-title,
        .ant-tree-title:hover {
                background: #1e9fff;
                color: #fff;
                line-height: 24px;
                display: inline-block;
                padding-right: 8px;
                padding-left: 8px;
                border-radius: 4px;
        }

    }

    // 内容
    .files-list {
        width: 700px;
        height: 520px;
        overflow-y: auto;
        box-sizing: border-box;
        position: relative;
		
		.image-pagination{
			display: flex;
			justify-content: flex-end;
		}

        // 数据为空
        &.is-empty {
            &:before {
                content: "暂无数据";
                position: absolute;
                left: 50%;
                top: 50%;
                margin-left: -28px;
                margin-top: -10px;
            }
        }

        // 预加载
        .ant-spin-nested-loading {
            position: absolute;
            left: 0px;
            top: 0px;
            right: 0px;
            bottom: 0px;
            .ant-spin-spinning {
                bottom: 0px;
                top: 0px;
                max-height: fit-content;
            }
        }

        .file-list-ul {
            list-style: none;
            margin: 0px;
            padding: 0px;
            padding-left: 24px;
            padding-top: 24px;
            display: flex;
            flex-wrap: wrap;

            .file-list-li {
                position: relative;
                width: 116px;
                height: 116 + 48px;
                overflow: hidden;
                padding: 8px;
                margin-right: 16px;
                margin-bottom: 20px;
                font-size: 12px;

                &:hover {

                    &::before {
                        position: absolute;
                        left: 0px;
                        bottom: 0px;
                        right: 0px;
                        top: 0px;
                        border: solid 2px #409EFF;
                        border-radius: 4px;
                        z-index: 1;
                        content: " ";
                    }

                    button {
                        visibility: visible;
                    }

                    label {
                        display: none;
                    }
                }

                .image-wrapper {
                    position: relative;
                    display: block;
                    width: 100px;
                    height: 100px;
                    font-size: 0px;
                    line-height: 100px;
                    background: #f9f9f9;
                    img {
                        display: inline-block;
                        vertical-align: middle;
                        max-height: 100%;
                        max-width: 100%;
                    }
                    span {
                        position: absolute;
                        left: 0px;
                        bottom: 0px;
                        right: 0px;
                        display: block;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        background: #f1f1f1;
                        color: #666;
                        font-size: 12px;
                    }
                }

                label {
                    display: block;
                    height: 40px;
                    overflow: hidden;
                    padding: 0 4px;
                    line-height: 1.7em;
                    margin-top: 6px;
                }

                button {
                    position: absolute;
                    left: 0px;
                    bottom: 0px;
                    right: 0px;
                    width: 100%;
                    height: 48px;
                    line-height: 48px;
                    visibility: hidden;
                    border: none;
                    background: #409EFF;
                    color: #fff;
                    cursor: pointer;
                    z-index: 2;
                    border-radius:0px 0px 4px 4px;
                    outline: none;
                }
            }
        }
    }
}
</style>