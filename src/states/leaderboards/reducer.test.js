import leaderboardsReducer from "./reducer";
import { asyncGetLeaderboards, getLeaderboards, LEADERBOARD_LOADING, setLeaderboards } from "./action";
import { expect, vi } from "vitest";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import axios from "axios";

/**
 * - leaderboardsReducer function
 *      - should return the initial state when given by unknown action
 *      - should return all leaderboard when set
 *      - should dispatch action correctly when data fetching success (thunk)
 */

describe("leaderboardsReducer function", () => {
    let initialState;
    let leaderboard;

    beforeEach(() => {
        initialState = { leaderboards: [] };
        leaderboard = [
            {
                user: {
                    id: "users-1",
                    name: "John Doe",
                    email: "john@example.com",
                    avatar: "https://generated-image-url.jpg",
                },
                score: 10,
            },
            {
                user: {
                    id: "users-2",
                    name: "Jane Doe",
                    email: "jane@example.com",
                    avatar: "https://generated-image-url.jpg",
                },
                score: 5,
            },
        ];
    });

    it("should return the initial state when given by unknown action", () => {
        const action = { type: "UNKNOWN" };

        const nextState = leaderboardsReducer(initialState, action);

        expect(nextState).toEqual(initialState);
    });

    it("should return all leaderboard when set", () => {
        const action = setLeaderboards(leaderboard);

        const nextState = leaderboardsReducer(initialState, action);

        expect(nextState).toEqual(action.payload);
    });

    it("should dispatch action correctly when data fetching success", async () => {
        const dispatch = vi.fn();

        await asyncGetLeaderboards(axios.get.mockResolvedValueOnce(leaderboard))(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading(LEADERBOARD_LOADING));
        expect(dispatch).toHaveBeenCalledWith(getLeaderboards());
        expect(dispatch).toHaveBeenCalledWith(setLeaderboards(leaderboard));
        expect(dispatch).toHaveBeenCalledWith(hideLoading(LEADERBOARD_LOADING));
    });
});
