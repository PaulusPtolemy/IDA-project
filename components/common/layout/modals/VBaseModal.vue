<template>
  <div v-if="visible"
       :class="$style.BaseModal">
    <div :class="$style.container">
      <div :class="$style.wrap">
        <slot />
      </div>
    </div>
    <button type="button"
            class="btn-reset"
            :class="$style.close"
            @click="onClose">
      <cross-icon class="frame-icon" />
    </button>
  </div>
</template>

<script>
import crossIcon from '~/assets/svg/cross.svg?inline'

export default {
  components: {
    crossIcon
  },

  props: {
    submited: {
      type: Boolean,
      default: false
    },
    visible: Boolean,
    redirectToHome: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    visible (val) {
      val ? this.$emit('after-enter') : this.$emit('after-leave')
    }
  },

  methods: {
    onClose () {
      this.$modal.close()

      if (this.redirectToHome) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss" module>

.BaseModal {
  position: fixed;
  z-index: $z-index-modal-mask;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: rgba(0, 7, 14, 0.9);
}

.wrap {
  min-width: 460px;
  min-height: 770px;
  margin-left: auto;
  padding: 64px 72px;
  border-radius: $border-r-large 0 0 $border-r-large;
}

.close {
  position: absolute;
  top: 92px;
  right: calc(50% - 522px);
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
  pointer-events: all;
  // color: rgba($gray, 0.6);
  transition: opacity 0.3s ease-out;

  &:hover {
    opacity: 0.4;
  }
}
</style>
