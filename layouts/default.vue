<template>
    <div :class="[{ 'is-loaded': !loading }, { ie11: isIE11 }]">
        <PathCanvas v-if="windowWidth >= $breakpoints.list.l && !isTouch" />
        <Loader />
        <Header />
        <nuxt />
        <Contact />
        <Footer />
        <Svgs />
        <Grid v-if="isDevEnv" :columns-data="columnsData" />
    </div>
</template>

<script>
import Loader from '~/components/Layout/Loader';
import Header from '~/components/Layout/Header';
import Footer from '~/components/Layout/Footer';
import Contact from '~/components/Layout/Contact';
import PathCanvas from '~/components/Layout/Path';
import Svgs from '~/components/Miscellaneous/Svgs';
import { isIe11 } from '@stereorepo/sac';

// Lazy loaded resources
const Grid = () => import('~/components/Layout/Grid');

export default {
    components: { Contact, Footer, Header, Grid, Loader, Svgs, PathCanvas },
    data: () => ({
        isDevEnv: process.env.isDevEnv,
        columnsData: {
            xl: 9,
            s: 5,
            xs: 2
        },
        colorMode: '',
        noJS: true,
        isIE11: false
    }),
    computed: {
        windowWidth() {
            if (!this.$store.state.superWindow) return Infinity;
            return this.$store.state.superWindow.width;
        },
        manualColorMode() {
            return this.$store.state.manualColorMode;
        },
        manualDarkMode() {
            return this.$store.state.manualDarkMode;
        },
        isTouch() {
            return this.$store.state.isTouch;
        },
        loading() {
            return this.$store.state.loading;
        }
    },
    created() {
        this.getColorMode();
    },
    mounted() {
        window.addEventListener('mousemove', this.mouseMoveDetector);
        this.handleWindow();
        this.handleScroll();
        this.noJS = false;
        this.isIE11 = isIe11();
        this.$nextTick(() => {
            this.$store.commit('setLoading', false);
        });
    },
    beforeDestroy() {
        // NOTE: Avoiding memory leaks
        this.$stereorepo.superScroll.destroyScroll();
        this.$stereorepo.superWindow.destroyWindow(this.$store);
    },
    methods: {
        mouseMoveDetector() {
            this.$store.commit('setTouch', false);
            window.removeEventListener('mousemove', this.mouseMoveDetector);
        },
        handleWindow() {
            this.$stereorepo.superWindow.initializeWindow(this.$store);
        },
        handleScroll() {
            this.$stereorepo.superScroll.initializeScroll().then(firstScrollTop => {
                this.$store.commit('scroll/setFirstScrollTop', firstScrollTop);
            });

            this.$stereorepo.superScroll.on('scroll', scrollTop => {
                this.$store.commit('scroll/setScrollTop', scrollTop);
            });
        },
        getColorMode() {
            if (process.browser) {
                this.colorMode = localStorage.getItem('colorMode');
                if (this.colorMode === 'light') {
                    this.$store.commit('setManualColorMode', true);
                    this.$store.commit('setManualDarkMode', false);
                } else if (this.colorMode === 'dark') {
                    this.$store.commit('setManualColorMode', true);
                    this.$store.commit('setManualDarkMode', true);
                }
            }
        }
    },
    head() {
        return {
            bodyAttrs: {
                class:
                    this.manualColorMode && !this.manualDarkMode
                        ? 'lightmode'
                        : this.manualColorMode && this.manualDarkMode
                        ? 'darkmode'
                        : ''
            }
        };
    }
};
</script>

<style></style>
