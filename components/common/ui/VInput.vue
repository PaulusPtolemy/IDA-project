<template>
  <label :for="id" :class="$style.label">
    <input
      v-if="type === 'number'"
      :id="id"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :class="cssModules"
      v-on="$listeners"
      @input="[
        $emit('update', $event.target.value),
        $event.target.value = Math.abs($event.target.value)
      ]"
    >
    <input
      v-else
      :id="id"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :class="cssModules"
      v-on="$listeners"
      @input="$emit('update', $event.target.value)"
    >
    <slot />
  </label>
</template>

<script>
const TYPES = [
  'text',
  'password',
  'email',
  'number',
  'url',
  'tel',
  'search',
  'color',
  'file'
]
const includes = types => type => types.includes(type)

export default {
  name: 'VInput',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    cssModules: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'text',
      validator (value) {
        const isValid = includes(TYPES)(value)
        if (!isValid) {
          // eslint-disable-next-line
          console.log(`allowed types are ${TYPES}`);
        }
        return isValid
      }
    }
  }
}
</script>
<style lang="scss" module>

.label {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;

  input {
    &:focus {
      box-shadow: 0 0 2px 1px rgba(73, 89, 255, 0.5);
    }

    &::-ms-clear {
      display: none;
    }
  }
}
</style>
