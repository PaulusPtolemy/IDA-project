<template>
    <div :class="className">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed } from '@nuxtjs/composition-api'
    import { getColor } from '~/composable/store/colorMode'

    export default defineComponent({
        name: 'TheColorMode',

        setup() {
            const className = computed(() => `${getColor.value}-mode`)

            return {
                className,
            }
        },
    })
</script>

<style lang="scss" module>
    .TheColorMode {
        //
    }
</style>
