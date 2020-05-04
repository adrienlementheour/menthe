<template>
    <div>
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
import { ioPolyfill } from '@stereorepo/sac';

import Loader from '~/components/Layout/Loader';
import Header from '~/components/Layout/Header';
import Footer from '~/components/Layout/Footer';
import Contact from '~/components/Layout/Contact';
import Svgs from '~/components/Miscellaneous/Svgs';

// Lazy loaded resources
const Grid = () => import('~/components/Layout/Grid');

export default {
    components: { Contact, Footer, Header, Grid, Loader, Svgs },
    data: () => ({
        isDevEnv: process.env.isDevEnv,
        columnsData: {
            xl: 9,
            s: 5,
            xs: 2
        }
    }),
    mounted() {
        this.handleWindow();
        this.handleScroll();
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
        handleDevicesCompatibility() {
            /**
             * NOTE: The Intersection Observer API is used by
             *  LazyImage and LazyVideo directives.
             */
            ioPolyfill();
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
        }
    }
};
</script>

<style></style>
