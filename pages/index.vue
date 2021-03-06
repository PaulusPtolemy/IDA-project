<template>
    <div :class="[$style.color__bg_secondary, $style.cont]">
        <div v-if="listData"
             :class="[$style.list]"
        >

            <div :class="$style.head">

                <TheListFilter
                    :options="filterOptions"
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

            <div
                v-infinite-scroll="Scrolled"
                :infinite-scroll-disabled="scroll.disabled"
                :infinite-scroll-distance="scroll.limit"
                :class="[$style.list_trans, {[$style._reloading]: flags.isReloading}]"
            >
                <nuxt-link
                    v-for="item in listItems"
                    :key="item.id"
                    :to="`/${item.id}/specifications`"
                    :class="$style.list_item"
                >
                    <TheListItem :item-data="item" />
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    import { applyQuery } from 'assets/js/utils/queryUtils'

    import TheListItem from '@/components/common/pages/home/TheListItem'
    import TheListFilter from '@/components/common/filter/LotsList/TheListFilter'

    import IconPlus from '~/assets/svg/add.svg?inline'

    const defaultValues = {
        type: 0,
        rent: '',
        name: '',
        machineType: '',
    }

    export default {
        components: {
            TheListItem,
            TheListFilter,
            IconPlus,
        },

        asyncData({ query }) {
            const initialValues = applyQuery(defaultValues, query)

            return {
                values: initialValues,
            }
        },

        filterOptions: [
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
        ],

        data() {
            return {
                scroll: {
                    disabled: false,
                    limit: 10,
                },
                count: 21,

                values: {},

                flags: {
                    isReloading: false,
                },
            }
        },

        computed: {
            ...mapState({
                listData: state => state.lots.lotsList,
            }),

            currentChosenType() {
                return this.$options.filterOptions
                    .find(e => e.value === this.values.type)
                    .label
                    .toLowerCase()
            },

            machinesTypes() {
                return new Set(this.listData.map(e => e.type))
            },

            filterBy() {
                let result
                const data = {
                    ...this.values,
                }
                delete data.type
                Object.keys(data).forEach(e => {
                    if (data[e] !== undefined && data[e] !== '') {
                        result = { [e]: data[e] }
                    }
                })

                return result
            },

            listItems() {
                const data = [...this.listData]
                if (!this.filterBy) {
                    return data
                }

                return this.filtered(data, this.filterBy)
            },

            filterOptions() {
                const data = [
                    {
                        value: 0,
                        label: 'all',
                    },
                ]
                const arr = [...this.machinesTypes]
                arr.forEach((e, index) => data.push({
                    value: index + 1,
                    label: e,
                }))

                return {
                    types: this.$options.filterOptions,
                    machineType: data,
                }
            },
        },

        methods: {
            filtered(data, options) {
                let result

                const firstKey = Object.keys(options)[0]
                const firstValue = Object.values(options)[0]

                const typeLabel = this.filterOptions?.machineType?.find(e => +e.value === +firstValue)

                switch (firstKey) {
                    case 'rent':
                        result = data.filter(e =>
                            +e.rent
                                .toString()
                                .replace(/,/g, '') < +firstValue)
                        break

                    case 'machineType':
                        if (+firstValue === 0) {
                            result = data
                        } else {
                            result = data.filter(e =>
                                e.type.toLowerCase() === typeLabel.label.toLowerCase())
                        }
                        break

                    case 'name':
                        result = data.filter(e => e.name.toLowerCase().includes(firstValue))
                        break
                }

                return result
            },

            Scrolled() {
                this.scroll.disabled = true
                this.count += 21
            },

            onValueChange(val) {
                this.flags.isReloading = true
                // эмулируем задержку как при запросе
                setTimeout(() => {
                    if (val.type !== undefined) {
                        this.values = { ...val }
                    } else {
                        this.values = { ...this.values, ...val }
                    }
                    this.flags.isReloading = false
                    this.updateQuery()
                }, 300)
            },

            updateQuery() {
                const query = {}

                Object.keys(this.values).forEach(key => {
                    if (this.values[key] !== '' || this.values[key].length) {
                        query[key] = this.values[key]
                    }
                })

                this.$router.replace({
                    query,
                })
            },
        },

    }
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

            &:not(:nth-child(3n)) {
                margin-right: 32px;
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
