import gql from 'graphql-tag';
import linkFragment from '../fragments/linkFragment';

export default gql`
    ${linkFragment}
    query Journal($lang: SiteLocale) {
        journal(locale: $lang) {
            entityTitle
            _modelApiKey
            id
            journalTitle
            journalSubtitle
            findings {
                _modelApiKey
                id
                createdAt
                title
                content
                hasLink
                category
                findingLink {
                    ...link
                }
            }
        }
    }
`;
