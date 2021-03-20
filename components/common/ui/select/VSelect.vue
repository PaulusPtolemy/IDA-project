<template>
    <div v-clickoutside="onClickOutside"
         :class="classes"
         class="v-select">

        <div class="v-select__field"
             tabindex="0"
             @click.stop="toggleMenu"
             @focus="onFocus"
             @keydown.down.stop.prevent="navigateOptions('down')"
             @keydown.up.stop.prevent="navigateOptions('up')"
             @keydown.enter.prevent="onEnterPress"
             @keydown.esc="isOpened = false"
             @keydown.tab="onBlur"
             @mouseenter="inputHovering = true"
             @mouseleave="inputHovering = false">

            <div class="v-select__field-content">
                <div v-if="label"
                     class="v-select__label">
                    {{ label }}
                    <span v-if="required"
                          class="v-select__required">
                        *
                    </span>
                </div>

                <div class="v-select__value" v-html="valueStr" />

                <svg v-if="size === 'large'"
                     class="v-select__arrow"
                     viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 7.99953L0 1.99953L2.00094 0L6 4.00047L9.99906 0L12 1.99953L6 7.99953Z" />
                </svg>
                <svg v-else
                     class="v-select__arrow"
                     viewBox="0 0 12 8"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M.471 1.121a.75.75 0 011.06 0l4.122 4.121 4.121-4.121a.75.75 0 011.06 1.06L5.654 7.364.471 2.182a.75.75 0 010-1.061z" />
                </svg>
            </div>
        </div>

        <transition name="select-menu">
            <VScrollBox v-if="isOpened"
                        :resizable="hideSelected || hideDisabled"
                        is-absolute
                        class="v-select__dropdown">
                <p v-if="menuLabel"
                   class="v-select__menu-label">
                    {{ menuLabel }}
                </p>
                <template v-if="groupView">
                    <VSelectGroupOption v-for="(group, i) in groupList"
                                        :key="i"
                                        :group="group"
                                        :hide-disabled="hideDisabled"
                                        :is-clickable-label="multiple"
                                        :track-by="trackBy"
                                        @group-label-click="onGroupLabelClick">
                        <VSelectOption
                            v-for="option in group.options"
                            :key="option[trackBy]"
                            :option="option"
                            :value="value"
                            :is-highlighted="highlightIndex === option[trackBy]"
                            :hide-disabled="hideDisabled"
                            :prefix="prefix"
                            :track-by="trackBy"
                            :label-key="labelKey"
                            @mouseenter="highlightIndex = option[trackBy]"
                            @mouseleave="highlightIndex = -1 "
                            @click="onOptionClick"
                        />
                    </VSelectGroupOption>
                </template>
                <template v-else>
                    <VSelectOption
                        v-for="(option, index) in optionList"
                        :key="option[trackBy]"
                        :option="option"
                        :value="value"
                        :is-highlighted="highlightIndex === index"
                        :prefix="prefix"
                        :track-by="trackBy"
                        :label-key="labelKey"
                        @mouseenter="highlightIndex = index"
                        @mouseleave="highlightIndex = -1 "
                        @click="onOptionClick"
                    />
                </template>
            </VScrollBox>
        </transition>
        <template v-if="groupView">
            <select v-model="lazyValue"
                    class="v-select__native"
                    :disabled="isDisabled"
                    :name="name"
                    :multiple="multiple"
                    @change="onNativeChange">
                <optgroup v-for="(group, i) in groupList"
                          :key="i"
                          :label="group.label">
                    <option v-for="option in group.options"
                            :key="option[trackBy]"
                            :value="option[trackBy]"
                            :disabled="option.disabled">
                        {{
                        prefix && option[trackBy] !== '' ? `${prefix} ${option[labelKey]}` :
                        option[labelKey]
                        }}
                    </option>
                </optgroup>
            </select>
        </template>
        <template v-else>
            <select v-model="lazyValue"
                    class="v-select__native"
                    :disabled="isDisabled"
                    :name="name"
                    :multiple="multiple"
                    @change="onNativeChange">
                <option v-for="option in nativeOptions"
                        :key="option[trackBy]"
                        :value="option[trackBy]"
                        :disabled="option.disabled">
                    {{ prefix ? `${prefix} ${option[labelKey]}` : option[labelKey] }}
                </option>
            </select>
        </template>
    </div>
</template>

