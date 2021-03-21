<template>
    <TheColorMode>
        <a :class="$style.skip" href="#start_of_content">
            Skip to content
        </a>
        <div :class="[$style.page, $style.color__bg_primary]">
            <TheHeader />
            <Nuxt />
            <TheModal />
        </div>
    </TheColorMode>
</template>

<script>
    import TheColorMode from '@/components/common/layout/TheColorMode'
    import TheHeader from '@/components/common/layout/TheHeader'
    import TheModal from '@/components/common/layout/TheModal'

    export default {
        components: {
            TheHeader,
            TheModal,
            TheColorMode,
        },
    }
</script>
<style lang="scss" module>
    @import "assets/scss/theme";

    .page {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        padding-bottom: 48px;
    }

    @include brp(xm) {
        .page {
            padding-bottom: calc(48px + 80px);
        }
    }

    .skip {
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: white;
        padding: 8px;
        z-index: 100;

        &:focus {
            top: 0;
        }
    }
</style>
