<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="$style.btn"
    @click="callback($event)"
  >
    <slot />
  </button>
</template>

<script>
export default {
    name: 'VButton',
    props: {
        type: {
            type: String,
            default: 'button',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        callback(e) {
            this.$emit('click', e)
        },
    },
}
</script>

<style lang="scss" module>

.btn {
  padding: 17px 32px;
  background-color: $main-400;
  border-radius: $border-r-tiny;
  outline: none;
  cursor: pointer;
  transition: all $anim-medium;
  color: $base-0;
  font-weight: $fontWeightBold;
  flex-shrink: 0;

  &:disabled {
    transition: all $anim-medium;
    opacity: 0.3;
    cursor: not-allowed;
  }
}
</style>
