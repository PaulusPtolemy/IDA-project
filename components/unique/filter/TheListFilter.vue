<template>
    <div :class="$style.TheListFilter">
        <VSelect
            :class="$style.select_type"
            :options="options.types"
            :value="values.type"
            @input="$emit('change', { type: $event })"
        />

        <VInput
            v-if="allowInput"
            :type="formatExpand === 'rent' ? 'number' : 'text'"
            :value="valueField"
            @input="inputChange"
        />

        <VTabs
            v-if="allowTabs"
            :class="$style.tabs"
            size="smallest"
            inline
        >
            <VTab
                v-for="tab in options.machineType"
                :key="tab.value"
                switch
                :class="$style.tab"
                :active="values.machineType === tab.value"
                @click="$emit('change', { machineType: tab.value })"
            >
                {{ tab.label }}
            </VTab>
        </VTabs>
    </div>
</template>

<script>
import { debounce } from 'vue-debounce'

export default {
    name: 'TheListFilter',

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
        allowInput () {
            return this.formatExpand === 'rent' || this.formatExpand === 'name'
        },

        allowTabs () {
            return this.formatExpand === 'type'
        },

        formatExpand () {
            return this.expand.toLowerCase()
        },

        valueField () {
            return this.values[this.formatExpand]
        },
    },

    methods: {

        inputChange: debounce(function (e) {
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
  .TheListFilter {
    //
  }

  .select_type {
      height: 50px;
      width: 250px;
  }
</style>
