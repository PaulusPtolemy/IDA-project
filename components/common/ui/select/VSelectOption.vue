<template>
    <div class="v-select-option"
         :class="classes"
         @mouseenter="onMouseEnter"
         @mouseleave="onMouseLeave "
         @click="onClick"
         v-html="label">
    </div>
</template>

<script>
    export default {
        name: 'VSelectOption',

        props: {
            option: {
                type: Object,
                required: true,
                default: () => ({
                    value: '%value%',
                    label: '%label%',
                }),
            },

            value: {
                type: [String, Number, Array],
                required: true,
            },

            trackBy: {
                type: String,
                default: 'value',
            },

            labelKey: {
                type: String,
                default: 'label',
            },

            prefix: {
                type: String,
                default: '',
            },
            isHighlighted: Boolean,
            hideDisabled: Boolean,
        },

        computed: {
            classes () {
                return [
                    {
                        'is-highlighted': this.isHighlighted,
                        'is-selected': this.isSelected,
                        'is-disabled': this.option.disabled,
                        'is-hidden': this.hideDisabled && this.option.disabled,
                    },
                ]
            },

            label () {
                return this.prefix && this.option[this.trackBy] !== '' ? `${this.prefix} ${this.option[this.labelKey]}` : this.option[this.labelKey]
            },

            isSelected () {
                if (Array.isArray(this.value)) {
                    if (this.value.length) {
                        return this.value.includes(this.option[this.trackBy])
                    } else {
                        return this.option[this.trackBy] === ''
                    }
                } else {
                    return this.value === this.option[this.trackBy]
                }
            },
        },

        methods: {
            onClick () {
                if (this.option.disabled) { return }
                this.$emit('click', this.option[this.trackBy])
            },

            onMouseEnter () {
                if (this.option.disabled) { return }
                this.$emit('mouseenter')
            },

            onMouseLeave () {
                if (this.option.disabled) { return }
                this.$emit('mouseleave')
            },
        },
    }
</script>

<style lang="scss">
    .v-select-option {
        padding: 1.56rem 2.4rem;
        //margin: 0 -1.2rem;
        cursor: pointer;
        color: $base-900;
        line-height: 1.52;
        user-select: none;
        transition: background-color $anim, color $anim;

        &.is-highlighted {
            background-color: $main-800;
            color: $main-500;
        }

        &.is-selected {
            color: $main-500;
        }

        &.is-hidden {
            display: none;
        }

        &.is-disabled {
            color: rgba($base-900, 0.2);
            cursor: not-allowed;
        }
    }
</style>
