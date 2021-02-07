<template>
    <li :class="$style.UiTab">
        <button class="btn-reset"
                :class="[$style.item, classList]"
                type="button"
                @click.prevent="$emit('click')">
        <span>
            <slot></slot>
        </span>
        </button>
    </li>
</template>

<script>
    export default {
        name: 'UiTab',

        props: {
            active: {
                type: Boolean,
                default: false,
            },

            disabled: {
                type: Boolean,
                default: false,
            },

            bordered: {
                type: Boolean,
                default: false,
            },

            switch: {
                type: Boolean,
                default: false,
            },
        },

        computed: {
            classList () {
                return [
                    [this.$style[`_${this.$parent.color}`]],
                    [this.$style[`_${this.$parent.size}`]],
                    {
                        [this.$style._active]: this.active,
                        [this.$style._disabled]: this.disabled,
                        [this.$style._switch]: this.switch,
                    },
                ]
            },
        },
    }
</script>

<style lang="scss" module>
    .UiTab {
        flex-shrink: 0;
        flex-grow: 1;
        white-space: nowrap;

        &:last-of-type {
            .item {
                border-right: none;
            }
        }
    }

    .item {
        display: flex;
        width: 100%;
        text-align: center;
        justify-content: center;
        padding: 1.8rem 3rem;
        border-right: 1px solid $base-0;
        line-height: 2rem;
        font-weight: 500;
        color: $base-0;
        transition: opacity $anim, border-color $anim;
        cursor: pointer;

        @include brp(xs) {
            padding: 16px 14px;
            font-size: 12px;
            line-height: 1.33;
        }

        &:hover {
            opacity: 0.8;
        }

        /* colors */

        &._default {
            border-right: 1px solid $base-0;

            &._active {
                background-color: $base-0;

                span {
                    color: $main-500;
                }
            }
        }

        &._black {
            border: 0.1rem solid transparent;
            border-radius: 0.4rem;
            color: $base-900;

            &:last-of-type {
                border-right: 0.1rem solid transparent;
            }

            &._active {
                border: 0.1rem solid $base-900;
            }
        }

        /* end colors */

        &._disabled {
            pointer-events: none;
            opacity: 0.3;
        }

        /* size */
        &._medium {
            padding: 1.8rem 3rem;

            @include brp(xs) {
                padding: 16px 14px;
            }
        }

        &._small {
            padding: 1.8rem 2.4rem;

            @include brp(xs) {
                padding: 11px 16px;
            }
        }

        &._smallest {
            padding: 1.8rem 2.4rem;

            @include brp(xs) {
                padding: 16px 16px;
            }
        }

        /* endsize */

        &._switch {
            display: flex;
            justify-content: center;
            width: 100%;
        }
    }
</style>
