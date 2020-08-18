<template>
  <div :class="[$style.color__bg_secondary, $style.cont]">
    <div>
      <div :class="[$style.list]">
        <div :class="$style.filter">
          <v-select
            v-model="chosenType"
            :options="typeNames"
            class="filter_types"
            :class="[$colorMode.preference, {'-IE_browser': isIE()}]"
          />
          <v-select
            v-model="selectedVal"
            :options="selectOpt('whatever')"
            :class="{'-IE_browser': isIE()}"
          />
          <div :class="$style.input_wrap">
            <the-input
              v-show="showInput"
              :id="'universal'"
              :type="chosenType === 'Rent' ? 'number' : 'text'"
              :value="inputVal"
              :placeholder="'Print value'"
              :css-modules="[
                $style.color__bg_primary,
                $style.color__descr,
                $style.color__input_placeholder,
                $style.input
              ]"
              @input="updFilter"
            />
          </div>
          <div :class="$style.add_right">
            <span :class="$style.add_title">
              Add new
            </span>
            <btn
              v-if="true"
              :class="$style.btn_plus"
              @click="showAddItemPopUp"
            >
              <plus-icon />
            </btn>
          </div>
        </div>
        <transition-group
          v-infinite-scroll="Scrolled"
          :infinite-scroll-disabled="scroll.disabled"
          :infinite-scroll-distance="scroll.limit"
          name="slideAppear"
          :class="$style.list_trans"
          mode="out-in"
          appear
        >
          <nuxt-link
            v-for="item in list"
            :key="item.id"
            :to="`/${item.id}`"
            :class="$style.list_item"
          >
            <list-item :item-data="item" />
          </nuxt-link>
        </transition-group>
      </div>
    </div>
    <client-only>
      <add-item v-if="getPopup" :title="'Add new vehicle'" />
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { debounce } from 'vue-debounce'
import TheInput from '~/components/fields/TheInput'
import listItem from '~/components/ListItem'
import 'vue-select/dist/vue-select.css'

export default {
  components: {
    listItem,
    TheInput,
    btn: () => import('~/components/controls/TheButton.vue'),
    PlusIcon: () => import('~/assets/svg/add.svg?inline'),
    AddItem: () => import('~/components/popups/addItem.vue')
  },
  async fetch ({ store, error }) {
    try {
      await store.dispatch('GET_DATA_ACT')
    } catch (err) {
      error({ statusCode: 418, message: 'An error has occurred' })
    }
  },
  SfilterTypes: [
    {
      label: 'Rent',
      searchable: true,
      typeData: 'number'
    },
    {
      label: 'Type',
      searchable: false,
      typeData: 'string'
    },
    {
      label: 'Name',
      searchable: true,
      typeData: 'string'
    }
  ],
  data () {
    return {
      scroll: {
        disabled: false,
        limit: 10
      },
      count: 21,
      chosenType: 'Rent',
      typeExpand: false,
      selectedVal: 'whatever',
      inputVal: null
    }
  },
  computed: {
    ...mapGetters(['getdata', 'getPopup']),
    list () {
      return this.dataFilter(this.chosenType).filter((e, index) => index < this.count)
    },
    showInput () {
      return (this.findCurrentType.searchable && this.selectedVal !== 'whatever')
    },
    findCurrentType () {
      return this.$options.SfilterTypes.find(e => e.label === this.chosenType)
    },
    typeNames () {
      return this.$options.SfilterTypes.map(e => e.label)
    }
  },
  watch: {
    chosenType () {
      this.selectedVal = 'whatever'
      this.inputVal = ''
    }
  },
  methods: {
    Scrolled () {
      this.scroll.disabled = true
      this.count += 21
    },
    dataFilter (filterBy) {
      const val = filterBy.toLowerCase()
      if (this.selectedVal === 'whatever' || this.selectedVal === null) {
        return this.getdata
      }
      if (!this.findCurrentType.searchable) {
        return this.getdata.filter(e => e[val] === this.selectedVal)
      }
      if (this.selectedVal === 'search' && this.inputVal) {
        return this.findCurrentType.typeData === 'string'
          ? this.getdata
            .filter(e => e[val].toLowerCase().includes(this.inputVal.toLowerCase()))
          : this.getdata
            .filter(e => +e[val].toString().replace(/,/g, '') < this.inputVal)
      }
      return this.getdata
    },

    selectOpt (defaultVal) {
      const result = [defaultVal]
      this.findCurrentType.searchable
        ? result.push('search')
        : new Set(this.getdata
          .map(e => e[this.chosenType.toLowerCase()]))
          .forEach(e => result.push(e))
      return result
    },
    updFilter: debounce(function (e) {
      this.inputVal = e.target.value
    }, 1000),
    showAddItemPopUp () {
      this.$store.dispatch('ACT_SET_POPUP', true)
    }
  }

}
</script>

<style lang="scss" module>
@import "~/assets/scss/modules_import.scss";
@import "~/assets/scss/mixins.scss";

.cont {
  @include content-wrap;
  border-radius: $border-r-large;
  height: auto;
  min-height: calc(100vh - 144px - 64px);
}

.list {
  padding: 56px 64px 24px 64px;

  &_trans {
    display: flex;
    flex-wrap: wrap;
  }

  &_item {
    margin-bottom: 32px;
    border-radius: $border-r-huge;
    width: calc(100% / 3 - 32px*2 / 3);

    &:not(:nth-child(3n)) {
      margin-right: 32px;
    }
  }
}
.filter {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  &_title {
    font-size: $fontSizeLarge;
    line-height: $line-h-mega;
    font-weight: $fontWeightBold;
    position: relative;
  }
}
.input_wrap {
  width: 400px;
  height: 56px;
  margin-left: 40px;
}
.input {
  padding-left: 24px;
  border-radius: $border-r-tiny;
}
.btn_plus {
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0!important;

  svg {
    height: 14px;
    width: 14px;
    flex-shrink: 0;
    &:hover {
      path {
        fill: $base-0;
      }
    }
  }
}
.add {
  &_title {
    color: $main-400;
    font-weight: $fontWeightBold;
    font-size: $fontSizeBigger;
    margin-right: 20px;
  }
  &_right {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
}
</style>
