# 可视化页面装修
[![Vue](https://img.shields.io/badge/Vue-%5E2.5.16-brightgreen)](https://cn.vuejs.org)
[![Ant-deisgn](https://img.shields.io/badge/Antd-v1.3.10-brightgreen)](https://antdv.com/)
[![Vue.Draggable](https://img.shields.io/badge/Vue.Draggable-v2.23.0-brightgreen)](https://github.com/SortableJS/Vue.Draggable)

基于 ```vue``` + ```ant-design``` + ```vue-draggable``` 实现的可视化页面装修功能


操作指引：
1. 左侧组件区域拖拽至中间布局区域
2. 中间区域的组件支持上下拖拽排序，删除组件
3. 点击中间区域的组件，右侧会打开组件支持的配置项
4. 右侧楼层管理支持组件的排序、复制、删除、定位等

* 目前支持组件列表
* 1. [标题栏](#标题栏)
* 2. [广告图](#广告图)
* 3. [商品列表](#商品列表)
* 4. [商品搜索](#商品列表)
* 5. [橱窗](#商品列表)

## 安装
```
$ npm install
```

## 启动
1. 命令行执行：```npm run dev```
2. 浏览器打开链接：[localhost:3001](http://localhost:3001)

## 代码目录
```
├── README.md
├── package.json
├── src
│   ├── html
│   ├── interface // 接口
│   │   ├── core.js
│   │   ├── index.js
│   │   ├── json-data
│   │   │   ├── design_get_page_info.json
│   │   │   ├── get_component_list.json
│   │   │   ├── get_component_template_list.json
│   │   │   ├── get_goods_list.json
│   │   │   ├── material_folder.json
│   │   │   └── material_folder_details.json
│   │   └── material.js
│   ├── layout
│   ├── main.js
│   ├── resource // 图片
│   ├── router // 路由
│   ├── store
│   ├── ui-component // 业务组件
│   │   ├── U000001
│   │   ├── U000002
│   │   ├── U000003
│   │   ├── common-config.js
│   │   └── component-unit // 业务组件里面公共的元素
│   └── views // 系统页面
│       ├── home // 列表页
│       └── design // 装修页
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```
