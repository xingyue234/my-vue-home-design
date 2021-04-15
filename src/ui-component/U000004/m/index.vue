<template>
    <div :class="['component-wrapper', ('component-' + id)]">

		<!-- style -->
		<div v-html="css"></div>

        <ul class="item-wrapper">
            <li class="item-list" :style="{
                'width': 100/datas.columns + '%'
                }"
                v-for="(item, index) in datas.columns" 
                :key="index">
                <template v-if="!datas.images[index]">
					<img :src="defaultUrl" alt="">
                </template>
                <template v-else>
                    <img :src="datas.images[index].image" alt="">
                </template>
            </li>
        </ul>
    </div>
</template>

<script>
import defaultUrl from '@/resource/images/default-banner.png';

// 自定义样式
const css = function () {
    const {
        margin_top,
        margin_bottom,
		padding_top,
		padding_bottom,
		bg_color_inner,
		bg_radius,
		bg_image_inner,
		image_padding
    } = this.styles;

    return `
		.component-${this.id}  .item-wrapper{
			margin-top: ${this.px2rem(margin_top)};
			margin-bottom: ${this.px2rem(margin_bottom)};
			padding-top: ${this.px2rem(padding_top)};
			padding-bottom: ${this.px2rem(padding_bottom)};
			background-color: ${bg_color_inner || '#ffffff'};
			border-radius: ${this.px2rem(bg_radius)};
			padding-left: ${this.px2rem(image_padding / 2)};
			padding-right: ${this.px2rem(image_padding / 2)};
			background-image: url(${bg_image_inner});
		}
		.component-${this.id} .item-list{
			padding: 0 ${this.px2rem(image_padding / 2)};
		}
    `;
};

export default {
    props: ['styles', 'datas', 'id'],

    data () {
        return {
			defaultUrl
        }
    },
	computed: {
		css () {
		    return '<style>' + css.call(this) + '</style>';
		},
	},

    methods: {
		// rem转换
		px2rem (val = 0) {
		    return (val / 75) + 'rem';
		}
    },

    mounted () {
        this.$emit('loaded');
    }
};
</script>

<style lang="less" scoped>
.component-wrapper {
    display: block;
    width: 100%;
    .item-wrapper{
		background-repeat: no-repeat;
		background-position: left top; 
		background-size: 100% 100%; 
        display: flex;
        align-items: center;
		margin-left: 12/37.5rem;
		margin-right: 12/37.5rem;
		justify-content: space-between;
        .item-list{
            list-style: none;
            flex: 0 0 auto;
            text-align: center;
            font-size: 14px;
            color: #fff;
            img{
				width: 100%;
            }
        }
    }
}
</style>
