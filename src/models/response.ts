export default {};

export interface User {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
}

export interface RegisterResponse {
    user?: User;
}

export interface LoginResponse {
    token: string;
}

export interface Thread {
    id?: string;
    title?: string;
    body?: string;
    category?: string;
    createdAt?: string;
    ownerId?: string;
    upVotesBy?: string[];
    downVotesBy?: string[];
    totalComments?: number;
}

export interface Owner {
    id?: string;
    name?: string;
    avatar?: string;
}

export interface Comment {
    id?: string;
    content?: string;
    createdAt?: string;
    owner?: Owner;
    upVotesBy?: string[];
    downVotesBy?: string[];
}

export interface DetailThread {
    id?: string;
    title?: string;
    body?: string;
    category?: string;
    createdAt?: string;
    owner?: Owner;
    upVotesBy?: string[];
    downVotesBy?: string[];
    comments?: Comment[];
}

export interface CommentResponse {
    id?: string;
    content?: string;
    createdAt?: Date;
    upVotesBy?: string[];
    downVotesBy?: string[];
    owner?: Owner;
}

export interface VoteThreadResponse {
    id?: string;
    userId?: string;
    threadId?: string;
    voteType?: number;
}

export interface VoteCommentResponse {
    id?: string;
    userId?: string;
    threadId?: string;
    voteType?: number;
}

export interface LeaderBoard {
    user?: User;
    score?: number;
}
