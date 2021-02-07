<template>
    <div :class="$style.Select">
        <VSelect />
    </div>
</template>

<script>
import VSelect from '@/components/common/ui/VSelect'

export default {
    name: 'Select',
    components: {
        VSelect,
    },
}
</script>

<style lang="scss" module>
.Select {
    //
}
</style>
