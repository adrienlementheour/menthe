<template>
    <div>
        <div class="hero container full-content" v-html="cmsData.hero" />
        <div class="wrapper-clients-stack container full-content">
            <div class="wrapper-presentation clients">
                <div class="square-block">
                    <h3 class="square-title">
                        {{ cmsData.clientsTitle }}
                    </h3>
                    <h4 class="square-subtitle">
                        {{ cmsData.clientsSubtitle }}
                    </h4>
                </div>
                <div class="clients">
                    <span v-for="client in cmsData.clients" :key="client.id" class="client">
                        <Routing v-if="client.hasLink" :link="{ data: client.clientLink, type: 'from-cms' }" />
                        <span v-else>{{ client.clientName }}</span>
                    </span>
                </div>
            </div>
            <div class="wrapper-presentation stack">
                <div class="square-block">
                    <h3 class="square-title">
                        {{ cmsData.stackTitle }}
                    </h3>
                    <h4 class="square-subtitle">
                        {{ cmsData.stackSubtitle }}
                    </h4>
                </div>
                <div class="stack-lines">
                    <div v-for="line in cmsData.stack" :key="line.id" class="stack-line">
                        <span v-for="tool in line.stackLine" :key="tool.id" class="tool">{{ tool.toolName }}</span>
                    </div>
                </div>
            </div>
        </div>
        <Journal :content="cmsData.journal" />
    </div>
</template>

<script>
import Journal from '~/components/Layout/Journal';

export default {
    components: { Journal },
    props: {
        cmsData: { type: Object, required: true }
    }
};
</script>

<style lang="scss" scoped>
.hero {
    margin-top: $line-height;
    margin-bottom: #{3 * $line-height};
    font-size: 2.6rem;
    font-variation-settings: 'wght' 700, 'wdth' 190;
    line-height: 1.5 * $line-height;
    /deep/ strong {
        font-variation-settings: 'wght' 150, 'wdth' 130;
    }
}

.wrapper-clients-stack {
    display: flex;
    flex-direction: column;
}
.wrapper-presentation {
    margin-bottom: 3 * $line-height;
}
.square-block {
    position: relative;
    margin-bottom: 2 * $line-height;
    z-index: 1;
    &::before,
    &::after {
        content: '';
        position: absolute;
        z-index: -1;
    }
    &::before {
        top: 50%;
        left: calc(#{var(--gutter)} * -1 - 20px);
        right: calc(#{var(--gutter)} * -1 - 20px);
        border-top: 1px solid var(--tertiary);
    }
    &::after {
        top: -15px;
        right: calc(#{var(--gutter)} * -1);
        bottom: -10px;
        left: calc(#{var(--gutter)} * -1);
        border: 1px solid var(--tertiary);
        background: var(--primary);
    }
}
.clients {
    > span {
        &::after {
            content: ', ';
        }
        &:last-child {
            &::after {
                content: none;
            }
        }
    }
}
.client {
    font-size: 1.8rem;
    font-variation-settings: 'wght' 700, 'wdth' 190;
    > * {
        text-decoration: none;
    }
}
.stack-line {
    margin-bottom: $line-height;
    > span {
        &::after {
            content: ', ';
        }
        &:last-child {
            &::after {
                content: none;
            }
        }
    }
}
.tool {
    font-size: 1.6rem;
    font-variation-settings: 'wght' 600, 'wdth' 100;
}

@media (min-width: $desktop-small) {
    .hero {
        margin-top: #{5 * $line-height};
        margin-bottom: #{5 * $line-height};
        font-size: 4rem;
        line-height: 2 * $line-height;
    }
    .wrapper-clients-stack {
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
        padding-left: 0;
        padding-right: 0;
    }
    .wrapper-presentation {
        flex: 0 0 auto;
        padding-left: var(--gutter);
        padding-right: var(--gutter);
        &.clients {
            width: calc(#{var(--col)} * 5);
            .square-block {
                width: percentage(2/3);
                &::before {
                    width: 100vw;
                    left: calc(#{var(--gutter)} * -1 - 20px);
                    right: auto;
                }
            }
        }
        &.stack {
            width: calc(#{var(--col)} * 3);
            .square-block {
                &::before {
                    content: none;
                }
            }
        }
    }
}

@media (min-width: $desktop) {
    .hero {
        margin-top: #{6 * $line-height};
        margin-bottom: #{6 * $line-height};
        font-size: 6rem;
        line-height: 3 * $line-height;
    }
    .square-block {
        &::after {
            top: -17px;
        }
        margin-bottom: 3 * $line-height;
    }
    .client {
        font-size: 2.4rem;
    }
    .tool {
        font-size: 1.8rem;
    }
}
</style>
