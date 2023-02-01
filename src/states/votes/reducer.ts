import { ActionType } from "./action";

export interface SelectorVoutes {
    threads: {
        id: string;
        voute: "down" | "up";
    }[];
}

const vouteReducer = (state: SelectorVoutes | null = null, action: any = {}) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default vouteReducer;
