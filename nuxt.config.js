import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

import robotsOptions from './config/robots';

import { excludedStaticRoutes } from './assets/js/constants/routes';
import { defaultLocale, locales, getPagesList } from './config/i18n';
import enTranslation from './locales/en.json';

import { layoutDataQuery, globalSeoQuery } from './config/layout-data';
import crawlerQuery from './config/crawler';
import redirectionsQuery from './config/redirections';
import { blacklist as staticDataBlacklist } from './config/static-data';

/*
 ** NOTE:
 ** The NODE_ENV will always be equal to 'production' when we generate
 ** the website. Thus, we don't have a dev/production env variable
 ** for the preproduction environnement.
 ** The STATE_ENV variable allow us to set a dev/production variable
 ** totaly decorrelated from the NODE_ENV variable.
 ** SEE: https://vercel.com/docs/v2/build-step#environment-variables
 */
const stateEnv = process.env.NODE_ENV;
const isDevEnv = stateEnv === 'development';
const isProdEnv = stateEnv === 'production';
const websiteUrl = `https://${process.env.NOW_URL}` || `http://${process.env.HOST}:${process.env.PORT}`;

export default {
    mode: 'universal',
    /*
     ** Environnement variables shared for the client and server-side
     */
    env: { datoToken: process.env.DATO_TOKEN, isDevEnv, isProdEnv, websiteUrl },
    /*
     ** Headers of the page
     */
    head: {
        title: 'Menthé — Adrien Le Menthéour',
        htmlAttrs: {
            lang: 'fr'
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
            {
                hid: 'author',
                name: 'author',
                content: 'Adrien Le Menthéour'
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: 'Menthé — Adrien Le Menthéour'
            },
            {
                hid: 'og:site_name',
                property: 'og:site_name',
                content: 'Menthé'
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content: 'https://menthe.tech'
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: 'https://menthe.tech/share.png'
            },
            {
                hid: 'og:image:width',
                property: 'og:image:width',
                content: '1200'
            },
            {
                hid: 'og:image:height',
                property: 'og:image:height',
                content: '630'
            },
            {
                hid: 'og:image:type',
                property: 'og:image:type',
                content: 'image/png'
            },
            {
                hid: 'og:image:alt',
                property: 'og:image:alt',
                content: 'Menthé — Adrien Le Menthéour'
            },
            {
                hid: 'twitter:card',
                name: 'twitter:card',
                content: 'summary_large_image'
            },
            {
                hid: 'twitter:site',
                name: 'twitter:site',
                content: '@adrienleme'
            },
            {
                hid: 'twitter:creator',
                name: 'twitter:creator',
                content: '@adrienleme'
            },
            {
                hid: 'twitter:image',
                name: 'twitter:image',
                content: 'https://menthe.tech/share.png'
            },
            {
                name: 'msapplication-TileColor',
                content: '#000000'
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/favicon-32x32.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/favicon-16x16.png'
            },
            {
                rel: 'mask-icon',
                href: '/safari-pinned-tab.svg',
                color: '#242424'
            },
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/apple-touch-icon.png'
            }
        ]
    },
    /*
     ** Customize the progress-bar
     */
    loading: '~/components/Layout/Loader.vue',
    /*
     ** Global CSS
     */
    css: ['~/assets/scss/main.scss'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: ['~/plugins/globals.js', '~/plugins/breakpoints.js', '~/plugins/myfilters.js'],
    /*
     ** Nuxt.js dev-modules
     ** SEE: https://github.com/Atinux/nuxt-prismic-showcase/tree/master/modules
     */
    buildModules: ['~/modules/crawler-module', '~/modules/redirections-module', '~/modules/static-data-module'],
    /*
     ** Crawler configuration
     ** NOTE: No need for crawler query if you don't have dynamic pages
     */
    crawler: {
        /**
         * The GraphQL query that will get all the slugs available for generation.
         * SEE: ~/config/crawler
         */
        query: crawlerQuery
    },
    /*
     ** Redirections configuration
     */
    redirections: {
        /**
         * The GraphQL query that will get all the redirections available.
         * SEE: ~/config/redirections
         */
        query: redirectionsQuery
    },
    /*
     ** Static data module configuration
     */
    staticData: {
        /**
         * Blacklisting all the urls containing the strings below.
         * Those routes would not be static.
         * SEE: ~/config/static-data
         */
        blacklist: staticDataBlacklist
    },
    /*
     ** Generate configuration
     */
    generate: {
        fallback: '404.html',
        exclude: excludedStaticRoutes(isProdEnv)
    },
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/dotenv',
        '~/modules/initFragmentMatcher',
        '~/modules/initLayoutData',
        '@nuxtjs/style-resources',
        // Doc: https://nuxt-community.github.io/nuxt-i18n/
        [
            'nuxt-i18n',
            {
                locales,
                strategy: 'prefix_except_default',
                defaultLocale,
                routesNameSeparator: '-',
                parsePages: false, // Disable acorn parsing
                pages: getPagesList(isProdEnv),
                vueI18n: {
                    fallbackLocale: defaultLocale,
                    messages: {
                        fr: enTranslation || {}
                    }
                },
                vuex: {
                    syncLocale: true,
                    syncMessages: true,
                    syncRouteParams: true
                }
            }
        ],
        '@nuxtjs/pwa',
        '@nuxtjs/sitemap',
        [
            '@nuxtjs/robots',
            robotsOptions({
                env: stateEnv,
                url: websiteUrl
            })
        ]
    ],
    /*
     ** Layout data configuration
     */
    layoutData: {
        layoutDataQuery,
        globalSeoQuery
    },
    /*
     ** PWA configuration
     */
    pwa: {
        // SEE: https://developer.mozilla.org/en-US/docs/Web/Manifest
        manifest: {
            name: 'Menthé — Adrien Le Menthéour',
            short_name: 'Menthé',
            description:
                "Front‑end developer with a graphic design background. I've worked on a lot of {exciting} startup websites.",
            start_url: 'https://menthe.tech',
            display: 'standalone',
            lang: 'en-US',
            dir: 'ltr',
            theme_color: '#000000',
            background_color: '#000000',
            categories: ['design', 'development', 'social', 'website', 'web', 'technology'],
            icons: [
                {
                    src: 'https://menthe.tech/icon-small.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: 'https://menthe.tech/icon-large.png',
                    sizes: '512x512',
                    type: 'image/png'
                }
            ],
            screenshots: [
                {
                    src: 'https://menthe.tech/share.png',
                    sizes: '1200x630',
                    type: 'image/png'
                }
            ]
        },
        workbox: {
            runtimeCaching: [
                {
                    urlPattern: `${websiteUrl}/static-media/.*`,
                    handler: 'cacheFirst'
                }
            ]
        }
    },
    /*
     ** Nuxt Style Resources module configuration
     */
    styleResources: {
        scss: [
            '~/assets/scss/abstracts/_variables.scss',
            '~/assets/scss/abstracts/_animations.scss',
            '~/assets/scss/abstracts/_functions.scss',
            '~/assets/scss/abstracts/_mixins.scss',
            '~/assets/scss/abstracts/_placeholders.scss'
        ]
    },
    /*
     ** Sitemap configuration
     */
    sitemap: {
        hostname: websiteUrl,
        gzip: true,
        routes: () => {
            let routes = [];
            const routesPath = path.resolve(__dirname, 'dist/routes.json');
            const exists = fs.existsSync(routesPath);
            if (!exists) return routes;
            routes = require(routesPath);
            return routes;
        }
    },
    /*
     ** Build configuration
     ** You can extend webpack configuration here
     */
    build: {
        /*
         ** Used to analyse chunks
         */
        analyze: isDevEnv ? { analyzerMode: 'static' } : false,
        /*
         ** Transpile specific dependencies with Babel
         */
        transpile: [/@stereorepo/],
        /*
         ** Nuxt SplitChunks configuration
         */
        splitChunks: {
            layouts: true,
            pages: true,
            commons: true
        },
        /*
         ** Webpack optimization configuration
         */
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        test: /node_modules[\\/]/,
                        minSize: 100000,
                        maxSize: 200000,
                        priority: 9,
                        name: true
                    }
                }
            }
        },
        extend(config, ctx) {
            config.resolve.alias['vue'] = 'vue/dist/vue.common';
            delete config.resolve.alias['@@'];
            delete config.resolve.alias['@'];

            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.devtool = 'source-map';
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    include: [path.resolve(__dirname, 'assets', 'js')],
                    exclude: /(node_modules)/,
                    options: {
                        sourceMap: true
                    }
                });
            }
        }
    }
};
