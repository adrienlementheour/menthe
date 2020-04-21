<template>
    <DynamicList :cms-data="cmsData" />
</template>

<script>
import { getJournalPage } from '~/cms';
import handleSeo from '~/assets/js/global/seo';

import DynamicList from '~/components/Pages/DynamicList';

export default {
    components: {
        DynamicList
    },
    async asyncData({ app, error, route, store }) {
        const { fullPath: routePath } = route;

        const cmsData = await getJournalPage({ app, routePath, store });

        if (!cmsData) return error({ statusCode: 404 });

        // Generate current page's seo head data
        const seo = handleSeo({ routePath, seoData: cmsData.seo, store });

        return { seo, cmsData };
    },
    head() {
        return {
            ...this.seo
        };
    }
};
</script>

<style lang="scss" scoped></style>
