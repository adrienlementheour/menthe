<template>
    <header class="main-header" />
</template>

<script>
import layoutData from '~/cms/data/layout-data.json';

export default {
    data() {
        return {
            headerData: layoutData[this.$store.state.i18n.locale].header
        };
    }
};
</script>

<style lang="scss" scoped></style>
