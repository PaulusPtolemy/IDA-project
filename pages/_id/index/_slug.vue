<template>
    <div :class="$style.tab">
        <keep-alive>
            <component :is="$route.params.slug">
                <template v-slot:head>
                    <div :class="[$style.color__descr, $style.tab_descr]">
                        {{ lotTab.data }}
                    </div>
                </template>
            </component>
        </keep-alive>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    useRoute,
} from '@nuxtjs/composition-api'

    import { getCurrentLotTab } from '@/composable/store/lots'
    import { IRouteParams } from '~/types/lots'

    export default defineComponent({
        name: 'TheLotTab',
        components: {
            specifications: () => import('/components/common/pages/lot/TheSpecifications.vue'),
            team: () => import('/components/common/pages/lot/TheTeam.vue'),
            term: () => import('/components/common/pages/lot/TheTermRent.vue'),
        },

        setup() {
            const $route = useRoute()

            const RouteParams = computed((): IRouteParams => {
                return {
                    slug: $route.value.params.slug,
                    id: $route.value.params.id,
                }
            })

            const lotTab = computed(() => getCurrentLotTab(RouteParams.value))

            return {
                lotTab,
                RouteParams,
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
