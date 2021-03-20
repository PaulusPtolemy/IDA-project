<template>
    <div ref="page" :class="[$style.color__bg_secondary, $style.cont]">
        <div v-if="listData"
             :class="[$style.list]"
        >

            <div :class="$style.head">

                <TheListFilter
                    :options="formattedOptions"
                    :values="values"
                    :expand="currentChosenType"
                    @change="onValueChange"
                />

                <div :class="$style.add_right">
                    <span :class="$style.add_title">
                        Add new
                    </span>
                    <VButton
                        title="Add New"
                        :class="$style.btn_plus"
                        @click="$modal.open('TheAddItemPopup')"
                    >
                        <IconPlus />
                    </VButton>
                </div>

            </div>

            <div :class="[$style.list_trans, {[$style._reloading]: flags.isReloading}]">
                <nuxt-link
                    v-for="(item, idx) in partOfScrolled"
                    :key="item.id"
                    :to="`/${item.id}/specifications`"
                    :class="$style.list_item"
                >
                    <TheListItem
                        :item-data="item"
                        :preloaded="idx + 1 <= 21"
                    />
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {
        defineComponent,
        reactive,
        ref,
        computed,
        watch,
        onMounted,
        onBeforeUnmount,
        useContext,
        useRouter,
    } from '@nuxtjs/composition-api'

    // store
    import { getLotsList } from '@/composable/store/lots'

    // components
    import TheListItem from '@/components/common/pages/home/TheListItem.vue'
    import TheListFilter from '@/components/common/filter/LotsList/TheListFilter.vue'

    // utils
    import { debounce } from 'assets/js/utils/common'
    import { applyQuery } from '~/assets/js/utils/queryUtils'

    // icons
    import IconPlus from '~/assets/svg/add.svg?inline'

    // types
    import { IOption, IValues, IScrollOptions, IFlags, IQuery } from '~/types/home'
    import { ILot } from '~/types/lots'

    // static data
    const defaultValues: IValues = {
        type: 0,
        rent: '',
        name: '',
        machineType: '',
    }

    const filterOptions: IOption[] = [
        {
            value: 0,
            label: 'Any',
        },
        {
            value: 1,
            label: 'Rent',
        },
        {
            value: 2,
            label: 'Type',
        },
        {
            value: 3,
            label: 'Name',
        },
    ]

    export default defineComponent({
        name: 'Home',
        components: {
            TheListItem,
            TheListFilter,
            IconPlus,
        },

        setup() {
            const { query } = useContext()
            const $router = useRouter()

            //* state / filter
            const values = ref<IValues>({})

            //* state / list
            const listData = getLotsList // getting list of data from store

            //* state / flags for logic control & animation
            const flags = reactive<IFlags>({
                isReloading: false,
                isScrolling: false,
            })

            //* infinite scroll
            const count = ref<number>(21) // count per view
            const page = ref<HTMLDivElement | null>(null) // html ref on page

            values.value = applyQuery(defaultValues, query.value)

            const fullScrolled = computed(() => { // all items are loaded
                if (listData.value && partOfScrolled.value) {
                    return listData.value.length === partOfScrolled.value.length
                }
            })

            const currentChosenType = computed(() => {
                return filterOptions.find(e => e.value === values.value.type)?.label.toLowerCase()
            })

            const machinesTypes = computed(
                () => new Set(listData?.value?.map(e => e.type)),
            )

            const subFilter = computed(() => { // if type is chosen - subFilter data
                const data = { ...values.value }
                delete data.type

                const chosenSubFilter = Object.keys(data).find(e => data[e]) // cause of only one filter at time

                if (chosenSubFilter) {
                    return {
                        name: chosenSubFilter,
                        value: data[chosenSubFilter],
                    }
                } else {
                    return null
                }
            })

            const listItems = computed(() => { // return filtered data or full list
                const data = listData.value ? [...listData.value] : []
                if (subFilter.value) {
                    return filtered(data)
                }
                return data
            })

            const partOfScrolled = computed(
                () => listItems?.value?.slice(0, count.value),
            )

            const formattedOptions = computed(() => { // formatted options for filter
                const data = [
                    {
                        value: 0,
                        label: 'all',
                    },
                ]
                const arr = [...machinesTypes.value]
                arr.forEach((e, index) => data.push({
                    value: index + 1,
                    label: e,
                }))

                return {
                    types: filterOptions,
                    machineType: data,
                }
            })

            const filtered = (data: ILot[]): ILot[] | undefined => { // filtering a list
                let result

                const filterKey = subFilter?.value?.name // only one subFilter can be active
                const filterVal = subFilter?.value?.value

                if (!filterVal) {
                    return
                }

                const typeLabel = formattedOptions?.value.machineType?.find(
                    e => +e.value === +filterVal,
                )

                switch (filterKey) {
                    case 'rent':
                        result = data.filter(e => // items with lower price than chosen
                            +e.rent
                                .toString()
                                .replace(/,/g, '') < +filterVal)
                        break

                    case 'machineType':
                        if (+filterVal === 0) { // All machines
                            result = data
                        } else {
                            result = data.filter(e => // find a chosen type machines
                                e.type.toLowerCase() === typeLabel?.label.toLowerCase())
                        }
                        break

                    case 'name': // find a substring in names
                        result = data.filter(e => e.name.toLowerCase().includes(filterVal.toString()))
                        break
                }

                return result
            }

            const onValueChange = (val: IValues): void => { // on filter change
                flags.isReloading = true
                // delay emulating

                setTimeout(() => {
                    if (val.type || val.type === 0) { // primary filter
                        values.value = { ...val }
                    } else { // subFilter
                        values.value = { ...values.value, ...val }
                    }
                    flags.isReloading = false
                    updateQuery()
                }, 300)
            }

            const updateQuery = (): void => {
                const query: IQuery = {}

                Object.keys(values.value).forEach(key => {
                    if (values.value[key] !== '') {
                        query[key] = values.value[key].toString()
                    }
                })

                $router.replace({
                    query,
                })
            }

            onMounted(() => {
                document.addEventListener('scroll', debouncedScroll)
            })

            watch(
                query,
                query => {
                    if (!Object.keys(query).length) {
                        values.value = defaultValues
                    }
                },
            )

            onBeforeUnmount(() => {
                document.removeEventListener('scroll', debouncedScroll)
            })

            const onScroll = (): void => {
                if (flags.isScrolling || fullScrolled.value) {
                    return
                }

                flags.isScrolling = true

                requestAnimationFrame((): void => {
                    if (page.value &&
                        window.pageYOffset > page.value.offsetHeight - window.innerHeight * 1.5) {
                        count.value += 9
                    }

                    flags.isScrolling = false
                })
            }

            const debouncedScroll = debounce(onScroll, 100)

            return {
                values,
                flags,
                listData,
                currentChosenType,
                machinesTypes,
                subFilter,
                listItems,
                partOfScrolled,
                formattedOptions,
                filtered,
                onValueChange,
                updateQuery,
                //* infinite scroll
                count,
                page,
                fullScrolled,
                debouncedScroll,
            }
        },
    })
