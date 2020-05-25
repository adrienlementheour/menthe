<template>
    <div class="contact container">
        <a class="contact-link" href="mailto:hi@menthe.tech">
            <span class="big-title">
                {{ contactData.bigText }}
            </span>
            <span class="small-title">
                {{ contactData.smallText }}
            </span>
        </a>
    </div>
</template>

<script>
import layoutData from '~/cms/data/layout-data.json';

export default {
    data() {
        return {
            contactData: layoutData[this.$store.state.i18n.locale].contact
        };
    }
};
</script>

<style lang="scss" scoped>
.contact-link {
    display: block;
    padding: #{2 * $line-height} 0;
    font-feature-settings: 'salt' on;
    text-align: center;
    text-decoration: none;
    font-size: 2.8rem;
    > span {
        display: block;
    }
}
.big-title {
    font-weight: 800;
}
.small-title {
    font-weight: 400;
    color: var(--tertiary);
}

@media (min-width: $desktop-small) {
    .contact-link {
        padding: #{2 * $line-height} 0;
        font-size: 4rem;
        line-height: 2 * $line-height;
    }
}
@media (min-width: $desktop) {
    .contact-link {
        padding: #{4 * $line-height} 0;
        font-size: 6rem;
        > span {
            display: inline;
        }
    }
}
</style>
