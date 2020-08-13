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
  name: 'TheButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    callback (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" module>
@import "~/assets/scss/modules_import.scss";
  .btn {
    padding: 17px 32px;
    background-color: $main-400;
    border-radius: $border-r-tiny;
    outline: none;
    cursor: pointer;

    span {
      color: $base-0;
      font-weight: $fontWeightBold;
    }
  }
</style>
