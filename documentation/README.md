# The documentation 📝

[Alban 🔥] In here you will find all the elements you need to understand the project as a whole.

> 🚨 **Nota bene**  
> This documentation has been generated from the answers gathered during the project initialization.

## Table of contents ✅

### General information

👉 [See below](##General)

### General sections
-   [CMS](./cms/README.md)
-   [Components](./components/README.md)
-   [Plugins](./plugins/README.md)

### Specific elements
-   [Crawler Module](./custom-nuxt-modules/Crawler.md)
-   [Layout Data Module](./custom-nuxt-modules/LayoutData.md)
-   [Redirections Module](./custom-nuxt-modules/Redirections.md)
-   [Static Data Module](./custom-nuxt-modules/StaticData.md)


## General

### Exclude static routes

In order to exclude static routes you'll need to go to the _routes.js_ file.
In there find you'll find the function _excludedStaticRoutes_. This function will return the routes to exclude to the _nuxt.config.js_'s _generate_ section.

```js
// We'll prevent the /dynamic* routes from being generated
const prodBlacklist = [/\/dynamic/];

const generalBlackList = [];

export const excludedStaticRoutes = (isProdEnv = process.env.isProdEnv) =>
    isProdEnv ? prodBlacklist : generalBlackList;
```

Now let's take a look at the _nuxt.config.js_ file. The _excludedStaticRoutes_ function is called and returning the blacklisted routes to the _exclude_ feature.

```js
/*
** Generate configuration
*/
generate: {
    fallback: '404.html',
    // We're calling the excludedStaticRoutes function which will return the routes to exclude.
    // SEE: ~/assets/js/constants/routes.js
    exclude: excludedStaticRoutes(isProdEnv)
},
```
