<template>
    <div>
        <div
            v-if="mode === 'dark'"
            :class="$style.picker"
            @click="changeMode('light')"
        >
            <IconLight />
            <span :class="$style.color__descr">
                Day mode
            </span>
        </div>
        <div
            v-if="mode === 'light'"
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
    import { defineComponent, computed, onMounted } from '@nuxtjs/composition-api'
    import { getColor, setColor } from '~/composable/store/colorMode'

    export default defineComponent({
        name: 'TheColorModePicker',
        components: {
            IconDark: () => import('assets/svg/dark.svg?inline'),
            IconLight: () => import('assets/svg/light.svg?inline'),
        },

        setup() {
            const mode = computed(() => getColor.value)

            const changeMode = color => {
                setColor(color)
            }

            onMounted(() => {
                const isLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
                if (isLight) {
                    changeMode('light')
                }
            })

            return {
                changeMode,
                mode,
            }
        },
    })

</script>

<style lang="scss" module>
    @import "assets/scss/theme";

    .picker {
        display: flex;
        align-items: center;
        width: 110px;
        cursor: pointer;

        span {
            white-space: nowrap;
            transition: color ease-in-out 300ms;
            margin-left: auto;
        }

        svg {
            flex-shrink: 0;
            margin-right: 4px;
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
