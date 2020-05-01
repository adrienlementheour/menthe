import { routes, routeByApiModels } from '../constants/routes';
const cmsLinkResolver = ({
    data: { linkLabel, linkTitle, isExternal, externalLink, isInternal, internalLink },
    localePath
}) => {
    if (isExternal && externalLink) {
        return {
            ariaLabel: linkTitle,
            url: externalLink,
            text: linkLabel,
            type: 'external'
        };
    } else if (isInternal && internalLink) {
        const { _modelApiKey, slug } = internalLink;
        const { routerFormat } = routeByApiModels[_modelApiKey];
        const params = slug ? { [routerFormat.split('-').pop()]: slug } : {};
        const url = localePath({
            name: routerFormat,
            params
        });
        return {
            ariaLabel: linkTitle,
            url,
            text: linkLabel,
            type: 'internal'
        };
    } else {
        // If no toggle selected
        if (!isExternal && !isInternal) {
            console.warn(
                `The link named "${linkLabel}" encountered an issue with the cmsLinkResolver method. There is some chance that neither the option "isInternal", nor the option "isExternal" were selected in the CMS.`
            );
        }
        // If no external link
        if (isExternal && !externalLink) {
            console.warn(
                `The link named "${linkLabel}" encountered an issue with the cmsLinkResolver method. There is some chance that you selected the option "isExternal" and did not fill the "externalLink" field.`
            );
        }
        // If no internal link
        if (isInternal && !internalLink) {
            console.warn(
                `The link named "${linkLabel}" encountered an issue with the cmsLinkResolver method. There is some chance that you selected the option "isInternal" and did not fill the "internalLink" field.`
            );
        }
        return null;
    }
};
const internalLinkResolver = ({ data: { ariaLabel, name, slug }, localePath }) => {
    const { routerFormat } = routes[name];
    const params = slug ? { [routerFormat.split('-').pop()]: slug } : {};
    const url = localePath({
        name: routerFormat,
        params
    });
    return { ariaLabel: ariaLabel, url };
};
const externalLinkResolver = ({ ariaLabel, url }) => {
    return { ariaLabel: ariaLabel, url };
};
export const resolveLinkData = ({ link: { data, type }, localePath }) => {
    switch (type) {
        case 'from-cms':
            return cmsLinkResolver({ data, localePath });
        case 'internal':
            return internalLinkResolver({ data, localePath });
        case 'external':
            return externalLinkResolver(data);
        default:
            throw new Error('The type passed to the link attribute is not valid.');
    }
};
