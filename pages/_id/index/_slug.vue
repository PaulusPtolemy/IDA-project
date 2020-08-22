<template>
  <div :class="$style.tab">
    <div
      :class="[$style.color__descr, $style.tab_descr]"
    >
      {{ lotTab.data }}
    </div>
    <h2 v-if="tabData" :class="[$style.color__title, $style.tab_title]">
      {{ tabData.title }}
    </h2>
    <div v-if="slugName === 'specifications'">
      <div
        v-for="item in $options.S[slugName].data"
        :key="item.title"
        :class="$style.item"
      >
        <div :class="[$style.item_img_wrap ,$style.color__bg_secondary]">
          <img
            v-if="item.img"
            :src="require(`~/assets/${item.img}`)"
            :class="$style.item_img"
            alt="item image"
          >
          <div
            v-else-if="item.svg"
            :class="$style.item_img"
            alt="item image"
            v-html="item.svg"
          />
        </div>
        <div :class="$style.item_right">
          <div :class="[$style.color__title, $style.item_title]">
            {{ item.title }}
          </div>
          <div :class="[$style.color__descr, $style.item_descr]">
            {{ item.descr }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  async fetch ({ store, route, error }) {
    try {
      const data = await store.dispatch('ACT_CURRENT_LOT_TAB', { route })
      if (!data) {
        error({ statusCode: 404, message: 'Page not found' })
      }
    } catch (err) {
      error({ statusCode: 418, message: 'An error has occurred' })
    }
  },
  S: {
    specifications: {
      title: 'Features:',
      data: [
        {
          svg: '<svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path id="cup_icon" d="M16.3333 18.584V21.3333H23V24H7V21.3333H13.6667V18.584C11.0889 18.2589 8.71842 17.0044 7 15.0557C5.28158 13.107 4.33338 10.5981 4.33333 8V0H25.6667V8C25.6666 10.5981 24.7184 13.107 23 15.0557C21.2816 17.0044 18.9111 18.2589 16.3333 18.584ZM0.333332 2.66667H3V8H0.333332V2.66667ZM27 2.66667H29.6667V8H27V2.66667Z" fill="#99A7B5"></path>\n' +
            '</svg>\n',
          title: 'A challenge for a true champion',
          descr: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
        },
        {
          svg: '<svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path id="man_icon" d="M14.9413 18.7518C18.4867 20.1625 21.096 23.4185 21.584 27.3332H0.416004C0.904004 23.4185 3.51334 20.1625 7.05867 18.7518L11 24.6665L14.9413 18.7518ZM19 0.666504V8.6665C19 13.0852 15.4187 16.6665 11 16.6665C6.58134 16.6665 3 13.0852 3 8.6665V0.666504H19ZM16.3333 8.6665H5.66667C5.66667 11.6132 8.05334 13.9998 11 13.9998C13.9467 13.9998 16.3333 11.6132 16.3333 8.6665Z" fill="#99A7B5"></path>\n' +
            '</svg>\n',
          title: "Pilot's sweaty hands",
          descr: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
        }
      ]
    },
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
    },
    term: {
      title: 'Additional conditions:',
      data: [
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
      ]
    }
  },
  computed: {
    ...mapGetters({
      lotTab: 'getCurrentLotTab'
    }),
    tabData () {
      return this.$options.S[this.slugName]
    },
    slugName () {
      return this.lotTab.label.replace('_text', '').toLowerCase()
    }
  },
  watch: {
    Mode () {
      if (this.isIE()) {
        const svgs = ['cup_icon', 'man_icon']
        for (let i = 0; i < svgs.length; i++) {
          this.changeSVGColor(
            svgs[i],
            'fill',
            this.$options.$RGBcolors.$base200,
            this.$options.$RGBcolors.$base300
          )
        }
      }
    }
  }
}
</script>

<style lang="scss" module>
@import "~/assets/scss/modules_import.scss";
@import "~/assets/scss/mixins.scss";

.tab {
  &_descr {
    font-size: $fontSizeSmaller;
    line-height: $line-h-large;
    font-weight: $fontWeightMedium;
    margin-bottom: 32px;
  }
  &_title {
    font-size: $fontSizeBigOne;
    font-weight: $fontWeightBold;
    line-height: $line-h-large;
    margin-bottom: 32px;
  }
}
.item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  &_img {
    display: block;

    &_wrap {
      width: 80px;
      height: 96px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      border-radius: $border-r-small;
      margin-right: 24px;
    }
  }

  &_right {
    flex-direction: column;
    flex: 100%;
  }

  &_title {
    font-weight: $fontWeightBold;
    line-height: $line-h-grand;
    margin-bottom: 8px;
  }
}

</style>
