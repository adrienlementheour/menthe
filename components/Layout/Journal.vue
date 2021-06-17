<template>
    <div class="journal initial-anim">
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
                <div v-for="(finding, index) in displayedFindings" :key="finding.id" class="finding">
                    <div class="finding-number">
                        <span>#</span><span>{{ nbFindings - index }}</span>
                    </div>
                    <div class="finding-desc">
                        <div class="finding-title">
                            {{ finding.title }}
                        </div>
                        <div class="wrapper-date-category">
                            <div class="finding-date">
                                {{ finding.createdAt | toClassicDate }}
                            </div>
                            <div class="wrapper-category">
                                <div class="finding-category">
                                    {{ finding.category }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Routing
                        v-if="finding.hasLink"
                        :link="{ data: finding.findingLink, type: 'from-cms' }"
                        target="_blank"
                        rel="noopener nofollow noreferrer"
                        class="finding-content link-arrow"
                        v-html="finding.content"
                    />
                    <div v-else class="finding-content" v-html="finding.content" />
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
        },
        display: {
            type: Number,
            required: false,
            default: 3
        }
    },
    data() {
        return {
            displayedFindings: null,
            nbFindings: 0
        };
    },
    mounted() {
        this.displayedFindings = this.display
            ? this.content.findings.reverse().slice(0, this.display)
            : this.content.findings.reverse();
        this.nbFindings = this.content.findings.length;
    }
};
</script>

<style lang="scss" scoped>
.journal {
    padding: #{2 * $line-height} 0;
    border-top: 1px solid var(--tertiary);
    border-bottom: 1px solid var(--tertiary);
    transition-delay: 0.4s;
}
.finding {
    margin-top: $line-height;
}
.finding-number {
    font-size: 1.8rem;
    font-weight: 900;
}
.finding-title {
    font-size: 1.8rem;
    font-weight: 900;
}
.wrapper-date-category {
    position: relative;
    top: 0.1em;
    display: flex;
    align-items: baseline;
    > div {
        flex: 0 0 auto;
        width: 50%;
    }
}
.finding-date {
    font-size: 1.2rem;
    font-weight: 800;
}
.wrapper-category {
    display: grid;
    justify-content: flex-start;
}
.finding-category {
    position: relative;
    font-size: 1.2rem;
    &::before {
        content: '';
        position: absolute;
        top: -1px;
        right: -4px;
        bottom: 2px;
        left: -4px;
        border: 1px solid var(--tertiary);
    }
}
.finding-content {
    &.link-arrow {
        position: relative;
        &:focus {
            &::before {
                opacity: 1;
            }
        }
        &::before {
            content: '';
            position: absolute;
            top: -2px;
            right: -6px;
            bottom: 0;
            left: -6px;
            background: var(--tertiary);
            opacity: 0;
            z-index: -1;
        }
        &::after {
            content: none;
            margin: 0;
        }
        /deep/ p {
            &::after {
                content: '\2197\FE0E';
                margin-left: 0.3em;
            }
        }
    }
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
        align-items: baseline;
        .ie11 & {
            flex-direction: column;
        }
        > div {
            flex: 0 0 auto;
        }
    }
    .finding-desc {
        order: 1;
        width: calc(#{var(--col)} * 3);
        .ie11 & {
            order: 2;
            width: 100%;
        }
    }
    .finding-content {
        order: 2;
        width: calc(#{var(--col)} * 5);
        .ie11 & {
            width: 100%;
            order: 3;
        }
        &.link-arrow {
            &::before {
                top: -4px;
                right: 0;
                bottom: -2px;
                left: 0;
            }
        }
    }
    .finding-number {
        order: 3;
        width: calc(#{var(--col)} * 1);
        .ie11 & {
            order: 1;
            width: 100%;
        }
    }
}
@media (min-width: $desktop) {
    .wrapper-date-category {
        top: 0.15em;
    }
    .finding-title {
        font-size: 2.4rem;
    }
    .finding-date {
        font-size: 1.6rem;
    }
    .finding-category {
        font-size: 1.6rem;
    }
    .finding-content {
        font-size: 1.8rem;
    }
    .finding-number {
        font-size: 2.4rem;
    }
}
</style>
