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
const styles = {};

export const config = commonConfig.merge({
    datas,
    styles,
    layout: [
        template1
    ]
});
