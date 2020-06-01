import gql from 'graphql-tag';
import linkFragment from '../fragments/linkFragment';

export default gql`
    ${linkFragment}
    query HomePage($lang: SiteLocale) {
        homePage(locale: $lang) {
            entityTitle
            heroFirstPart
            heroLinkWord
            heroSecondPart
            asterisk
            clientsTitle
            clientsSubtitle
            clients {
                _modelApiKey
                id
                clientName
                hasLink
                clientLink {
                    ...link
                }
                linkedTools {
                    id
                    toolName
                }
            }
            noLinkLabel
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
