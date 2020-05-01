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
                    <span v-for="client in cmsData.clients" :key="client.id" class="client">{{
                        client.clientName
                    }}</span>
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
    </div>
</template>

<script>
export default {
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
        left: calc(#{-$small-gutter} - 20px);
        right: calc(#{-$small-gutter} - 20px);
        border-top: 1px solid var(--tertiary);
    }
    &::after {
        top: -15px;
        right: -$small-gutter;
        bottom: -10px;
        left: -$small-gutter;
        border: 1px solid var(--tertiary);
        background: var(--primary);
    }
}
.square-title {
    font-size: 1.6rem;
    font-variation-settings: 'wght' 700, 'wdth' 190;
    letter-spacing: 1px;
    text-transform: uppercase;
}
.square-subtitle {
    font-size: 1.4rem;
    font-variation-settings: 'wght' 200, 'wdth' 150;
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
</style>
