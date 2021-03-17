<template>
    <div
        v-if="visible"
        :class="$style.BaseModal"
    >
        <div :class="$style.container">
            <slot />
        </div>
        <button
            type="button"
            class="btn-reset"
            :class="[$style.close, $style.color__bg_secondary]"
            @click="onClose"
        >
            <IconCross class="frame-icon" :class="$style.color__iconSVG"/>
        </button>
    </div>
</template>

<script>
    import IconCross from '~/assets/svg/cross.svg?inline'

    export default {
        components: {
            IconCross,
        },

        props: {
            submited: {
                type: Boolean,
                default: false,
            },
            visible: Boolean,
            redirectToHome: {
                type: Boolean,
                default: false,
            },
        },

        watch: {
            visible(val) {
                val ? this.$emit('after-enter') : this.$emit('after-leave')
            },
        },

        methods: {
            onClose() {
                this.$modal.close()

                if (this.redirectToHome) {
                    this.$router.push('/')
                }
            },
        },
    }
</script>

<style lang="scss" module>
    @import "assets/scss/theme";

    .BaseModal {
        position: relative;
        margin-left: auto;

        @include brp(sm) {
            width: 100%;
        }
    }

    .close {
        position: absolute;
        top: 64px;
        right: 72px;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        border-radius: $border-r-small;
        cursor: pointer;
        outline: none;

        &:hover {
            opacity: 0.4;
        }

        @include brp(sm) {
            top: 22px;
            right: 16px;
            width: 38px;
            height: 38px;
        }
    }
</style>
