<template>
    <div :class="$style.tab">
        <keep-alive>
            <transition name="component-fade" mode="out-in">
                <component :is="$route.params.slug">
                    <template v-slot:head>
                        <div :class="[$style.color__descr, $style.tab_descr]">
                            {{ lotTab.data }}
                        </div>
                    </template>
                </component>
            </transition>
        </keep-alive>
    </div>
</template>

<script lang="ts">
    import {
        defineComponent,
        computed,
        useRoute,
    } from '@nuxtjs/composition-api'

    import { ILot, ILotTab } from '~/types/lots'

    export default defineComponent({
        name: 'TheLotTab',
        components: {
            specifications: () => import('/components/common/pages/lot/TheSpecifications.vue'),
            team: () => import('/components/common/pages/lot/TheTeam.vue'),
            term: () => import('/components/common/pages/lot/TheTermRent.vue'),
        },
        props: {
            lot: {
                type: Object,
                required: true,
            },
        },

        setup(props) {
            const $route = useRoute()
            const lot: ILot = props.lot

            const routeSlug = computed(() => $route.value.params.slug)

            const lotTab = computed <ILotTab>(() => {
                const tabName = `${routeSlug.value}_text`
                return {
                    label: tabName,
                    data: lot ? lot[tabName] : '',
                }
            })

            return {
                lotTab,
            }
        },
    })
</script>

<style lang="scss" module>
    @import "assets/scss/theme";

    .tab {
        &_descr {
            font-size: $fontSizeSmaller;
            line-height: $line-h-large;
            font-weight: $fontWeightMedium;
            margin-bottom: 32px;
        }
    }

    @include brp(xm) {
        .tab {
            &_descr {
                margin-bottom: 20px;
            }
        }
    }
</style>
