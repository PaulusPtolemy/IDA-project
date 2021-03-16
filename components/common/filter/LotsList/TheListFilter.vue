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

<script lang="ts">
    import { defineComponent, computed } from '@nuxtjs/composition-api'
    import { debounce } from 'assets/js/utils/common'

    export default defineComponent({
        name: 'TheListFilter',
        components: {
            TheListFilterInput: () => import('@/components/common/filter/LotsList/TheListFilterInput.vue'),
            TheListFilterTabs: () => import('@/components/common/filter/LotsList/TheListFilterTabs.vue'),
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

        setup(props, { emit }) {
            const formatExpand = computed(() => props.expand.toLowerCase())

            const allowInput = computed(() => {
                return formatExpand.value === 'rent' || formatExpand.value === 'name'
            })

            const allowTabs = computed(() => formatExpand.value === 'type')

            const valueField = computed(() => props.values[formatExpand.value])

            const inputChange = debounce((e: Event) => {
                const target = e.target as HTMLInputElement
                const val = target.value === '0' ? '' : target.value
                const data = {
                    [formatExpand.value]: val,
                }
                emit('change', data)
            }, 1000)

            return {
                allowInput,
                allowTabs,
                formatExpand,
                valueField,
                inputChange,
            }
        },
    })

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
