<template>
    <header class="main-header container full-content">
        <div class="header-title">
            {{ headerData.title }}
        </div>
        <div class="wrapper-mode">
            <button type="button" class="btn-mode" />
        </div>
        <div class="column one">
            {{ headerData.columnOne }}
            <Routing :link="{ data: headerData.columnOneLink, type: 'from-cms' }" />
        </div>
        <div class="column two">
            {{ headerData.columnTwo }}
            <Routing :link="{ data: headerData.columnTwoLink, type: 'from-cms' }" />
        </div>
    </header>
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

<style lang="scss" scoped>
.main-header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-top: #{2 * $line-height};
    padding-bottom: #{2 * $line-height};
}
.header-title {
    flex: 0 0 auto;
    width: calc(100% - 50px);
    font-size: 1.5rem;
    font-variation-settings: 'wght' 600, 'wdth' 100;
}
.wrapper-mode {
    flex: 0 0 auto;
    display: flex;
    justify-content: flex-end;
    width: 50px;
}
.column {
    flex: 0 0 auto;
    width: 100%;
    margin-top: $line-height;
    font-size: 1.6rem;
    font-variation-settings: 'wght' 200, 'wdth' 150;
}
.btn-mode {
    display: block;
    width: $line-height;
    height: $line-height;
    border-radius: 50%;
    border: 0;
    background: var(--secondary);
}
</style>
