import { Thread } from "models";
import { ActionType } from "./action";

export interface SelectorThreads {
    threads: Thread[];
}
function threadsReducer(state: SelectorThreads | null = null, action: any = {}) {
    const userId = action?.payload?.userId;
    const threadId = action?.payload?.threadId;

    switch (action.type) {
        case ActionType.SET_THREADS:
            return {
                ...state,
                ...action.payload,
            };
        case ActionType.SET_UP_VOUTE_THREAD:
            return {
                ...state,
                threads: [...(state?.threads || [])].map((th) =>
                    th.id !== threadId
                        ? th
                        : {
                              ...th,
                              upVotesBy: th.upVotesBy?.includes(userId) ? th.upVotesBy : [...(th.upVotesBy || []), userId],
                              downVotesBy: th.downVotesBy?.includes(userId) ? th.downVotesBy?.filter((up) => up !== userId) : th.downVotesBy,
                          }
                ),
            };
        case ActionType.SET_DOWN_VOUTE_THREAD:
            return {
                ...state,
                threads: [...(state?.threads || [])].map((th) =>
                    th.id !== threadId
                        ? th
                        : {
                              ...th,
                              downVotesBy: th.downVotesBy?.includes(userId) ? th.downVotesBy : [...(th.downVotesBy || []), userId],
                              upVotesBy: th.upVotesBy?.includes(userId) ? th.upVotesBy?.filter((up) => up !== userId) : th.upVotesBy,
                          }
                ),
            };
        case ActionType.SUCCESS_COMMENT:
            return {
                ...state,
                threads: [...(state?.threads || [])].map((th) =>
                    th.id !== threadId
                        ? th
                        : {
                              ...th,
                              totalComments: (th.totalComments || 0) + 1,
                          }
                ),
            };
        case ActionType.FAIL_COMMENT:
            return {
                ...state,
                threads: [...(state?.threads || [])].map((th) =>
                    th.id !== threadId
                        ? th
                        : {
                              ...th,
                              totalComments: (th.totalComments || 0) - 1,
                          }
                ),
            };
        default:
            return state;
    }
}
export default threadsReducer;
