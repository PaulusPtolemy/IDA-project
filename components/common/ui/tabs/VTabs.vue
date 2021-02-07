<template>
    <ul :class="[$style.UiTabs, classes]">
        <slot></slot>
    </ul>
</template>

<script>
    export default {
        name: 'UiTabs',

        props: {
            color: {
                type: String,
                default: 'default',
            },

            size: {
                type: String,
                default: 'medium',
            },

            bordered: {
                type: Boolean,
                default: true,
            },

            inline: {
                type: Boolean,
                default: true,
            },
        },

        computed: {
            classes () {
                return [
                    [this.$style[`_${this.color}`]],
                    {
                        [this.$style._bordered]: this.bordered,
                        [this.$style._inline]: this.inline,
                    },
                ]
            },
        },
    }
</script>

<style lang="scss" module>
    .UiTabs {
        display: flex;

        &._default {
            &._bordered {
                border: 0.1rem solid $base-0;
                border-radius: 0.4rem;
            }
        }

        &._black {
            color: $base-900;
        }

        &._inline {
            display: inline-flex;

            @include brp(xs) {
                display: flex;
            }
        }
    }
</style>
