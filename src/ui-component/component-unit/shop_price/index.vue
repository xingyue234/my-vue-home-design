<template>
    <span
        class="my_shop_price my-shop-price bold"
        :data-orgp="value"
        :data-currency="currency"
        :data-original_amount="value">
            <span class="small-txt">￥</span><span class="big-txt">{{ String(value).substring(0, String(value).length - 3) }}</span><span class="small-txt">
                {{String(value).substring(String(value).length - 3)}}
            </span>
    </span>
</template>

<script>
export default {
    name: 'unit-shop-price',
    props: {
        // 价格
        value: {
            default: '0.00',
            required: true
        },
        // 币种，默认USD美元
        currency: {
            default: ''
        },
        // 配置项
        config: {
            type: Object,
            default () {
                return {};
            }
        }
    }
};
</script>

<style scoped>
span .big-txt{
    font-size: inherit;
}
span .small-txt{
    font-size: 12px;
}
span{
    font-family: Arial, Helvetica, sans-serif;
}
span .small-txt:last-child{
    position: relative;
    left: -4px;
}
</style>
