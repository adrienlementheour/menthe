// 🚦Routing constants
export const routes = {
    home: {
        i18nFormat: 'index',
        routerFormat: 'index'
    },
    journalPage: {
        i18nFormat: 'journal/index',
        routerFormat: 'journal'
    }
};

export const routeByApiModels = {
    journal_page: routes.journalPage
};

// NOTE: You can prevent static routes from being generated by uncommenting the line below
const prodBlacklist = [
    // /\/dynamic/
];

const generalBlackList = [];

export const excludedStaticRoutes = (isProdEnv = process.env.isProdEnv) =>
    isProdEnv ? prodBlacklist : generalBlackList;
