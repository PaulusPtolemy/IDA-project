<template>
    <div>
        <div
            v-if="Mode === 'dark'"
            :class="$style.picker"
            @click="changeMode('light')"
        >
            <IconLight />
            <span :class="$style.color__descr">
                Day mode
            </span>
        </div>
        <div
            v-if="Mode === 'light'"
            :class="$style.picker"
            @click="changeMode('dark')"
        >
            <IconDark />
            <span :class="$style.color__descr">
                Night mode
            </span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'TheColorModePicker',

    components: {
        IconDark: () => import('assets/svg/dark.svg?inline'),
        IconLight: () => import('assets/svg/light.svg?inline'),
    },

    computed: {
        ...mapState({
            Mode: state => state.modeColor,
        }),
    },

    mounted () {
        const pref = this.$colorMode.preference
        if (pref) {
            this.sendMode(this.$colorMode.value)
        } else {
            this.sendMode('light')
        }
    },

    methods: {
        changeMode (name) {
            this.sendMode(name)
            this.$colorMode.value = this.Mode
        },

        sendMode (data) {
            this.$store.dispatch('ACT_COLOR_MODE', data)
        },
    },
}
</script>

<style lang="scss" module>
    @import "assets/scss/theme";

    .picker {
        display: flex;
        align-items: center;
        width: 110px;
        cursor: pointer;

        span {
            transition: color ease-in-out 300ms;
            margin-left: auto;
        }

        &:hover {
            span {
                transition: color ease-in-out 300ms;
                color: $main-400;
            }

            svg {
                path {
                    fill: $main-400;
                }
            }
        }

        @include brp(ml) {
            width: auto;

            span {
                display: none;
            }
        }

        @include brp(xs) {
            svg {
                width: 20px;
                height: 20px;
            }
        }
    }
</style>
