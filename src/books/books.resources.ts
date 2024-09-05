export interface IFindBooksBySubjectQueries {
    limit?: number;
    offset?: number;
}

export interface IBook {
    key: string,
    title: string,
    authors: string[]
    edition_number: number
}
