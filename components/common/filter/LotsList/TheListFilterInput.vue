<template>
    <VInput
        :css-modules="[
                $style.color__bg_primary,
                $style.color__descr,
                $style.color__input_placeholder
        ]"
        :type="type"
        :value="value"
        @input="$emit('input-change', $event)"
    />
</template>

<script>
    export default {
        name: 'TheListFilterInput',
        props: {
            type: {
                type: String,
                default: 'text',
            },
            value: [String, Number],
        },
    }
</script>

<style lang="scss" module>
    @import "assets/scss/theme";

    .TheListFilterInput {
        //
    }
</style>
