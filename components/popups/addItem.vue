<template>
  <VBaseModal
    :class="$style.VBaseModal"
    :visible="visible"
    @after-enter="$emit('after-enter')"
    @after-leave="$emit('after-leave')"
    >
    <transition name="fade" appear>
      <div
        :class="$style.addItem_mask"
      >
        <div
          :class="[
            $style.addItem_container,
            $style.color__bg_primary
          ]"
        >
          <div :class="$style.addItem_header">
            <div
              :class="[
                $style.color__title,
                $style.addItem_title
              ]"
            >
              {{ title }}
            </div>
            <div
              :class="[
                $style.color__bg_secondary,
                $style.addItem_cross
              ]"
              @click="$modal.close()"
            >
              <cross-icon :class="$style.color__iconSVG" />
            </div>
          </div>
          <div :class="$style.addItem_file">
            <label
              for="fileUpload"
              :class="$style.color__bg_secondary"
            />
            <input
              id="fileUpload"
              placeholder="file"
              type="file"
              accept="image/*"
              @change="onFileSelected"
            >
            <img
              v-if="form.fileSelected"
              :src="form.fileSelected"
              alt="uploaded photo"
            >
            <div
              :class="[
                $style.addItem_file_icon,
                $style.color__bg_primary
              ]"
            >
              <photoIcon />
            </div>
          </div>
          <div :class="$style.input_wrap">
            <VInput
              :id="'name_input'"
              v-model="form.name"
              :type="'text'"
              :placeholder="'Name'"
              :css-modules="[
                $style.color__bg_secondary,
                $style.color__descr,
                $style.color__input_placeholder,
              ]"
            />
          </div>
          <div :class="$style.input_wrap">
            <VInput
              :id="'description_input'"
              v-model="form.description"
              :type="'text'"
              :placeholder="'Description'"
              :css-modules="[
                $style.color__bg_secondary,
                $style.color__descr,
                $style.color__input_placeholder,
              ]"
            />
          </div>
          <div :class="$style.input_wrap">
            <VInput
              :id="'rent_input'"
              v-model="form.price"
              :type="'number'"
              :placeholder="'Rent price'"
              :css-modules="[
                $style.color__bg_secondary,
                $style.color__descr,
                $style.color__input_placeholder,
              ]"
            >
              <span
                :class="[
                  $style.color__descr,
                  $style.input_slot]"
              >
                $/h
              </span>
            </VInput>
          </div>
          <VButton
            v-if="!itemAdded"
            :class="[$style.addItem_btn, {[$style.success] : itemAdded}]"
            :disabled="!filledFields()"
            @click="setItem"
          >
            Complete
          </VButton>
          <VButton
            v-if="itemAdded"
            :class="[$style.addItem_btn, {[$style.success]: itemAdded}]"
            :disabled="!filledFields()"
            @click="setItem"
          >
            Success
          </VButton>
        </div>
      </div>
    </transition>
  </VBaseModal>
</template>

<script>
import { mapState } from 'vuex'

import VBaseModal from '@/components/common/layout/modals/VBaseModal'
import crossIcon from '~/assets/svg/cross.svg?inline'
import photoIcon from '~/assets/svg/photo.svg?inline'

