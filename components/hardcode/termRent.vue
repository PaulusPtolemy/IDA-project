<template>
  <div>
    <slot name="head" />
    <h2 :class="[$style.color__title, $style.tab_title]">
      {{ $options.term.title }}
    </h2>
    <div :class="$style.list">
      <div
        v-for="item in $options.term.data"
        :key="item"
        :class="[$style.color__descr, $style.item]"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  term: {
    title: 'Additional conditions:',
    data: [
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
    ]
  }
}
</script>

<style lang="scss" module>

  .list {
    display: flex;
    flex-direction: column;
  }

  .item {
    margin-bottom: 16px;
    padding-left: 20px;
    position: relative;

    &::before {
      content: '';
      display: block;
      height: 4px;
      width: 4px;
      position: absolute;
      left: 0;
      top: 6px;
      border-radius: 50%;
      background-color: $secondary-400;
    }
  }
</style>
