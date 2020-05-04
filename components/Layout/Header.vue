<template>
    <header class="main-header container full-content">
        <div class="header-title" v-html="headerData.title" />
        <div class="wrapper-mode">
            <button type="button" class="btn-mode" />
        </div>
        <div class="column one">
            {{ headerData.columnOne }}
            <Routing class="link-arrow framed" :link="{ data: headerData.columnOneLink, type: 'from-cms' }" />
        </div>
        <div class="column two">
            {{ headerData.columnTwo }}
            <Routing class="link-arrow underlined" :link="{ data: headerData.columnTwoLink, type: 'from-cms' }" />
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
    /deep/ p {
        margin: 0;
    }
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

@media (min-width: $desktop-small) {
    .main-header {
        order: 1;
        padding-left: 0;
        padding-right: 0;
    }
    .header-title,
    .column {
        padding-left: var(--gutter);
        padding-right: var(--gutter);
    }
    .header-title {
        width: calc(#{var(--col)} * 2);
    }
    .column {
        width: calc(#{var(--col)} * 3);
        margin-top: 0;
        &.one {
            order: 2;
        }
        &.two {
            order: 3;
        }
    }
    .wrapper-mode {
        order: 4;
        justify-content: center;
        width: calc(#{var(--col)});
        padding-left: var(--gutter);
        padding-right: var(--gutter);
    }
}

@media (min-width: $desktop) {
    .main-header {
        padding-top: #{4 * $line-height};
        padding-bottom: #{4 * $line-height};
    }
    .header-title,
    .column {
        width: calc(#{var(--col)} * 2);
    }
    .header-title,
    .column.one {
        margin-right: calc(#{var(--col)});
    }
    .header-title {
        font-size: 1.8rem;
    }
    .column {
        font-size: 1.8rem;
    }
}
</style>
