<template>
    <div :class="[$style.color__bg_primary ,$style.item]">
        <div :class="[$style.img_wrap, $style.color__bg_secondary]">
            <VImageLazy
                :class="$style.img"
                :image="itemData.preview"
            />
        </div>
        <div :class="$style.right">
            <p :class="[$style.color__title, $style.title ]">
                {{ itemData.name }}
            </p>
            <p :class="[$style.color__descr, $style.descr]">
                {{ itemData.description }}
            </p>
            <p :class="[$style.color__price, $style.price]">
                {{ itemData.rent }} $/h
            </p>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'TheListItem',

        props: {
            itemData: {
                type: Object,
                default() {
                    return {
                        preview: '~/assets/img/logo.png',
                        name: 'Test User',
                        description: 'Test description',
                        rent: '100',
                    }
                },
            },
        },
    }
</script>

<style lang="scss" module>
    @import "assets/scss/theme";

    .item {
        padding: 24px 32px 24px;
        display: flex;
        height: 100%;
        border-radius: $border-r-huge;
    }

    .img {
        & > div {
            border-radius: $border-r-tiny;
        }

        &_wrap {
            position: relative;
            width: 88px;
            height: 88px;
            margin-right: 24px;
            flex-shrink: 0;
            border-radius: $border-r-medium;
            z-index: $z-index-img-wrap;
        }

        .image-lazy__image {
            border-radius: 24px;
        }
    }

    .right {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .title {
        font-weight: $fontWeightBold;
        margin-bottom: 12px;
    }

    .descr {
        font-size: $fontSizeSmall;
        margin-bottom: 16px;
    }

    .price {
        font-weight: $fontWeightBold;
        font-size: $fontSizeSmaller;
    }

    @include brp(ml) {
        .item {
            padding: 16px 22px;
        }
    }
</style>