</script>

<style lang="scss" module>
    @import "assets/scss/theme";

    .cont {
        @include content-wrap;

        border-radius: $border-r-large;
        height: auto;
        min-height: calc(100vh - 80px - 54px);
    }

    .list {
        padding: 56px 64px 24px 64px;

        &_trans {
            display: flex;
            flex-wrap: wrap;
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

            &._reloading {
                opacity: 0;
                transform: translate3d(16px, 0, 0);
                transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
            }
        }

        &_item {
            margin-bottom: 32px;
            border-radius: $border-r-huge;
            width: calc(100% / 3 - 32px * 2 / 3);
            transition: transform $anim;
            -webkit-backface-visibility: hidden;

            &:not(:nth-child(3n)) {
                margin-right: 32px;
            }

            :global(.image-lazy__image) {
                transition: transform $anim;
            }

            &:hover {
                transform: translate3d(0, -0.3rem, 0);

                :global(.image-lazy__image) {
                    transform: scale(1.05);
                }
            }
        }
    }

    .filter {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 40px;
    }

    .head {
        position: relative;
        display: flex;
        margin-bottom: 24px;
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
        padding: 0 !important;
        flex-shrink: 0;

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
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-left: auto;
        }
    }

    @include brp(xl) {
        .list {
            padding: 26px 16px;
        }
    }

    @include brp(md) {
        .list {
            &_item {
                margin-bottom: 24px;
                border-radius: $border-r-medium;
                width: calc(100% / 2 - 24px / 2);

                &:not(:nth-child(3n)) {
                    margin-right: 0;
                }

                &:not(:nth-child(2n)) {
                    margin-right: 24px;
                }
            }
        }
    }

    @include brp(sm) {
        .cont {
            border-radius: $border-r-medium;
        }

        .btn_plus {
            width: 32px;
            height: 32px;

            svg {
                height: 10px;
                width: 10px;
            }
        }
    }

    @include brp(xm) {
        .list {
            &_item {
                margin-bottom: 12px;
                width: 100%;

                &:not(:nth-child(2n)) {
                    margin-right: 0;
                }
            }
        }
    }

    @include brp(xs) {
        .add {
            &_title {
                display: none;
            }
        }
    }

</style>
