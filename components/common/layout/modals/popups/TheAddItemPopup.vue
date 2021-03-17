<template>
    <VBaseModal
        :class="$style.VBaseModal"
        :visible="visible"
        @after-enter="$emit('after-enter')"
        @after-leave="$emit('after-leave')"
    >
                <div :class="[
                    $style.addItem_container,
                    $style.color__bg_primary]"
                >
                    <div :class="$style.addItem_header">
                        <div :class="[
                            $style.color__title,
                            $style.addItem_title]"
                        >
                            {{ title }}
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
                        <div :class="[
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
                                $style.color__input_placeholder]"
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
                                $style.color__input_placeholder,]"
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
                                $style.color__input_placeholder,]"
                        >
                            <span :class="[
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
    </VBaseModal>
</template>

<script>
    import {
        defineComponent,
        ref,
        reactive,
        computed,
        watch,
    } from '@nuxtjs/composition-api'

    import VBaseModal from '@/components/common/layout/modals/VBaseModal'
    import { getLotsList, setLot } from '@/composable/store/lots'
    import photoIcon from '~/assets/svg/photo.svg?inline'

    // store

    export default defineComponent({
        name: 'TheAddItemPopup',
        components: {
            photoIcon,
            VBaseModal,
        },

        props: {
            title: {
                type: String,
                default: 'Modal title',
            },
            visible: {
                type: Boolean,
                default: false,
            },
        },

        setup(props) {
            const id = ref(null)
            const form = reactive({
                fileSelected: null,
                name: null,
                description: null,
                price: null,
            })

            const listData = getLotsList.value

            const dataIDS = computed(() => listData.map(e => e.id))

            const itemAdded = computed(() => listData.find(e => e.id === id.value))

            // watch(itemAdded, (newValue, oldValue) => {
            //     if (newValue) {
            //         for (const key in form) {
            //             form[key] = null
            //         }
            //         setTimeout(() => { id.value = null }, 3000)
            //     }
            // })

            const filledFields = () => {
                let res = true
                for (const key in form) {
                    if (!form[key]) {
                        res = false
                    }
                }
                return res
            }

            const setItem = async() => {
                randomID()
                const itemObj =
                    {
                        id: id.value,
                        name: form.name,
                        type: 'custom',
                        description: form.description,
                        specifications_text: '',
                        team_text: '',
                        term_text: '',
                        rent: form.price,
                        preview: form.fileSelected,
                        image: form.fileSelected,
                    }
                const res = await setLot(itemObj)

                if (res.statusCode === 200) {
                    clearForm()
                }
            }

            const clearForm = () => {
                Object.keys(form).forEach(e => {
                    form[e] = null
                })
                setTimeout(() => { id.value = null }, 3000)
            }

            const randomID = () => {
                const idx =
                    Math.random()
                        .toString(36)
                        .substring(2, 15) +
                    Math.random()
                        .toString(36)
                        .substring(2, 15)
                dataIDS.value.includes(idx) ? randomID() : id.value = idx
            }

            const onFileSelected = event => {
                const data = event.target.files[0]
                createBase64(data)
            }

            const createBase64 = file => {
                const reader = new FileReader()
                reader.onload = e => {
                    form.fileSelected = e.target.result
                }
                reader.readAsDataURL(file)
            }

            return {
                id,
                form,
                listData,
                dataIDS,
                itemAdded,
                clearForm,
                filledFields,
                setItem,
                randomID,
                createBase64,
                onFileSelected,
            }
        },
    })
</script>

<style lang="scss" module>
    @import "assets/scss/theme";

    .addItem {
        &_container {
             min-width: 460px;
             min-height: 770px;
             margin-left: auto;
             padding: 64px 72px;
             border-radius: $border-r-large 0 0 $border-r-large;
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

            &_file {
                width: 100%;
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