<script type="text/babel">
    import { union, difference } from 'lodash'
    import { hasAll } from 'assets/js/utils/common'

    /* components */
    import VScrollBox from '../scrollbox/VScrollBox'
    import VSelectOption from './VSelectOption'
    import VSelectGroupOption from './VSelectGroupOption'

    export default {
        name: 'VSelect',

        components: {
            VSelectGroupOption,
            VScrollBox,
            VSelectOption,
        },

        props: {
            trackBy: {
                type: String,
                default: 'value',
            },

            labelKey: {
                type: String,
                default: 'label',
            },
            /**
             * Определяет классы, которые будут модифицировать размер
             */
            size: {
                type: String,
                default: 'medium',
                validator(value) {
                    return ['large', 'medium', 'small'].includes(value)
                },
            },
            /**
             * Определяет классы, которые будут модифицировать цвет
             */
            color: {
                type: String,
                default: 'default',
            },
            /**
             * Имя поля формы
             */
            name: String,
            /**
             * @param {String} Текущее значение.
             */
            value: [String, Number, Array],
            options: {
                type: Array,
                default: () => [],
            },
            label: String,
            placeholder: String,
            disabled: {
                type: Boolean,
                default: false,
            },

            bordered: {
                type: Boolean,
                default: false,
            },

            hideSelected: {
                type: Boolean,
                default: false,
            },

            hideDisabled: {
                type: Boolean,
                default: false,
            },

            groupView: {
                type: Boolean,
                default: false,
            },

            groupKey: {
                type: String,
                default: 'options',
            },

            groupLabelKey: {
                type: String,
                default: 'label',
            },

            prefix: {
                type: String,
                default: '',
            },

            multiple: {
                type: Boolean,
                default: false,
            },

            required: Boolean,

            menuLabel: {
                type: String,
                default: '',
            },
        },

        data() {
            return {
                lazyValue: '',
                isFocused: false,
                isOpened: false,
                highlightIndex: -1,
            }
        },

        computed: {
            classes() {
                return [
                    `v-select--${this.color}`,
                    `v-select--${this.size}`,
                    {
                        'has-placeholder': this.placeholder,
                        'has-label': this.label,
                        'is-focused': this.isFocused,
                        'is-active': this.isActive,
                        'is-opened': this.isOpened,
                        'is-bordered': this.bordered,
                        'is-disabled': this.isDisabled,
                    },
                ]
            },

            groupList() {
                const options = []

                this.options.forEach(group => {
                    const gr = {
                        label: group[this.groupLabelKey],
                        options: [],
                    }
                    group[this.groupKey].forEach(opt => gr.options.push(opt))
                    options.push(gr)
                })

                return options
            },

            groupOptionList() {
                const options = []

                this.options.forEach(group => {
                    group[[this.groupKey]].forEach(opt => options.push(opt))
                })

                return options
            },

            optionList() {
                if (!this.hideSelected) {
                    return this.options
                } else {
                    return this.options.filter(opt => {
                        if (Array.isArray(this.lazyValue)) {
                            return this.lazyValue.length
                                ? !this.lazyValue.includes(opt[this.trackBy])
                                : opt[this.trackBy] !== ''
                        } else {
                            return opt[this.trackBy] !== this.lazyValue
                        }
                    })
                }
            },

            nativeOptions() {
                return this.multiple
                    ? this.options.filter(opt => opt[this.trackBy] !== '')
                    : this.options
            },

            selectedOptions() {
                if (this.groupView) {
                    return this.groupOptionList.filter(opt => {
                        if (Array.isArray(this.lazyValue)) {
                            return this.lazyValue.length
                                ? this.lazyValue.includes(opt[this.trackBy])
                                : opt[this.trackBy] === ''
                        } else {
                            return this.lazyValue === opt[this.trackBy]
                        }
                    })
                } else {
                    return this.options.filter(opt => {
                        if (Array.isArray(this.lazyValue)) {
                            return this.lazyValue.length
                                ? this.lazyValue.includes(opt[this.trackBy])
                                : opt[this.trackBy] === ''
                        } else {
                            return this.lazyValue === opt[this.trackBy]
                        }
                    })
                }
            },

            isActive() {
                let flag = false
                if (Array.isArray(this.lazyValue)) {
                    if (this.lazyValue.length) { flag = true }
                } else if (this.lazyValue !== '') { flag = true }

                return flag
            },

            valueStr() {
                if (!this.selectedOptions.length) {
                    if (this.placeholder) {
                        return this.placeholder
                    } else if (this.label) {
                        return this.label
                    } else {
                        return ''
                    }
                } else {
                    const reducer = (acc, opt) => {
                        const name = opt.displayName ? opt.displayName : opt[this.labelKey]
                        return `${acc + name}, `
                    }

                    return this.selectedOptions.reduce(reducer, '').slice(0, -2)
                }
            },

            isDisabled() {
                return this.disabled || this.options.length === 0
            },
        },

        watch: {
            value(val) {
                if (this.multiple) {
                    if (Array.isArray(val) && val !== this.lazyValue) {
                        this.lazyValue = val
                        this.$emit('change', val)
                    }
                } else if (val !== this.lazyValue) {
                        this.lazyValue = val
                        this.$emit('change', val)
                    }
            },

            isOpened(val) {
                this.$emit('is-opened', val)
            },
        },

        created() {
            if (this.value || this.value === 0) {
                this.lazyValue = this.value
            } else if (this.multiple) { this.lazyValue = [] }
        },

        methods: {
            navigateOptions(direction) {
                if (!this.isOpened) {
                    this.isOpened = true
                    return
                }

                // if (this.options.length === 0 || this.filteredOptionsCount === 0) return;
                // if (!this.optionsAllDisabled) {
                if (direction === 'down') {
                    this.highlightIndex++
                    if (this.highlightIndex === this.optionList.length) {
                        this.highlightIndex = 0
                    }
                } else if (direction === 'up') {
                    this.highlightIndex--
                    if (this.highlightIndex < 0) {
                        this.highlightIndex = this.optionList.length - 1
                    }
                }
                const option = this.optionList[this.highlightIndex]
                if (option.disabled) {
                    this.navigateOptions(direction)
                }
                // }
            },

            toggleMenu() {
                if (this.isDisabled) { return }
                this.isOpened = !this.isOpened
                this.highlightIndex = -1
            },

            onEnterPress() {
                if (!this.isOpened) {
                    this.toggleMenu()
                } else {
                    const option = this.optionList[this.highlightIndex]
                    if (option && Object.prototype.hasOwnProperty.call(option, 'value')) {
                        this.onOptionClick(option[this.trackBy])
                    }
                }
            },

            onGroupLabelClick(values) {
                const newValue = this.lazyValue.slice()
                if (hasAll(newValue, values)) {
                    this.$emit('input', difference(newValue, values))
                } else {
                    this.$emit('input', union(newValue, values))
                }
            },

            onOptionClick(value) {
                if (this.value !== undefined) {
                    if (Array.isArray(this.lazyValue)) {
                        if (value === '') {
                            this.$emit('input', [])
                        } else {
                            const newValue = this.lazyValue.slice()
                            newValue.includes(value)
                                ? newValue.splice(this.lazyValue.indexOf(value), 1)
                                : newValue.push(value)
                            this.$emit('input', newValue)
                        }
                    } else {
                        if (this.lazyValue !== value) {
                            this.$emit('input', value)
                        }
                        this.isOpened = false
                    }
                } else {
                    if (Array.isArray(this.lazyValue)) {
                        if (value === '') {
                            this.lazyValue = []
                        } else {
                            const newValue = this.lazyValue.slice()
                            newValue.includes(value)
                                ? newValue.splice(this.lazyValue.indexOf(value), 1)
                                : newValue.push(value)
                            this.lazyValue = newValue
                        }
                    } else {
                        if (this.lazyValue !== value) {
                            this.lazyValue = value
                        }
                        this.isOpened = false
                    }
                    this.$emit('change', this.lazyValue)
                }
            },

            /**
             * Метод, который обрабатывает собите focus
             */
            onFocus() {
                this.isFocused = true
                this.$emit('focus')
            },

            /**
             * Метод, который обрабатывает собите blur
             */
            onBlur() {
                if (this.isOpened) { this.isOpened = false }
                this.isFocused = false
                this.$emit('blur')
            },

            onClickOutside() {
                if (!this.isFocused) { return }
                this.isOpened = false
                this.isFocused = false
                this.$emit('blur')
            },

            onNativeChange(e) {
                if (this.value !== undefined) {
                    this.$nextTick(() => {
                        const newValue = this.lazyValue
                        this.lazyValue = this.value
                        this.$emit('input', newValue)
                    })
                } else {
                    this.$emit('change', this.lazyValue)
                }
            },
        },
    }
