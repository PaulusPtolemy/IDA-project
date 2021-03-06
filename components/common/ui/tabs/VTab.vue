<template>
    <li :class="$style.UiTab">
        <button class="btn-reset"
                :class="[$style.item, classList, cssModules]"
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
        name: 'VTab',

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

            cssModules: {
                type: Array,
                default: () => [],
            },
        },

        computed: {
            classList() {
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
        min-width: 90px;
        white-space: nowrap;

        &:last-of-type {
            .item {
                border-radius: 0 $border-r-mini $border-r-mini 0;

                &::before {
                    content: none;
                }
            }
        }

        &:first-of-type {
            .item {
                border-radius: $border-r-mini 0 0 $border-r-mini;
            }
        }
    }

    .item {
        position: relative;
        display: flex;
        width: 100%;
        text-align: center;
        justify-content: center;
        padding: 1.8rem 3rem;
        border: 1px solid transparent;
        outline: none;
        line-height: 2rem;
        font-weight: 500;
        color: $base-0;
        transition: opacity $anim, border-color $anim;
        cursor: pointer;

        &::before {
            content: '';
            position: absolute;
            display: block;
            height: 40%;
            width: 1px;
            top: 50%;
            right: -1px;
            transform: translateY(-50%);
            background: $base-300;
            opacity: 0.5;
        }

        //&:last-child {
        //    &::before {
        //        content: none;
        //    }
        //}

        @include brp(xs) {
            padding: 16px 14px;
            font-size: 12px;
            line-height: 1.33;
        }

        &:hover {
            opacity: 0.8;
        }

        /* colors */
        &._active {
            outline: none;
            border: 1px solid $main-400;

            &::before {
                content: none;
            }

            span {
                color: $main-400;
            }
        }

        &._default {
            border: 1px solid transparent;
            border-right: 1px solid $base-0;

            &._active {
                background-color: $main-500;

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
                border: 1px solid $main-500;
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
            padding: 9px 24px;

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
