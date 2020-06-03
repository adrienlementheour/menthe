<template>
    <div>
        <div class="wrapper-hero container full-content initial-anim">
            <div class="hero">
                <h1>
                    <span v-html="$options.filters.removeParagraphAround(cmsData.heroFirstPart)" />
                    <span
                        class="hero-link-word"
                        @mouseover="linkClients"
                        @mouseleave="clearPath"
                        @mousemove="updateShapes"
                        >{{ cmsData.heroLinkWord }}</span>
                    <span v-html="$options.filters.removeParagraphAround(cmsData.heroSecondPart)" />
                </h1>
            </div>
            <div class="asterisk">
                {{ cmsData.asterisk }}
            </div>
        </div>
        <div class="wrapper-clients-stack container full-content initial-anim">
            <div class="wrapper-presentation clients">
                <div ref="clientBlock" class="square-block">
                    <h3 class="square-title">
                        {{ cmsData.clientsTitle }}
                    </h3>
                    <h4 class="square-subtitle">
                        {{ cmsData.clientsSubtitle }}
                    </h4>
                </div>
                <div class="clients">
                    <span
                        v-for="client in cmsData.clients"
                        :key="client.id"
                        class="client"
                        @mouseover="linkTool(client.linkedTools, $event)"
                        @mouseleave="clearTools"
                        @mousemove="updateShapes"
                    >
                        <Routing
                            v-if="client.hasLink"
                            :link="{ data: client.clientLink, type: 'from-cms' }"
                            target="_blank"
                            rel="noopener nofollow noreferrer"
                        />
                        <span v-else class="no-link">
                            <span>{{ client.clientName }}</span
                            ><span class="no-link-label">{{ cmsData.noLinkLabel }}</span>
                        </span>
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
                    <div v-for="line in stacks" :key="line.id" class="stack-line">
                        <span
                            v-for="tool in line"
                            :id="tool.id"
                            :key="tool.id"
                            class="tool"
                            :class="{ 'is-active': tool.isActive }"
                        >
                            <span>{{ tool.toolName }}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <Journal :content="cmsData.journal" :display="3" />
    </div>
</template>

<script>
import Journal from '~/components/Layout/Journal';

export default {
    components: { Journal },
    props: {
        cmsData: { type: Object, required: true }
    },
    data() {
        return {
            activedTools: [],
            clientBlock: null,
            clientShape: {}
        };
    },
    computed: {
        windowWidth() {
            if (!this.$store.state.superWindow) return Infinity;
            return this.$store.state.superWindow.width;
        },
        stacks() {
            return this.cmsData.stack.map(line => {
                return line.stackLine.map(tool => {
                    tool.isActive = this.activedTools.includes(tool.id);
                    return tool;
                });
            });
        },
        paths() {
            return this.$store.state.paths;
        },
        scrollTop() {
            return this.$store.state.scroll.scrollTop;
        },
        isTouch() {
            return this.$store.state.isTouch;
        }
    },
    watch: {
        scrollTop() {
            this.clearTools();
        }
    },
    mounted() {
        this.clientBlock = this.$refs.clientBlock;
    },
    methods: {
        linkTool(linkedTools, e) {
            if (this.windowWidth < this.$breakpoints.list.l && this.isTouch) return;
            const tools = linkedTools.map(tool => {
                return tool.id;
            });
            this.activedTools = tools;
            this.addPaths(e.clientX, e.clientY);
        },
        addPaths(x2, y2) {
            const shapes = this.activedTools.map(tool => {
                const domElement = document.getElementById(tool);
                const bbox = domElement.getBoundingClientRect();
                const x = bbox.left - 4;
                const y = bbox.top - 4 + bbox.height / 2;

                return {
                    x,
                    y,
                    x2,
                    y2
                };
            });

            this.$store.commit('addShapes', shapes);
        },
        updateShapes(e) {
            if (this.windowWidth < this.$breakpoints.list.l && this.isTouch) return;
            const x2 = e.clientX;
            const y2 = e.clientY;
            const updatedShapes = this.paths.map(({ x, y }) => {
                return {
                    x,
                    y,
                    x2,
                    y2
                };
            });
            this.$store.commit('setShapes', updatedShapes);
        },
        clearTools() {
            this.activedTools = [];
            this.$store.commit('clearShapes');
        },
        linkClients(e) {
            if (this.windowWidth < this.$breakpoints.list.l && this.isTouch) return;
            const bbox = this.clientBlock.getBoundingClientRect();
            const x = bbox.left + bbox.width / 2;
            const offsetTopBox = this.windowWidth < this.$breakpoints.list.xl ? 15 : 17;
            const y = bbox.top - offsetTopBox;
            const x2 = e.clientX;
            const y2 = e.clientY;

            this.clientShape = {
                x,
                y,
                x2,
                y2
            };

            this.$store.commit('addShapes', this.clientShape);
        },
        clearPath() {
            this.$store.commit('clearShapes');
        }
    }
};
</script>

