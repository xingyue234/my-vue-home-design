// 公共配置项
import commonConfig from '../../../common-config';
// 模版
import template1 from './template1';

// 数据配置
const datas = {
    text: { title: '搜索标题', type: 'text', value: '搜索商品名称，链接'},
};

// 样式配置
const styles = {
    bg_color: { title: '背景颜色', type: 'color', value: '#ffffff', },
};

export const config = commonConfig.merge({
    datas,
    styles,
    layout: [
        template1
    ]
});
