import { pascalize } from '@stereorepo/sac';

import getAllSlugsQuery from '~/cms/queries/getAllSlugsQuery';

import errorPageQuery from '~/cms/queries/errorPageQuery';
import homePageQuery from '~/cms/queries/homePageQuery';

import journalQuery from '~/cms/queries/journalQuery';

import apolloClient from '~/config/apollo';

import { routeByApiModels } from '~/assets/js/constants/routes';

/**
 * I18n
 */
export const getLocaleIso = ({ app, store }) => {
    const { locale } = store.state.i18n;
    const { locales } = app.i18n ? app.i18n : app.$i18n;
    const [{ iso }] = locales.filter(({ code }) => {
        return code === locale;
    });
    return iso;
};

/**
 * Slugs
 */
const getSlug = ({ app, routePath }) =>
    app.i18n.locales
        .reduce((acc, { code }) => {
            const [firstUrlPart] = acc;
            if (code === firstUrlPart) acc.shift();
            return acc;
        }, routePath.split('/').filter(Boolean))
        .pop();

// SEE: https://nuxt-community.github.io/nuxt-i18n/lang-switcher.html#dynamic-route-parameters
const storeSlugs = async ({ app, pageContent: { _allSlugLocales }, store }) => {
    const { locales } = app.i18n ? app.i18n : app.$i18n;
    const codeByIso = locales.reduce((acc, { code, iso }) => ({ ...acc, [iso]: code }), {});

    const i18nRouteParams = _allSlugLocales.reduce((acc, { locale: iso, value: slug }) => {
        if (!codeByIso[iso]) return acc;
        return { ...acc, [codeByIso[iso]]: { slug } };
    }, {});

    await store.dispatch('i18n/setRouteParams', i18nRouteParams);
};

/**
 * Query related
 */
const makeQuery = async ({ app, query, slug = null, store }) => {
    // Getting the locale iso code for your cms
    const iso = getLocaleIso({ app, store });

    const variables = { lang: iso };

    if (slug) {
        variables.slug = slug;
    }

    const data = await apolloClient
        .query({
            variables,
            query
        })
        .then(({ data }) => data)
        .catch(err => {
            console.error(err);
        });

    return data;
};

/**
 * Dynamic pages validation
 */
export const validateDynamicPage = async ({ app, routePath, routeName, store }) => {
    // Getting the current slug
    const slug = getSlug({
        app,
        routePath
    });

    // Getting the locale iso code for the query
    const iso = getLocaleIso({
        app,
        store
    });
    const variables = { lang: iso };

    // Setting the default query

    // Removing the locale from the current route name
    const currentRouteName = routeName
        .split('-')
        .slice(0, -1)
        .join('-');

    // Getting the query page name
    const [[apiModel]] = Object.entries(routeByApiModels).filter(
        ([, { routerFormat }]) => routerFormat === currentRouteName
    );

    const queryPageName = `all${pascalize(apiModel.replace(/_/g, ' '))}s`;
    const query = getAllSlugsQuery(queryPageName);

    const data = await apolloClient
        .query({ variables, query })
        .then(({ data }) => data)
        .catch(err => {
            console.error(err);
        });

    const [dataArray] = Object.values(data);

    const allSlugs = dataArray
        .reduce((acc, { _allSlugLocales }) => [...acc, ..._allSlugLocales], [])
        .map(({ value }) => value);

    return allSlugs.includes(slug);
};

/**
 * Pages getters exports
 */

// Home page
export const getHome = async ({ app, store }) => {
    // ~/pages/index graphql query call
    // SEE: ~/cms/queries/homePageQuery
    const { homePage } = await makeQuery({ app, query: homePageQuery, store });

    return Object.freeze(homePage);
};

export const getJournal = async ({ app, store }) => {
    // ~/pages/dynamic/index graphql query call
    // SEE: ~/cms/queries/journal
    const { journal } = await makeQuery({
        app,
        query: journalQuery,
        store
    });

    return Object.freeze(journal);
};

// Error
export const getErrorPage = async ({ app, store }) => {
    // ~/layout/error page graphql query call
    // SEE: ~/cms/queries/errorPageQuery
    const { errorPage } = await makeQuery({ app, query: errorPageQuery, store });

    return Object.freeze(errorPage);
};
