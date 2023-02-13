import { AnimatePresence, motion } from "framer-motion";
import { LoginData } from "models";
import LoginInput from "modules/auth/login-input";
import { useDispatch } from "react-redux";
import endPoints from "service/end-points";
import { asyncDoLogin } from "states/users/action";
import { POPUP_MOTION } from "utils/constant";

function SignIn() {
    const dispatch = useDispatch();

    const login = async (dt: LoginData) => (await endPoints.Login(dt)).data.data;
    const profile = async () => (await endPoints.Me()).data?.data?.user;

    const onSubmit = (data: LoginData) => {
        dispatch(asyncDoLogin(() => login(data), profile) as any);
    };

    return (
        <AnimatePresence mode="popLayout">
            <motion.div initial={POPUP_MOTION.initial} animate={POPUP_MOTION.animate}>
                <div className="flex flex-col gap-4 w-[70%]">
                    <h2 className="m-0 font-semibold text-3xl">Log in to My Forum</h2>
                    <LoginInput onSubmit={onSubmit} />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default SignIn;
