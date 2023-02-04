import { Thread } from "models";
import { ActionType } from "./action";

export interface SelectorThreads {
    threads: Thread[];
    thread: Thread;
}
function threadsReducer(state: SelectorThreads | null = null, action: any = {}) {
    const userId = action?.payload?.userId;
    const threadId = action?.payload?.threadId;
    const commentId = action?.payload?.commentId;

    switch (action.type) {
        case ActionType.SET_UP_VOUTE_COMMENT:
            return {
                ...state,
                thread: {
                    ...state?.thread,
                    comments: [...(state?.thread?.comments || [])].map((cmnt) => {
                        if (cmnt.id !== commentId) return cmnt;
                        return {
                            ...cmnt,
                            upVotesBy: cmnt?.upVotesBy?.includes(userId) ? cmnt?.upVotesBy : [...(cmnt?.upVotesBy || []), userId],
                            downVotesBy: cmnt?.downVotesBy?.includes(userId) ? cmnt?.downVotesBy?.filter((id) => id !== userId) : cmnt?.downVotesBy,
                        };
                    }),
                },
            };
        case ActionType.SET_DOWN_VOUTE_COMMENT:
            return {
                ...state,
                thread: {
                    ...state?.thread,
                    comments: [...(state?.thread?.comments || [])].map((cmnt) => {
                        if (cmnt.id !== commentId) return cmnt;
                        return {
                            ...cmnt,
                            downVotesBy: cmnt?.downVotesBy?.includes(userId) ? cmnt?.downVotesBy : [...(cmnt?.downVotesBy || []), userId],
                            upVotesBy: cmnt?.upVotesBy?.includes(userId) ? cmnt?.upVotesBy?.filter((id) => id !== userId) : cmnt?.upVotesBy,
                        };
                    }),
                },
            };
        case ActionType.SET_DETAIL_THREAD:
            return {
                ...state,
                ...action.payload,
            };
        case ActionType.SET_THREADS:
            return {
                ...state,
                ...action.payload,
            };
        case ActionType.SET_UP_VOUTE_THREAD_DETAIL:
            return {
                ...state,
                thread: {
                    ...state?.thread,
                    upVotesBy: state?.thread?.upVotesBy?.includes(userId) ? state?.thread?.upVotesBy : [...(state?.thread?.upVotesBy || []), userId],
                    downVotesBy: state?.thread?.downVotesBy?.includes(userId)
                        ? state?.thread?.downVotesBy?.filter((id) => id !== userId)
                        : state?.thread?.downVotesBy,
                },
            };
        case ActionType.SET_DOWN_VOUTE_THREAD_DETAIL:
            return {
                ...state,
                thread: {
                    ...state?.thread,
                    downVotesBy: state?.thread?.downVotesBy?.includes(userId)
                        ? state?.thread?.downVotesBy
                        : [...(state?.thread?.downVotesBy || []), userId],
                    upVotesBy: state?.thread?.upVotesBy?.includes(userId)
                        ? state?.thread?.upVotesBy?.filter((id) => id !== userId)
                        : state?.thread?.upVotesBy,
                },
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
                              downVotesBy: th.downVotesBy?.includes(userId) ? th.downVotesBy?.filter((id) => id !== userId) : th.downVotesBy,
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
                              upVotesBy: th.upVotesBy?.includes(userId) ? th.upVotesBy?.filter((id) => id !== userId) : th.upVotesBy,
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
        case ActionType.CLEAN_DETAIL_THREAD:
            return {
                ...state,
                thread: null,
            };
        default:
            return state;
    }
}
export default threadsReducer;