</script>

<style lang="scss">
    .v-select {
        position: relative;
        display: inline-block;
        height: 100%;

        /* Colors */
        &--default {
            .v-select__value {
                color: $base-200;
            }

            .v-select__field-content {
                color: $base-0;
            }
        }

        &--blue {
            .v-select__value {
                color: $main-500;
            }

            .v-select__field-content {
                color: $main-500;
            }
        }

        /* End Colors */

        /* Sizes */
        &--large {
            top: 1px;

            .v-select__value {
                font-size: 36px;
                font-weight: bold;

                @include brp(xs) {
                    font-size: 24px;
                    line-height: 1.33;
                }
            }

            .v-select__arrow {
                width: 12px;
                height: 8px;
                right: -2px;
                top: 56%;
            }

            .v-select__dropdown {
                min-width: 27.4rem;
                text-align: center;
                border: none;
                border-radius: 12px;
                box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
            }

            .v-scrollbox__content {
                padding: 3rem 0;
            }

            .v-select-option {
                padding: 0.5rem 0 0;
                font-size: 1.6rem;
                line-height: 2.8rem;

                &.is-highlighted {
                    background: none;
                }
            }
        }

        &--medium {
            .v-select__value {
                font-size: 16px;
            }

            .v-select__arrow {
                width: 12px;
                height: 8px;
            }
        }

        &--small {
            .v-select__arrow {
                width: 1rem;
                height: 0.6rem;
            }
        }

        /* End Sizes */

        &.is-active,
        &.has-placeholder {
            .v-select__label {
                transform: translateY(-2.4rem) scale(0.8);
            }

            &.is-bordered {
                .v-select__label {
                    transform: translateY(-3.2rem) scale(0.8);

                    @include brp(xs) {
                        transform: translateY(-30px) scale(0.8);
                    }
                }
            }
        }

        &.has-label {
            padding-top: 2rem;

            &:not(.is-active):not(.has-placeholder) {
                .v-select__value {
                    opacity: 0;
                }
            }

            &.is-bordered {
                padding-top: 0;
            }
        }

        //&.is-focused {
        //    .v-select__field:after {
        //        transform: scale(1);
        //    }
        //}

        &.is-opened {
            .v-select__arrow {
                transform: translateY(-50%) rotate(180deg);
            }
        }

        &.is-disabled {
            .v-select__field {
                opacity: 0.3;
                pointer-events: none;
            }
        }

        &.is-bordered {
            .v-select__field {
                width: 100%;
                padding: 1.8rem 2rem;
                border: 1px solid;
                border-color: $base-0;
                border-radius: 0.4rem;
                transition: border-color $base-300;

                @include brp(xs) {
                    padding: 13px 30px 13px 14px;
                }
            }

            .v-select__label {
                left: -0.4rem;
                padding: 0 0.4rem;
                background-color: $main-800;
                color: $main-100;
                transition: color $anim;

                @include brp(xs) {
                    top: 2px;
                    font-size: 14px;
                }
            }

            .v-select__value {
                @include brp(xs) {
                    font-size: 14px;
                }
            }

            &.is-opened {
                .v-select__field {
                    border-color: $main-100;
                }

                .v-select__label {
                    color: $main-100;
                }
            }
        }

        &__field {
            height: 100%;
            outline: none;
            cursor: pointer;
        }

        &__field-content {
            position: relative;
            display: flex;
            align-items: center;
            height: 100%;
        }

        &__value {
            padding-right: 2rem;
            line-height: 1.43;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            user-select: none;
        }

        &__label {
            position: absolute;
            top: 0;
            left: 0;
            white-space: nowrap;
            transform-origin: left center;
            transition: transform 0.3s ease-in-out;
        }

        &__arrow {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%) rotate(0);
            transition: transform 0.2s ease;
            pointer-events: none;
            fill: currentColor;
        }

        &__dropdown {
            position: absolute;
            top: calc(100% + 12px);
            left: 0;
            z-index: 3;
            width: 100%;
            max-height: 35.6rem;
            background-color: #fff;
            opacity: 1;
            transform: translateY(0);
            border: 1px solid $main-100;
            box-sizing: border-box;
            border-radius: 4px;
            box-shadow: 0 0 1px rgba(38, 46, 50, 0.06), 0 2px 6px rgba(38, 46, 50, 0.08), 0 4px 16px rgba(38, 46, 50, 0.12);

            &.select-menu-enter-active {
                transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
            }

            &.select-menu-leave-active {
                transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
            }

            &.select-menu-enter,
            &.select-menu-leave-active {
                opacity: 0;
                transform: translateY(16px);
            }

            .v-scrollbox__content {
                //padding: 1.2rem;
            }
        }

        &__native {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            display: none;
            opacity: 0;
            width: 100%;
            height: 100%;

            @include brp(xs) {
                display: block;
            }
        }

        &__required {
            color: $secondary-700;
        }

        &__menu-label {
            font-size: 1.6rem;
            font-weight: bold;
            color: $base-900;
            margin-bottom: 0.5rem;
        }
    }
</style>
