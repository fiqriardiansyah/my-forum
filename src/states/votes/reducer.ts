export interface SelectorVoutes {
    threads: {
        id: string;
        voute: "down" | "up";
    }[];
}

const vouteReducer = (state: SelectorVoutes | null = null, action: any = {}) => {
    switch (action.type) {
        default:
            return state as SelectorVoutes;
    }
};

export default vouteReducer;
