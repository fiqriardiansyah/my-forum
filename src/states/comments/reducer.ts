export interface SelectorComment {
    comment: any;
}
function commentsReducer(state: SelectorComment | null = null, action: any = {}) {
    switch (action.type) {
        default:
            return state as SelectorComment;
    }
}
export default commentsReducer;
