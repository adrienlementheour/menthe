import gql from 'graphql-tag';

export default gql`
    query Crawler($lang: SiteLocale) {
        allBasicPages(locale: $lang) {
            slug
            _modelApiKey
        }
        allDynamicSinglePages(locale: $lang) {
            slug
            _modelApiKey
        }
    }
`;
