import { Props as TabsProps } from "components/tabs";
import { LIKES, PROFILE, PROFILE_LIKES, USER } from "./routes";

export const TOKEN = "token";
export const DEFAULT_ERROR_MESSAGE = "Ooops something wrong!";
export const SEARCH = "search";
export const USER_ID = "userid";
export const THREAD_ID = "threadid";

export const POPUP_MOTION = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: "spring", duration: 0.5, bounce: 0.4 } },
};

export default {};
