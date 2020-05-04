<template>
    <div class="journal">
        <div class="content-journal container full-content">
            <div class="wrapper-title-journal">
                <h3 class="square-title">
                    {{ content.journalTitle }}
                </h3>
                <h4 class="square-subtitle">
                    {{ content.journalSubtitle }}
                </h4>
            </div>
            <div class="findings">
                <div v-for="finding in content.findings" :key="finding.id" class="finding">
                    <div class="finding-number">
                        #1
                    </div>
                    <div class="finding-desc">
                        <div class="finding-title">
                            {{ finding.title }}
                        </div>
                        <div class="wrapper-date-category">
                            <div class="finding-date">
                                {{ finding.createdAt | toClassicDate }}
                            </div>
                            <div class="finding-category">
                                {{ finding.category }}
                            </div>
                        </div>
                    </div>
                    <div class="finding-content" v-html="finding.content" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        content: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.journal {
    padding: #{2 * $line-height} 0;
    border-top: 1px solid var(--tertiary);
    border-bottom: 1px solid var(--tertiary);
}
.finding {
    margin-top: $line-height;
}
.finding-number {
    font-size: 1.8rem;
    font-variation-settings: 'wght' 700, 'wdth' 190;
}
.finding-title {
    font-size: 1.8rem;
    font-variation-settings: 'wght' 700, 'wdth' 190;
}
.wrapper-date-category {
    display: flex;
    align-items: flex-start;
    > div {
        flex: 0 0 auto;
        width: 50%;
    }
}
.finding-date {
    font-size: 1.2rem;
    font-variation-settings: 'wght' 600, 'wdth' 100;
}
.finding-content {
    /deep/ p {
        margin: 0;
    }
}

@media (min-width: $desktop-small) {
    .journal {
        padding: 0;
    }
    .content-journal {
        position: relative;
        padding: #{5 * $line-height} 0;
        &::before,
        &::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            border-right: 1px solid var(--tertiary);
        }
        &::before {
            left: calc(#{var(--col)} * 3);
        }
        &::after {
            left: calc(#{var(--col)} * 8);
        }
    }
    .finding {
        margin-top: 3 * $line-height;
    }
    .wrapper-title-journal,
    .finding-desc,
    .finding-content,
    .finding-number {
        padding-left: var(--gutter);
        padding-right: var(--gutter);
    }
    .wrapper-title-journal {
        width: calc(#{var(--col)} * 3);
    }
    .finding {
        display: flex;
        > div {
            flex: 0 0 auto;
        }
    }
    .finding-desc {
        order: 1;
        width: calc(#{var(--col)} * 3);
    }
    .finding-content {
        order: 2;
        width: calc(#{var(--col)} * 5);
    }
    .finding-number {
        order: 3;
        width: calc(#{var(--col)} * 1);
    }
}
@media (min-width: $desktop) {
    .finding-title {
        font-size: 2.4rem;
    }
    .finding-date {
        font-size: 1.4rem;
    }
    .finding-category {
        font-size: 1.4rem;
    }
    .finding-content {
        font-size: 1.6rem;
    }
    .finding-number {
        font-size: 2.4rem;
    }
}
</style>
