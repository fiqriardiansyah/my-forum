export default {};

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface CreateThread {
    title: string;
    body: string;
    category: string;
}
