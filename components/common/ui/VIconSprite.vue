<template>
  <div
    :class="classList"
    class="VIconSprite"
    @click="$emit('click')"
  >
    <svg-icon
      :view-box="viewBox"
      :name="name"
      class="VIconSprite__el"
    />
  </div>
</template>

<script>
export default {
  name: 'VIconSprite',

  props: {
    viewBox: {
      type: String,
      default: '0 0 32 32'
    },

    name: {
      type: String,
      default: 'none',
      required: true
    },

    size: {
      type: String,
      default: 'medium',
      validator: (v) => {
        return [
          'small',
          'medium',
          'large',
          'custom'
        ].includes(v)
      }
    }
  },

  computed: {
    classList () {
      return {
        [`_${this.size}`]: this.size
      }
    }
  }
}
</script>

<style scoped lang="scss">
.VIconSprite {
  display: block;
  fill: currentColor;

  &._small {
    width: 16px;
    height: 16px;
  }

  &._medium {
    width: 24px;
    height: 24px;
  }

  &._large {
    width: 32px;
    height: 32px;
  }

  &__el {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
