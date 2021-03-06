<template>
    <transition
        name="overlay-appear"
        @enter="isContentVisible = true"
        @after-leave="afterOverlayClose"
    >
        <div
            v-if="isOverlayVisible"
            :class="[$style.overlay, options && options.classList ? options.classList: '']"
            @click.self="onClose"
        >

            <component
                :is="component"
                :data="options"
                :visible="isContentVisible"
                @close="onClose"
                @after-leave="afterContentClose" />
        </div>
    </transition>
</template>

<script>
// Utils
import { lockBody, unlockBody } from 'assets/js/utils/common'

export default {
    name: 'TheModal',
    components: {
        TheAddItemPopup: () => import('@/components/common/layout/modals/popups/TheAddItemPopup'),
    },

    data() {
        return {
            component: null,
            options: null,
            newComponent: null,
            newOptions: null,
            isOverlayVisible: false,
            isContentVisible: false,
        }
    },

    watch: {
        $route() {
            this.onClose()
        },
    },

    beforeMount() {
        this.$modal.event.$on('open', this.onOpen)
        this.$modal.event.$on('close', this.onClose)
    },

    beforeDestroy() {
        this.$modal.event.$off('open', this.onOpen)
        this.$modal.event.$off('close', this.onClose)
    },

    methods: {
        onOpen(component, options) {
            if (this.isOverlayVisible) {
                this.newComponent = component
                this.newOptions = options || null
                this.isContentVisible = false
            } else {
                lockBody()
                this.isOverlayVisible = true
                this.component = component
                if (options) { this.options = options }
            }
        },

        onClose() {
            this.isContentVisible = false
        },

        afterContentClose() {
            if (this.newComponent) {
                this.component = this.newComponent
                this.options = this.newOptions
                this.newComponent = null
                this.newOptions = null

                this.$nextTick(() => {
                    this.isContentVisible = true
                })
            } else {
                this.component = null
                this.options = null
                this.isOverlayVisible = false
            }
        },

        afterOverlayClose() {
            unlockBody()
        },
    },
}
</script>

<style lang="scss" module>
    @import "assets/scss/theme";

    .overlay {
        position: fixed;
        z-index: $z-index-modal-mask;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        background: rgba(0, 7, 14, 0.9);

        @supports ((-webkit-backdrop-filter: blur(2em)) or (backdrop-filter: blur(2em))) {
            &_mask {
                background: rgba(0, 7, 14, 0.32);
                backdrop-filter: blur(32px);
            }
        }

        &:global(.overlay-appear-enter-active) {
            transition: all 0.4s;
        }

        &:global(.overlay-appear-leave-active) {
            transition: all 0.2s;
            opacity: 0;
        }

        &:global(.overlay-appear-enter) {
            opacity: 0;
        }

        &:global(.is-article) {
            overflow-y: auto;
        }

        &:global(.is-light) {
            background-color: rgba(255, 255, 255, 0.5);
        }
    }
</style>
