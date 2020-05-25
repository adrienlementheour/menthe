<template>
    <footer class="footer">
        <div class="footer-content container">
            <div class="footer-text" v-html="footerData.text" />
            <div class="copyright" v-html="footerData.copyright" />
            <div class="social">
                <Routing
                    v-for="link in footerData.socialLinks"
                    :key="link.id"
                    class="link-arrow social-link"
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
    > div {
        padding-left: var(--gutter);
        padding-right: var(--gutter);
    }
}
.footer-text {
    flex: 0 0 auto;
    width: 100%;
    /deep/ p {
        margin: 0;
    }
}
.copyright,
.social {
    flex: 0 0 auto;
    width: 50%;
    margin-top: $line-height;
    /deep/ p {
        margin: 0;
    }
}
.copyright {
    font-size: 1.2rem;
}
.social {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    /deep/ a {
        margin-right: 20px;
        &:last-child {
            margin-right: 0;
        }
    }
}

@media (min-width: $desktop-small) {
    .copyright,
    .footer-text,
    .social {
        width: calc(#{var(--col)} * 3);
    }
    .copyright {
        order: 1;
        font-size: 1.6rem;
    }
    .footer-text {
        order: 2;
        font-size: 1.6rem;
    }
    .social {
        order: 3;
        justify-content: flex-end;
        font-size: 1.6rem;
    }
}
@media (min-width: $desktop) {
    .social {
        font-size: 1.8rem;
    }
}
</style>
