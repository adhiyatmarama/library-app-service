export interface IFindBooksBySubjectQueries {
    limit?: number;
    offset?: number;
}

export interface IWork {
    key: string;
    title: string;
    edition_count: number;
    subject: string[];
    authors: IAuthor[];
}

interface IAuthor {
    key: string;
    name: string;
}

export interface IFindBookByBookKeyResult {
    title: string;
    authors: string[];
}
