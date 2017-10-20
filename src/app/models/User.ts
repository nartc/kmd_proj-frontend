export class User {
    nickname: string;
    email: string;
    password: string;

    constructor(
        email: string,
        password: string,
        nickname: string
    ) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }
}