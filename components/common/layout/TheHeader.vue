<template>
    <header :class="$style.header">
        <nuxt-link
            to="/"
            :class="$style.logo"
        >
            <IconLogo
                id="logo_icon"
                :class="[$style.logo_icon, $style.color_logo]"
            />
            <span :class="[$style.logo_title, $style.color__title]">
                Pepelane
            </span>
        </nuxt-link>

        <div :class="[$style.color__descr, $style.descr]">
            World's first affordable airsharing
        </div>

        <div :class="$style.right_float">
            <ColorModePicker />

            <IconMessage :class="$style.message" />

            <IconNotification :class="$style.notification" />

            <div :class="[$style.user_name, $style.color__title]">
                {{ user.name }}
            </div>

            <img
                :class="$style.user_avatar"
                :src="user.avatar"
                alt="user avatar"
            >
        </div>
    </header>
</template>

<script lang="ts">
    import { defineComponent } from '@nuxtjs/composition-api'

    import { getUser } from '~/composable/store/user'

    import ColorModePicker from '~/components/common/ui/TheColorModePicker.vue'

    export default defineComponent({
        name: 'TheHeader',
        components: {
            IconLogo: () => import('assets/svg/Logo.svg?inline'),
            IconMessage: () => import('assets/svg/message.svg?inline'),
            IconNotification: () => import('assets/svg/notification.svg?inline'),
            ColorModePicker,
        },

        setup() {
            const user = getUser

            return {
                user,
            }
        },
    })
</script>

<style lang="scss" module>
    @import "assets/scss/theme";

    .slogan {
        font-size: $fontSizeBase;
    }

    .header {
        @include content-wrap;

        display: flex;
        align-items: center;
        padding: 48px 0 40px 0;
        background-color: transparent;
    }

    .logo {
        margin-right: 65px;
        display: flex;
        align-items: center;

        &_title {
            font-size: $fontSizeBig;
            margin-left: 18px;
            font-weight: $fontWeightBold;
        }
    }

    .right_float {
        margin-left: auto;
        display: flex;
        align-items: center;
    }

    .message {
        margin-left: 108px;
        cursor: pointer;
    }

    .notification {
        margin-left: 30px;
        cursor: pointer;
    }

    .user {
        &_name {
            margin-left: 52px;
            color: $base-500;
            font-size: $fontSizeBase;
            font-weight: $fontWeightBold;
            line-height: $line-h-grand;
        }

        &_avatar {
            height: 56px;
            width: 56px;
            margin-left: 20px;
            border-radius: 50%;
        }
    }

    @include brp(xl) {
        .header {
            padding: 12px 16px;
            margin-bottom: 8px;
        }

        .message {
            margin-left: 30px;
        }
    }

    @include brp(md) {
        .descr {
            display: none;
        }
    }

    @include brp(sm) {
        .user {
            &_name {
                display: none;
            }
        }
    }

    @include brp(xs) {
        .user {
            &_avatar {
                width: 32px;
                height: 32px;
            }
        }

        .message,
        .notification {
            margin-left: 20px;
            width: 20px;
            height: 20px;
        }

        .logo {
            margin-right: auto;

            &_title {
                margin-left: 2px;
                font-size: $fontSizeMedium;
            }

            svg {
                width: 32px;
                height: 32px;
            }
        }
    }
</style>
