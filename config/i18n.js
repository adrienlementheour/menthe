import { routes } from '../assets/js/constants/routes';

export const defaultLocale = 'en';

/**
 * NOTE: Make sure that default locale is the last one!
 * SEE: https://nuxt-community.github.io/nuxt-i18n/routing.html#strategy
 */
export const locales = [{ code: 'en', iso: 'en_US' }];

// 🚦 Specific routes
// NOTE: You can use isProdEnv to set conditionnal routes (not showing on prod for example)
export const getPagesList = (isProdEnv = process.env.isProdEnv) => ({
    [routes.journalPage.i18nFormat]: {
        // Conditionnal route example
        en: !isProdEnv ? '/journal' : false
    }
});
