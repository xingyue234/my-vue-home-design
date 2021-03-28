<template>
    <div class="component-wrapper U0000005-template">
        <div class="search-container" :style="{'background-color': styles.bg_color}">
            <div class="search-container_inner">
                <a-icon class="search0-icons" type="search" />
                <span>{{datas.text}}</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['styles', 'datas'],

    data () {
        return {
        }
    },

    computed: {

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
    max-width: 100%;
    .search-container{
            padding: 0 15/37.5rem;
            margin: 0;
            display: flex;
            align-items: center;
            height: 50/37.5rem;
            box-sizing: border-box;
            .search-container_inner{
                height: 35/37.5rem;
                width: 100%;
                padding: 0 10/37.5rem;
                background-color: #f7f7f7;
                border-radius: 35px;
                display: flex;
                align-items: center;
            }
            .search0-icons{
                font-size: 16px;
            }
            span{
                margin-left: 5px;
                font-size: 13px;
                color: #666;
            }
    }
}
</style>
