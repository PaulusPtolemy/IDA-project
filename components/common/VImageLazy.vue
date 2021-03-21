<template>
    <div
        :style="[preview ? {backgroundImage: `url(${preview})`} : '']"
        :class="['image-lazy', classes]"
    >
        <template v-if="tag === 'img'">
            <img
                v-if="preloaded"
                class="image-preloaded__image"
                :src="image"
                alt="image"
            >
            <img
                v-else
                v-lazy="image"
                class="image-lazy__image"
                alt="image"
            >
        </template>
        <template v-else>
            <div
                v-if="isSwiperSlider"
                :data-background="image"
                class="image-lazy__image swiper-lazy"
            />
            <div
                v-else
                v-lazy:background-image="image"
                class="image-lazy__image"
            />
        </template>
    </div>
</template>

<script>

export default {
    name: 'VImageLazy',

    props: {
        preview: {
            type: String,
            default: '',
        },
        image: {
            type: String,
            default: '',
        },

        preloaded: {
            type: Boolean,
            default: false,
        },

        relative: {
            type: Boolean,
            default: false,
        },
        absolute: {
            type: Boolean,
            default: false,
        },
        contain: {
            type: Boolean,
            default: false,
        },

        tag: {
            type: String,
            default: 'div',
            validator(val) {
                return ['div', 'img'].includes(val)
            },
        },

        isSwiperSlider: Boolean,
    },

    computed: {
        classes() {
            return {
                'is-relative': this.relative,
                'is-absolute': this.absolute,
                'is-contain': this.contain,
            }
        },
    },

    mounted() {
        if (this.preloaded) {
            const link = document.createElement('link')
            link.setAttribute('rel', 'preload')
            link.setAttribute('as', 'image')
            link.setAttribute('href', this.image)
            document.head.appendChild(link)
        }
    },
}
</script>

<style lang="scss">

.image-lazy {
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    &__image {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        background-color: rgba($base-0, 0.3);
        transform: translate3d(0, 0, 0);
        will-change: transform;
        opacity: 0;
        transition: opacity 0.3s ease 0.1s;

        &[lazy="loaded"] {
            opacity: 1;
        }
    }

    .preloaded_img {
        width: 88px;
        height: 88px;

        & > img {
            display: block;
            position: relative;
            height: 100%;
            width: 100%;
        }
    }

    &.ListItem {
        .image-lazy__image {
            border-radius: 24px;
        }
    }

    &.is-relative {
        position: relative;
    }

    &.is-absolute {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    &.is-contain {
        background-size: contain;

        .image-lazy__image {
            background-size: contain;
        }
    }
}

.image-preloaded__image {
    width: 100%;
    height: 100%;
}
</style>
