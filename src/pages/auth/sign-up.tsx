import { message } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { RegisterData } from "models";
import RegisterInput from "modules/auth/register-input";
import { useDispatch } from "react-redux";
import endPoints from "service/end-points";
import { asyncDoRegister } from "states/users/action";

function SignUp() {
    const dispatch = useDispatch();

    const register = async (dt: RegisterData) => {
        const res = await endPoints.Register(dt);
        message.success(res.data?.message);
        return res.data.data;
    };

    const onSubmit = (data: RegisterData) => {
        dispatch(asyncDoRegister(() => register(data)) as any);
    };

    return (
        <AnimatePresence mode="popLayout">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { type: "spring", duration: 0.5, bounce: 0.4 } }}
            >
                <div className="flex flex-col gap-4 w-[70%]">
                    <h2 className="m-0 font-semibold text-3xl">Join My Forum today</h2>
                    <RegisterInput onSubmit={onSubmit} />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default SignUp;
