<template>
    <div :class="$style.TheListFilter">

        <VSelect
            :class="[$style.select_type, $style.color__bg_primary]"
            color="pink"
            :options="options.types"
            :value="values.type"
            @input="$emit('change', { type: $event })"
        />

        <TheListFilterInput
            v-if="allowInput"
            :class="$style.input"
            :type="formatExpand === 'rent' ? 'number' : 'text'"
            :value="valueField"
            @input-change="inputChange"
        />

        <TheListFilterTabs
            v-if="allowTabs"
            :class="$style.tabs"
            :options="options"
            :values="values"
            @change="$emit('change', $event)"
        />

    </div>
</template>

<script>
    import { debounce } from 'assets/js/utils/common'

    export default {
        name: 'TheListFilter',

        components: {
            TheListFilterInput: () => import('@/components/common/filter/LotsList/TheListFilterInput'),
            TheListFilterTabs: () => import('@/components/common/filter/LotsList/TheListFilterTabs'),
        },

        props: {
            options: {
                type: Object,
                default: () => ({}),
            },

            values: {
                type: Object,
                default: () => ({}),
            },

            expand: {
                type: String,
                default: '',
            },
        },

        computed: {
            allowInput() {
                return this.formatExpand === 'rent' || this.formatExpand === 'name'
            },

            allowTabs() {
                return this.formatExpand === 'type'
            },

            formatExpand() {
                return this.expand.toLowerCase()
            },

            valueField() {
                return this.values[this.formatExpand]
            },
        },

        methods: {

            inputChange: debounce(function(e) {
                const val = e.target.value === '0' ? '' : e.target.value
                const data = {
                    [this.formatExpand]: val,
                }
                this.$emit('change', data)
            }, 1000),
        },
    }
</script>

<style lang="scss" module>
    @import "assets/scss/theme";

    .TheListFilter {
        display: flex;
        flex-wrap: wrap;
        padding-right: 170px;

        @include brp(sm) {
            overflow-x: scroll;
        }

        @media (max-width: 600px) {
            padding-right: 0;
        }
    }

    .select_type {
        height: 50px;
        width: 250px;
        padding: 0 10px;
        margin-right: 16px;
        margin-bottom: 16px;

        @include brp(xm) {
            height: 40px;
            width: 200px;
        }
    }

    .tabs {
        @include brp(xm) {
            display: inline-block;
            width: 500px;
            overflow-x: scroll;
        }
    }

    .input {
        height: 50px;
        width: 400px;
        font-size: 20px;

        & > input {
            border-radius: $border-r-mini;
        }
    }

</style>
