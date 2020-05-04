import gql from 'graphql-tag';
import linkFragment from '../fragments/linkFragment';

export default gql`
    ${linkFragment}
    query HomePage($lang: SiteLocale) {
        homePage(locale: $lang) {
            entityTitle
            hero
            clientsTitle
            clientsSubtitle
            clients {
                _modelApiKey
                id
                clientName
            }
            stackTitle
            stackSubtitle
            stack {
                _modelApiKey
                id
                stackLine {
                    _modelApiKey
                    id
                    toolName
                }
            }
            journal {
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
    }
`;
