import gql from 'graphql-tag';

export default gql`
    query JournalPage($lang: SiteLocale) {
        journalPage(locale: $lang) {
            entityTitle
        }
    }
`;
