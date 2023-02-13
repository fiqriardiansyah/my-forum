export interface SelectorVotes {
    threads: {
        id: string;
        vote: "down" | "up";
    }[];
}

const voteReducer = (state: SelectorVotes | null = null, action: any = {}) => {
    switch (action.type) {
        default:
            return state as SelectorVotes;
    }
};

export default voteReducer;
