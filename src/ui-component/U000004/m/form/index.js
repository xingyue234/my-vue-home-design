// 公共配置项
import commonConfig from '../../../common-config';
// 模版
import template1 from './template1';

// 数据配置
const datas = {
    columns: { title: '排列方式', type: 'radio', value: 1, 
        options: [
            { label: '1列', value: 1 },
            { label: '2列', value: 2 },
            { label: '3列', value: 3 },
            { label: '4列', value: 4 },
            { label: '5列', value: 5 }
        ] 
    },
    images: { title: '图片配置', type: 'images', value: []}
};

// 样式配置
const styles = {
	image_padding: {
		title: '图片内间距',
		type: 'number',
		value: '10',
		col: 2
	},
	margin_top: {
	    title: '组件外边距-top',
	    type: 'number',
	    value: '0',
	    col: 2
	},
	margin_bottom: {
	    title: '组件外边距-bottom',
	    type: 'number',
	    value: '0',
	    col: 2,
	},
	padding_top: {
	    title: '组件内边距-top',
	    type: 'number',
	    value: '0',
	    col: 2
	},
	padding_bottom: {
	    title: '组件内边距-bottom',
	    type: 'number',
	    value: '0',
	    col: 2,
	},
	bg_radius: {
	    title: '背景圆角',
	    type: 'bar',
	    value: 12,
	    min: 0,
	    max: 100
	},
	bg_color_inner: {
	    title: '橱窗背景色',
	    type: 'color',
	    value: '#ffffff',
	},
	bg_image_inner: {
	    title: '橱窗背景图片',
	    type: 'image',
	    value: ''
	},
};

export const config = {
    datas,
    styles,
    layout: [
        template1
    ]
}
