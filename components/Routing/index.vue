<template>
    <nuxt-link
        v-if="link.type === 'from-cms' && linkData.type === 'internal'"
        :to="linkData.url"
        :aria-label="linkData.ariaLabel"
        :event="eventEnabler"
        v-on="$listeners"
    >
        {{ linkData.text }}
    </nuxt-link>
    <a
        v-else-if="link.type === 'from-cms' && linkData.type === 'external'"
        :href="linkData.url"
        :aria-label="linkData.ariaLabel"
        :event="eventEnabler"
        v-on="$listeners"
    >
        {{ linkData.text }}
    </a>
    <nuxt-link
        v-else-if="link.type === 'internal'"
        :to="linkData.url"
        :aria-label="linkData.ariaLabel"
        :event="eventEnabler"
        v-on="$listeners"
    >
        <slot />
    </nuxt-link>
    <a
        v-else-if="link.type === 'external'"
        :href="linkData.url"
        :aria-label="linkData.ariaLabel"
        :event="eventEnabler"
        v-on="$listeners"
    >
        <slot />
    </a>
</template>
<script>
import { resolveLinkData } from '~/assets/js/resolvers/link-resolver';
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        link: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            linkData: this.callResolver()
        };
    },
    computed: {
        eventEnabler() {
            return this.disabled ? '' : 'click';
        }
    },
    watch: {
        link() {
            this.linkData = this.callResolver();
        }
    },
    mounted() {
        if (!this.linkData) this.$destroy();
    },
    methods: {
        callResolver() {
            return resolveLinkData({
                link: this.link,
                localePath: this.localePath
            });
        }
    }
};
</script>
