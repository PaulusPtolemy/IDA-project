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

<script>
    import { mapGetters } from 'vuex'

    export default {
        components: {
            specifications: () => import('~/components/common/pages/lot/TheSpecifications'),
            team: () => import('~/components/common/pages/lot/TheTeam'),
            term: () => import('~/components/common/pages/lot/TheTermRent.vue'),
        },

        computed: {
            ...mapGetters({
                getCurrentLotTab: 'lots/getCurrentLotTab',
            }),

            lotTab() {
                return this.getCurrentLotTab(this.$route)
            },
        },
    }
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
