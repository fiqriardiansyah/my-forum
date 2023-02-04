import {
    AxiosResponseCustom,
    CommentResponse,
    CreateThread,
    LeaderBoard,
    LoginData,
    LoginResponse,
    RegisterData,
    RegisterResponse,
    Thread,
    User,
    VoteCommentResponse,
    VoteThreadResponse,
} from "models";
import { DEFAULT_ERROR_MESSAGE } from "utils/constant";
import message from "antd/es/message";
import Utils from "utils";
import methods from "./methods";

const endPoints = {
    register: "/register",
    login: "/login",
    users: "/users",
    me: "/users/me",
    threads: "/threads",
    comments: "/comments",
    upvote: "/up-vote",
    downvote: "/down-vote",
    neutralvote: "/neutral-vote",
    leaderboards: "/leaderboards",

    Leaderboards<T extends { leaderboards: LeaderBoard[] }>() {
        return this.ProxyRequest<T>(async () => {
            const req = await methods.get<T>({
                url: this.leaderboards,
            });
            return req;
        });
    },

    NeutralVoteComment<T extends { vote: VoteCommentResponse }>(data: { thread_id: any; comment_id: any }) {
        return this.ProxyRequest<T>(async () => {
            const req = await methods.post<T>({
                url: `${this.threads}/${data.thread_id}${this.comments}/${data.comment_id}${this.neutralvote}`,
            });
            return req;
        });
    },

    DownVoteComment<T extends { vote: VoteCommentResponse }>(data: { thread_id: any; comment_id: any }) {
        return this.ProxyRequest<T>(async () => {
            const req = await methods.post<T>({
                url: `${this.threads}/${data.thread_id}${this.comments}/${data.comment_id}${this.downvote}`,
            });
            return req;
        });
    },

    UpVoteComment<T extends { vote: VoteCommentResponse }>(data: { thread_id: any; comment_id: any }) {
        return this.ProxyRequest<T>(async () => {
            const req = await methods.post<T>({
                url: `${this.threads}/${data.thread_id}${this.comments}/${data.comment_id}${this.upvote}`,
            });
            return req;
        });
    },

    NeutralVoteThread<T extends { vote: VoteThreadResponse }>(data: { thread_id: any }) {
        return this.ProxyRequest<T>(async () => {
            const req = await methods.post<T>({
                url: `${this.threads}/${data.thread_id}${this.neutralvote}`,
            });
            return req;
        });
    },

    DownVoteThread<T extends { vote: VoteThreadResponse }>(data: { thread_id: any }) {
        return this.ProxyRequest<T>(async () => {
            const req = await methods.post<T>({
                url: `${this.threads}/${data.thread_id}${this.downvote}`,
            });
            return req;
        });
    },

    UpVoteThread<T extends { vote: VoteThreadResponse }>(data: { thread_id: any }) {
        return this.ProxyRequest<T>(async () => {
            const req = await methods.post<T>({
                url: `${this.threads}/${data.thread_id}${this.upvote}`,
            });
            return req;
        });
    },

    CreateComment<T extends { comment: CommentResponse }>(data: { thread_id: any; content: string }) {
        return this.ProxyRequest<T>(async () => {
            const req = await methods.post<T>({
                url: `${this.threads}/${data.thread_id}${this.comments}`,
                data: {
                    content: data.content,
                },
            });
            return req;
        });
    },

    DetailThread<T extends { detailThread: Thread }>(data: { thread_id: any }) {
        return this.ProxyRequest<T>(async () => {
            const req = await methods.get<T>({
                url: `${this.threads}/${data.thread_id}`,
            });
            return req;
        });
    },

    Threads<T extends { threads: Thread[] }>() {
        return this.ProxyRequest<T>(async () => {
            const req = await methods.get<T>({
                url: this.threads,
            });
            return req;
        });
    },

    CreateThread<T extends { thread: Thread }>(data: CreateThread) {
        return this.ProxyRequest<T>(async () => {
            const req = await methods.post<T>({
                url: this.threads,
                data,
            });
            return req;
        });
    },

    Me<T extends { user: User }>() {
        return this.ProxyRequest<T>(async () => {
            const req = await methods.get<T>({
                url: this.me,
            });
            return req;
        });
    },

    Users<T extends { users: User[] }>() {
        return this.ProxyRequest<T>(async () => {
            const req = await methods.get<T>({
                url: this.users,
            });
            return req;
        });
    },

    Login<T extends LoginResponse>(data: LoginData) {
        return this.ProxyRequest<T>(async () => {
            const req = await methods.post<T>({
                url: this.login,
                data,
            });
            return req;
        });
    },

    Register<T extends RegisterResponse>(data: RegisterData) {
        return this.ProxyRequest<T>(async () => {
            const req = await methods.post<T>({
                url: this.register,
                data,
            });
            return req;
        });
    },

    async ProxyRequest<T>(request: () => Promise<AxiosResponseCustom<T>>): Promise<AxiosResponseCustom<T>> {
        try {
            const req = await request();
            const status = req.data?.status;
            if (status !== "success") {
                const msg = req.data?.message || DEFAULT_ERROR_MESSAGE;

                if (req.status === 401) {
                    setTimeout(() => {
                        Utils.Logout();
                        window.location.reload();
                    }, 300);
                }
                throw new Error(msg);
            }
            return req;
        } catch (error: any) {
            const msg = error?.message || DEFAULT_ERROR_MESSAGE;
            message.error({ key: msg, content: msg });
            throw new Error(msg);
        }
    },
};

export default endPoints;
