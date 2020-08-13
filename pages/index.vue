<template>
  <div class="container">
    <div>
      <div :class="[$style.list]">
        <div :class="$style.filter">
          <div :class="[$style.color__title, $style.filter_title]">
            <span @click="[typeExpand = !typeExpand]">
              {{ chosenType }}
            </span>
            <div v-if="typeExpand">
              <div v-for="e in filterTypes" :key="e">
                <p @click="chosenType = e">
                  {{ e }}
                </p>
              </div>
            </div>
          </div>
          <v-select
            v-if="chosenType !== 'Name'"
            v-model="selectedVal"
            :options="selectOpt()"
          />
          <input
            v-show="(selectedVal || chosenType === 'Name' ) && chosenType !== 'Type'"
            :type="inputType"
            @input="updFilter"
          >
        </div>
        <transition-group
          v-infinite-scroll="Scrolled"
          :infinite-scroll-disabled="scroll.disabled"
          :infinite-scroll-distance="scroll.limit"
          name="slideAppear"
          :class="$style.list_trans"
        >
          <div
            v-for="item in list"
            :key="item.id"
            :class="$style.list_item"
          >
            <list-item :item-data="item" />
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { debounce } from 'vue-debounce'
import listItem from '~/components/ListItem'

import 'vue-select/dist/vue-select.css'

export default {
  components: {
    listItem
  },
  async asyncData ({ store, error }) {
    try {
      await store.dispatch('GET_DATA_ACT')
    } catch (err) {
      error({ statusCode: 418, message: 'An error has occurred' })
    }
  },
  data () {
    return {
      scroll: {
        disabled: false,
        limit: 10
      },
      count: 21,
      filterTypes: ['Name', 'Type', 'Rent'],
      chosenType: 'Rent',
      typeExpand: false,
      selectedVal: null,
      inputVal: null
    }
  },
  computed: {
    ...mapGetters(['getdata']),
    list () {
      return this.dataFilter().filter((e, index) => index < this.count)
    },
    inputType () {
      return (
        this.chosenType === 'Rent' ? 'number' : 'text'
      )
    }
  },
  methods: {
    Scrolled () {
      this.scroll.disabled = true
      this.count += 21
    },
    dataFilter () {
      if (this.selectedVal === 'whatever') {
        return this.getdata
      }
      if (this.selectedVal === 'Choose a max price' && this.inputVal) {
        return this.getdata.filter(e => +e.rent.toString().replace(/,/g, '') < this.inputVal)
      }
      if (this.chosenType === 'Type' && this.selectedVal) {
        return this.getdata.filter(e => e.type === this.selectedVal)
      }

      if (this.chosenType === 'Name' && this.inputVal) {
        return this.getdata.filter(e => e.name.toLowerCase().includes(this.inputVal.toLowerCase()))
      }

      return this.getdata
    },
    selectOpt () {
      const result = ['whatever']
      switch (this.chosenType) {
        case 'Rent': result.push('Choose a max price'); break
        case 'Type': new Set(this.getdata.map(e => e.type)).forEach(e => result.push(e)); break
      }
      return result
    },
    updFilter: debounce(function (e) {
      this.inputVal = e.target.value
    }, 1000)
  }

}
</script>

<style lang="scss" module>
@import '~/assets/scss/_main.scss';

.list {
  padding: 144px 64px 24px 64px;

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
  &_title {
    font-size: $fontSizeLarge;
    line-height: $line-h-mega;
    font-weight: $fontWeightBold;
  }
}
</style>
