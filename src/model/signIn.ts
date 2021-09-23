export class SignIn {
    username: string;
    password: string;

    errors = {
        username: [] as string[],
        password: [] as string[],
    }

    validate() {

    }

    hasErrors() {
        return !!Object.values(this.errors).find((value) => value.length > 0);
    }
}