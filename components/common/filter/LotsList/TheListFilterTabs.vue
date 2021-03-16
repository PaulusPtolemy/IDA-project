<template>
    <VTabs
        color="pinky"
        bordered
        size="smallest"
        inline
    >
        <VTab
            v-for="(tab, idx) in options.machineType"
            :key="tab.value"
            switch
            :class="[$style.tab, {[$style._prevTab]: checkPrevTab(tab, idx)}]"
            :css-modules="[
                    $style.color__bg_primary,
                    $style.color__descr,
                    $style.color__input_placeholder
                ]"
            :active="values.machineType === tab.value"
            @click="onTabClick(tab)"
        >
            {{ tab.label }}
        </VTab>
    </VTabs>
</template>

<script lang="ts">
    import { defineComponent } from '@nuxtjs/composition-api'

    import { IOption } from '~/types/home'

    export default defineComponent({
        name: 'TheListFilterTabs',
        props: {
            values: {
                type: Object,
                default: () => ({}),
            },

            options: {
                type: Object,
                default: () => ({}),
            },
        },

        setup(props, { emit }) {
            const onTabClick = (tab: IOption) => {
                emit('change', { machineType: tab.value })
            }

            const checkPrevTab = (tab: IOption, idx: number): Boolean => {
                const arr: IOption[] = props.options.machineType
                const i = arr.findIndex(e => e.value === props.values.machineType)
                return idx === i - 1
            }

            return {
                onTabClick,
                checkPrevTab,
            }
        },
    })
</script>

<style lang="scss" module>
    @import "assets/scss/theme";

    .TheListFilterTabs {
        //
    }

    .tab {
        &._prevTab {
            & > button {
                &::before {
                    content: none;
                }
            }
        }
    }
</style>
