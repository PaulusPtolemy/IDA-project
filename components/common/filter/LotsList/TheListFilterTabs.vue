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
            @click="$emit('change', { machineType: tab.value })"
        >
            {{ tab.label }}
        </VTab>
    </VTabs>
</template>

<script>
    export default {
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

        methods: {
            checkPrevTab(tab, idx) {
                const arr = this.options.machineType
                const item = arr.find(e => e.value === this.values.machineType)
                const i = arr.indexOf(item)
                return idx === i - 1
            },
        },
    }
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
