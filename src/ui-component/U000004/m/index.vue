<template>
    <div class="component-wrapper U0000004-template">
        <ul class="item-wrapper">
            <li class="item-list" :style="{
                'background-color': randomColor(index),
                'width': 100/datas.columns + '%'
                }"
                v-for="(item, index) in datas.columns" 
                :key="index">
                <template v-if="!datas.images[index]">
                    图片{{ index+1 }}
                </template>
                <template v-else>
                    <img :src="datas.images[index].image" alt="">
                </template>
            </li>
        </ul>
    </div>
</template>

<script>

// 生成随机颜色数组
const getRandomColors = () => {
    const colors = ['#0e778f', '#d8dbca', '#f3cfe1', '#ef8766', '#f8c76a', '#d9b9d7', '#92a624']
    let rdmColors = []
    for (var i = 0; i < 5; i++) {
        let color = colors[Math.floor(Math.random() * colors.length)]
        rdmColors.push(color)
    }
    return rdmColors
}
const rdmColors = getRandomColors()

export default {
    props: ['styles', 'datas'],

    data () {
        return {
        }
    },

    methods: {
        randomColor (index) {
            if (this.datas.images[index]) {
                return ''
            }
            return rdmColors[index]
        },
    },

    mounted () {
        this.$emit('loaded');
    }
};
</script>

<style lang="less" scoped>
.component-wrapper {
    display: block;
    max-width: 100%;
    .item-wrapper{
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        height: 60/37.5rem;
        .item-list{
            list-style: none;
            height: 100%;
            flex: 0 0 auto;
            line-height: 60/37.5rem;
            text-align: center;
            font-size: 14px;
            color: #fff;
            img{
                max-width: 100%;
                max-height: 100%;
            }
        }
    }
}
</style>
