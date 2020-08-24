<template>
  <div>
    <h2 :class="[$style.color__title, $style.tab_title]">
      {{ $options.team.title }}
    </h2>
    <div :class="$style.list">
      <div
        v-for="item in $options.team.data"
        :key="item.title"
        :class="$style.item"
      >
        <div :class="[$style.item_img_wrap ,$style.color__bg_secondary]">
          <img
            :src="require(`~/assets/${item.img}`)"
            :class="$style.item_img"
            alt="item image"
          >
        </div>
        <div>
          <div :class="[$style.color__title, $style.item_title]">
            {{ item.title }}
          </div>
          <div :class="[$style.color__descr, $style.item_descr]">
            {{ item.descr }}
          </div>
        </div>
      </div>
    </div>
    <div :class="[$style.color__descr, $style.descr]">
      {{ $options.team.descr }}
    </div>
  </div>
</template>

<script>
export default {
  team: {
    title: 'Qualified specialists',
    data: [
      {
        img: 'img/lot/1.png',
        title: 'Marvin McKinney',
        descr: 'Pilot assistant'
      },
      {
        img: 'img/lot/2.png',
        title: 'Savannah Nguyen',
        descr: 'Mechanic'
      },
      {
        img: 'img/lot/3.png',
        title: 'Courtney Henry',
        descr: 'Stewardess'
      }
    ],
    descr: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
  }
}
</script>

<style lang="scss" module>
  @import "~/assets/scss/modules_import.scss";
  @import "~/assets/scss/mixins.scss";

  .list {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    display: flex;
    flex-direction: column;
    width: calc(100% / 3 - (25px * 2) / 3);
    margin-bottom: 25px;

    &:not(:nth-child(3n)) {
      margin-right: 25px;
    }

    &_img {
      display: block;
      height: 100%;
      width: 100%;
      border-radius: $border-r-small;

      &_wrap {
        width: 162px;
        height: 96px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: $border-r-small;
        margin-bottom: 16px;
      }
    }

    &_title {
      font-weight: $fontWeightBold;
      line-height: $line-h-grand;
      margin-bottom: 8px;
    }
  }

  .descr {
    font-size: $fontSizeSmaller;
    line-height: $line-h-large;
    font-weight: $fontWeightMedium;
  }
  @include brp(xm) {
    .item {
      &_img {
        &_wrap {
          width: 132px;
          height: 80px;
        }
      }
    }
  }
  @include brp(xs) {
    .list {
      flex-direction: column;
    }
    .item {
      flex-direction: row;
      width: 100%;
      margin-bottom: 12px;

      &_img {
        &_wrap {
          margin-right: 16px;
        }
      }

      &:not(:nth-child(3n)) {
        margin-right: 0;
      }
    }
  }
</style>
