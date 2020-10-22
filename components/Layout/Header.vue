<template>
    <header class="main-header container full-content">
        <div class="header-title initial-anim" v-html="headerData.title" />
        <div class="wrapper-mode initial-anim">
            <button type="button" class="btn-mode" aria-label="Toggle dark mode" @click="toggleDarkMode">
                <span class="wrapper-rays">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                </span>
            </button>
        </div>
        <div class="column one initial-anim">
            {{ headerData.columnOne }}
            <Routing
                v-if="headerData.columnOneLink"
                class="link-arrow framed"
                target="_blank"
                rel="noopener nofollow noreferrer"
                :link="{ data: headerData.columnOneLink, type: 'from-cms' }"
            />
        </div>
        <div class="column two initial-anim">
            {{ headerData.columnTwo }}
            <Routing
                v-if="headerData.columnTwoLink"
                class="link-arrow underlined"
                target="_blank"
                rel="noopener nofollow noreferrer"
                :link="{ data: headerData.columnTwoLink, type: 'from-cms' }"
            />
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
    },
    computed: {
        manualColorMode() {
            return this.$store.state.manualColorMode;
        }
    },
    methods: {
        toggleDarkMode() {
            if (localStorage.getItem('colorMode') !== '') {
                this.$store.commit('setManualColorMode', true);
                if (localStorage.getItem('colorMode') === 'light') {
                    this.$store.commit('setManualDarkMode', true);
                    localStorage.setItem('colorMode', 'dark');
                } else {
                    this.$store.commit('setManualDarkMode', false);
                    localStorage.setItem('colorMode', 'light');
                }
            } else {
                this.$store.commit('setManualColorMode', true);
                if (window.matchMedia) {
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                        // from dark to light mode
                        this.$store.commit('setManualDarkMode', false);
                        localStorage.setItem('colorMode', 'light');
                    } else {
                        // from light to dark mode
                        this.$store.commit('setManualDarkMode', true);
                        localStorage.setItem('colorMode', 'dark');
                    }
                } else {
                    this.$store.state.manualDarkMode = !this.manualColorMode;
                }
            }
        }
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
    font-size: 1.6rem;
    font-weight: 800;
    /deep/ p {
        margin: 0;
    }
}
.wrapper-mode {
    flex: 0 0 auto;
    display: flex;
    justify-content: flex-end;
    width: 50px;
    transition-delay: 0.3s;
}
.column {
    flex: 0 0 auto;
    width: 100%;
    margin-top: $line-height;
    font-size: 1.6rem;
    &.one {
        transition-delay: 0.1s;
    }
    &.two {
        transition-delay: 0.2s;
    }
}
.btn-mode {
    position: relative;
    display: block;
    width: $line-height;
    height: $line-height;
    border-radius: 50%;
    border: 0;
    background: var(--secondary);
    z-index: 1;
    &:focus {
        outline: none;
        background: var(--tertiary);
        .wrapper-rays {
            > span {
                &::before {
                    background: var(--tertiary);
                }
            }
        }
    }
    .wrapper-rays {
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 44px;
        height: 44px;
        margin: -22px 0 0 -24px;
        transform-origin: 50% 50%;
        transform: scale(1);
        transition: transform 0.2s ease-out;
        pointer-events: none;
        z-index: -1;
        > span {
            &::before {
                content: '';
                display: block;
                width: 1px;
                height: 100%;
                margin: 0 1px;
                background: var(--secondary);
            }
            display: block;
            width: 3px;
            height: 50%;
            position: absolute;
            top: 0;
            left: 50%;

            transform-origin: 50% 100%;
            $nb-rays: 12;
            @for $i from 1 through $nb-rays {
                &:nth-child(#{$i}) {
                    transform: rotate(#{360 / $nb-rays * $i - 360 / $nb-rays}deg);
                }
            }
        }
    }
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

@media (prefers-color-scheme: dark) {
    .btn-mode {
        &:hover {
            .wrapper-rays {
                transform: scale(1);
            }
        }
        .wrapper-rays {
            transform: scale(0);
        }
    }
}
.darkmode {
    .btn-mode {
        .wrapper-rays {
            transform: scale(0);
        }
    }
}
.lightmode {
    .btn-mode {
        .wrapper-rays {
            transform: scale(1);
        }
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
        font-size: 2rem;
    }
    .column {
        font-size: 2rem;
    }
}
</style>