export default {
  name: 'AddItemPopup',
  components: {
    photoIcon,
    crossIcon,
    VBaseModal
  },

  props: {
    title: {
      type: String,
      default: 'Modal title'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      id: null,
      form: {
        fileSelected: null,
        name: null,
        description: null,
        price: null
      }
    }
  },

  computed: {
    ...mapState({
      listData: state => state.data
    }),

    dataIDS () {
      return this.listData.map(e => e.id)
    },

    itemAdded () {
      return this.listData.find(e => e.id === this.id)
    }
  },

  watch: {
    itemAdded (newValue) {
      if (newValue) {
        for (const key in this.form) {
          this.form[key] = null
        }
        setTimeout(() => { this.id = null }, 3000)
      }
    }
  },

  mounted () {
    if (this.isIE()) {
      this.changeSVGColor(
        'modal__cross',
        'fill',
        this.$options.$RGBcolors.$base0,
        this.$options.$RGBcolors.$base500
      )
    }
  },

  methods: {
    filledFields () {
      let res = true
      for (const key in this.form) {
        if (!this.form[key]) {
          res = false
        }
      }
      return res
    },

    setItem () {
      this.randomID()
      const itemObj =
         {
           id: this.id,
           name: this.form.name,
           type: 'custom',
           description: this.form.description,
           specifications_text: '',
           team_text: '',
           term_text: '',
           rent: this.form.price,
           preview: this.form.fileSelected,
           image: this.form.fileSelected
         }
      this.$store.dispatch('ACT_SET_ITEM', itemObj)
    },

    randomID () {
      const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      this.dataIDS.includes(id) ? this.randomID() : this.id = id
    },

    onFileSelected (event) {
      const data = event.target.files[0]
      this.createBase64(data)
    },

    createBase64 (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.form.fileSelected = e.target.result
      }
      reader.readAsDataURL(file)
    },

    modalCall (val) {
      this.$store.dispatch('ACT_SET_POPUP', val)
    }
  }

}
</script>

<style lang="scss" module>

  .VBaseModal {
    position: relative;
  }

  .addItem {
    //&_mask {
    //  position: fixed;
    //  z-index: $z-index-modal-mask;
    //  top: 0;
    //  left: 0;
    //  width: 100%;
    //  height: 100%;
    //  display: flex;
    //  align-items: center;
    //  background: rgba(0, 7, 14, 0.9);
    //}

    @supports ((-webkit-backdrop-filter: blur(2em)) or (backdrop-filter: blur(2em))) {
      &_mask {
        background: rgba(0, 7, 14, 0.32);
        backdrop-filter: blur(32px);
      }
    }

    &_container {
      // min-width: 460px;
      // min-height: 770px;
      // margin-left: auto;
      // padding: 64px 72px;
      // border-radius: $border-r-large 0 0 $border-r-large;
    }

    &_title {
      font-weight: $fontWeightBold;
      font-size: $fontSizeLarge;
    }

    &_header {
      margin-bottom: 40px;
      display: flex;
      align-items: center;
    }

    &_cross {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: auto;
      border-radius: $border-r-small;
      cursor: pointer;
    }

    &_file {
      width: 456px;
      height: 348px;
      position: relative;
      margin-bottom: 24px;

      &_icon {
        width: 48px;
        height: 48px;
        border-radius: $border-r-small;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;

        svg {
          flex-shrink: 0;
        }
      }

      input {
        display: none;
      }

      label {
        display: block;
        height: 100%;
        width: 100%;
        border-radius: $border-r-medium;
        cursor: pointer;
      }

      img {
        height: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 80%;
        object-fit: cover;
        border-radius: $line-h-grand;
        z-index: $z-index-img;
      }
    }

    &_btn {
      width: 100%;
    }
  }

  .input {
    &_wrap {
      width: 100%;
      height: 56px;
      margin-bottom: 24px;

      input {
        border-radius: $border-r-tiny;
      }
    }

    &_slot {
      position: absolute;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .success {
    background-color: $success !important;
    transition: background-color $anim-medium;
    opacity: 1 !important;
  }

  @include brp(sm) {
    .addItem {
      &_header {
        margin-bottom: 24px;
      }

      &_container {
        padding: 26px 16px;
        border-radius: $border-r-medium;
      }

      &_title {
        font-size: $fontSizeBigOne;
      }

      &_cross {
        height: 32px;
        width: 32px;
        border-radius: $border-r-mini;

        svg {
          transform: scale(0.8);
        }
      }
    }
  }

  @include brp(xm) {
    .addItem {
      &_container {
        min-height: initial;
        min-width: initial;
        width: 100%;
      }

      &_file {
        width: 100%;
      }
    }
  }

  @include brp(xs) {
    .addItem {
      &_file {
        margin-bottom: 16px;
        height: 260px;
      }
    }

    .input_wrap {
      margin-bottom: 16px;
    }
  }
</style>
