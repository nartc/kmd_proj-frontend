export class Element {
    type: string;
    title: string;
    description?: string;
    languages: string[];
    content: string;

    constructor(
        type: string,
        title: string,
        languages: string[],
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
