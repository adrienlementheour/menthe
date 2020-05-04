<template>
    <footer class="footer">
        <div class="footer-content container">
            <div class="footer-text" v-html="footerData.text" />
            <div class="copyright" v-html="footerData.copyright" />
            <div class="social">
                <Routing
                    v-for="link in footerData.socialLinks"
                    :key="link.id"
                    class="social-link"
                    :link="{ data: link, type: 'from-cms' }"
                />
            </div>
        </div>
    </footer>
</template>

<script>
import layoutData from '~/cms/data/layout-data.json';

export default {
    data() {
        return {
            footerData: layoutData[this.$store.state.i18n.locale].footer
        };
    }
};
</script>

<style lang="scss" scoped>
.footer {
    padding-top: $line-height;
    padding-bottom: $line-height * 2;
    border-top: 1px solid var(--tertiary);
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
}
.footer-text {
    flex: 0 0 auto;
    width: 100%;
    font-size: 1.2rem;
    /deep/ p {
        margin: 0;
        font-variation-settings: 'wght' 350, 'wdth' 180;
        letter-spacing: 0.2;
    }
}
.copyright,
.social {
    flex: 0 0 auto;
    width: calc(50% - #{$gutter});
    margin-top: $line-height;
    /deep/ p {
        margin: 0;
    }
}
.copyright {
    font-size: 1rem;
    /deep/ p {
        font-variation-settings: 'wght' 350, 'wdth' 180;
        letter-spacing: 0.2;
    }
}
.social {
    font-size: 1.2rem;
    /deep/ p {
        font-variation-settings: 'wght' 350, 'wdth' 180;
        letter-spacing: 0.2;
    }
    /deep/ a {
        margin-right: 20px;
        &:last-child {
            margin-right: 0;
        }
    }
}
</style>
