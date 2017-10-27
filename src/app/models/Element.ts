export class Element {
    type: string;
    title: string;
    description?: string;
    languages: Language[];
    content: string;

    constructor(
        type: string,
        title: string,
        languages: Language[],
        content: string,
        description?: string
    ) {
        this.type = type;
        this.title = title;
        this.languages = languages;
        this.content = content;
        this.description = description;
    }
}

export interface Language {
    name: string;
    type: string;
    code?: string;
    parent?: string;
}
