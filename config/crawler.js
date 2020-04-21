import gql from 'graphql-tag';

export default gql`
    query Crawler($lang: SiteLocale) {
        _site {
            __typename
        }
    }
`;
