<template>
    <VInput
        :css-modules="[
                $style.color__bg_primary,
                $style.color__descr,
                $style.color__input_placeholder
        ]"
        :type="type"
        :value="value"
        @input="onInput"
    />
</template>

<script lang="ts">
    import { defineComponent } from '@nuxtjs/composition-api'

    export default defineComponent({
        name: 'TheListFilterInput',
        props: {
            type: {
                type: String,
                default: 'text',
            },
            value: [String, Number],
        },

        setup(props, { emit }) {
            const onInput = (val: string) => {
                emit('input-change', val)
            }

            return {
                onInput,
            }
        },
    })
</script>

<style lang="scss" module>
    @import "assets/scss/theme";

    .TheListFilterInput {
        //
    }
</style>