<style lang="scss" scoped>
.wrapper-hero {
    margin-top: $line-height;
    margin-bottom: #{3 * $line-height};
    transition-delay: 0.4s;
}
.hero {
    font-feature-settings: 'salt' on;
    font-size: 3.2rem;
    font-weight: 400;
    line-height: 1.5 * $line-height;
    /deep/ h1 {
        font-weight: 400;
    }
    /deep/ strong {
        font-weight: 800;
    }
}
.hero-link-word {
    user-select: none;
}
.asterisk {
    margin-top: $line-height;
    font-size: 1.4rem;
    font-weight: 400;
}

.wrapper-clients-stack {
    display: flex;
    flex-direction: column;
    transition-delay: 0.4s;
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
        left: calc(#{var(--gutter)} * -1 - 10px);
        right: calc(#{var(--gutter)} * -1 - 10px);
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
    pointer-events: none;
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
    font-feature-settings: 'salt' on;
    font-size: 2.2rem;
    font-weight: 800;
    > * {
        position: relative;
        text-decoration: none;
        white-space: nowrap;
        pointer-events: all;
        &:focus {
            &::before {
                opacity: 1;
            }
        }
        &::before {
            content: '';
            position: absolute;
            top: -2px;
            right: -4px;
            bottom: 0;
            left: -4px;
            background: var(--tertiary);
            opacity: 0;
            z-index: -1;
        }
    }
    > span {
        user-select: none;
    }
    .no-link {
        position: relative;
        &:hover {
            .no-link-label {
                opacity: 1;
            }
        }
        .no-link-label {
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 1.6rem;
            font-weight: 400;
            line-height: $line-height;
            pointer-events: none;
            opacity: 0;
            transform: translate3d(-50%, -50%, 0);
            z-index: 1;
            &::before {
                content: '';
                position: absolute;
                top: -1px;
                right: -5px;
                bottom: 3px;
                left: -5px;
                border: 1px solid var(--primary);
                background: var(--tertiary);
                z-index: -1;
            }
        }
    }
}
.stack-lines {
    position: relative;
    top: 0.15em;
}
.stack-line {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    > span {
        margin-right: 7px;
        &::after {
            content: ',';
        }
        &:last-child {
            margin-right: 0;
            &::after {
                content: none;
            }
        }
    }
}
.tool {
    position: relative;
    font-feature-settings: 'salt' on;
    font-size: 1.8rem;
    font-weight: 800;
    line-height: #{2 * $line-height};
    &::before {
        content: '';
        position: absolute;
        top: 3px;
        right: -4px;
        bottom: 8px;
        left: -4px;
        border: 1px solid var(--tertiary);
        opacity: 0;
    }
    &.is-active {
        &::before {
            opacity: 1;
        }
    }
}

@media (min-width: $tablet) {
    .square-block {
        &::before {
            left: calc(#{var(--gutter)} * -1 - 22px);
            right: calc(#{var(--gutter)} * -1 - 22px);
        }
    }
}

@media (min-width: $desktop-small) {
    .wrapper-hero {
        margin-top: #{3 * $line-height};
        margin-bottom: #{3 * $line-height};
    }
    .hero {
        font-size: 5rem;
        line-height: 2 * $line-height;
    }
    .asterisk {
        font-size: 2rem;
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
    .client {
        font-size: 2.5rem;
        line-height: #{2 * $line-height};
    }
}

@media (min-width: $desktop) {
    .hero {
        font-size: 6rem;
        line-height: 3 * $line-height;
    }
    .asterisk {
        margin-top: 2 * $line-height;
        font-size: 2.4rem;
    }
    .square-block {
        &::after {
            top: -17px;
        }
        margin-bottom: 3 * $line-height;
    }
    .client {
        font-size: 3rem;
    }
    .tool {
        font-size: 2.2rem;
    }
}

@media (min-width: $desktop-large) {
    .wrapper-hero {
        margin-top: #{4 * $line-height};
        margin-bottom: #{4 * $line-height};
        @media (max-height: 750px) {
            margin-top: #{1 * $line-height};
            margin-bottom: #{3 * $line-height};
        }
        @media (max-height: 750px) {
            margin-top: #{1 * $line-height};
            margin-bottom: #{3 * $line-height};
        }
    }
    .hero {
        font-size: 7.2rem;
        line-height: 3 * $line-height;
    }
}

@media (min-width: $desktop-xxl) {
    .hero {
        font-size: 8rem;
        line-height: 4 * $line-height;
    }
}
</style>
