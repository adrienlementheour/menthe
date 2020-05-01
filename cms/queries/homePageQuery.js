import gql from 'graphql-tag';

export default gql`
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
        }
    }
`;
