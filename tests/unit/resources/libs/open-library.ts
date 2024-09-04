export const findBooksBySubjectHttpResponse = {
    key: '/subjects/photography',
    name: 'photography',
    subject_type: 'subject',
    work_count: 27540,
    works: [
        {
            key: '/works/OL86318W',
            title: 'Ulysses',
            edition_count: 584,
            subject: [
                'Leopold Bloom (Fictitious character)',
                'English Manuscripts',
                'Classic Literature',
                'Domestic fiction',
                'Proofs (Printing)',
                'Prohibited books',
                'Bloom, Leopold (Personaje literario)',
                'Open Library Staff Picks',
                'Immoral Literature',
                'open_syllabus_project',
                'Translations into Irish',
                'City and town life',
                'Law and legislation',
                'Manuscripts',
                'Hombres',
                'Artists',
                'Ficción',
                'Friendship, fiction',
                'Joyce, james, 1882-1941',
                'Photograph collections',
                'Revolutions',
                'Revolutionaries',
                'Photography',
                'Pictorial works',
                'History',
                'Artists, fiction',
                'Fiction, general',
                'English fiction',
                'English literature',
                'Ireland, fiction',
                'Fiction, family life, general',
                'New York Times reviewed',
                'Fiction, erotica, general',
                'Vie urbaine',
                'Romans, nouvelles',
                'Couples mariés',
                'Hommes juifs',
                'Artistes',
                'Aliénation (Psychologie sociale)',
                'Amitié masculine',
                'Psychology',
                'Loss (Psychology)'
            ],
            authors: [
                {
                    key: '/authors/OL31827A',
                    name: 'James Joyce'
                }
            ]
        }
    ]
};

export const findBooksBySubjectResult = findBooksBySubjectHttpResponse.works;

export const findBookByBookKeyHttpResponse = {
    title: 'Reconfigurable Processor Array A Bit Sliced Parallel Computer (USA)',
    key: '/works/OL2829091W',
    authors: [
        {
            type: {
                key: '/type/author_role'
            },
            author: {
                key: '/authors/OL422557A'
            }
        }
    ]
};

export const findAuthorByKeyHttpResponse = {
    name: 'A. Rushton',
    personal_name: 'A. Rushton',
    last_modified: {
        type: '/type/datetime',
        value: '2008-09-02 23:04:11.33928'
    },
    key: '/authors/OL422557A',
    type: {
        key: '/type/author'
    },
    id: 1162142,
    revision: 2
};

export const findBookByBookKeyResult = {
    title: findBookByBookKeyHttpResponse.title,
    authors: [findAuthorByKeyHttpResponse.name]
};
