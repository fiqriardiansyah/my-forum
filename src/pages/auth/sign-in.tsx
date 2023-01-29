import { AnimatePresence, motion } from "framer-motion";
import { Button, Form, Input } from "antd";
import { LoginData } from "models";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { asyncDoLogin } from "states/users/action";
import { SIGN_UP } from "utils/routes";
import { POPUP_MOTION } from "utils/constant";

function SignIn() {
    const dispatch = useDispatch();
    const onFinish = (data: LoginData) => {
        dispatch(asyncDoLogin(data) as any);
    };

    return (
        <AnimatePresence mode="popLayout">
            <motion.div initial={POPUP_MOTION.initial} animate={POPUP_MOTION.animate}>
                <div className="flex flex-col gap-4 w-[70%]">
                    <h2 className="m-0 font-semibold text-3xl">Log in to My Forum</h2>
                    <Form onFinish={onFinish}>
                        <Form.Item name="email" rules={[{ required: true, message: "Please input your email!" }]}>
                            <Input size="large" placeholder="Email" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                            <Input.Password size="large" placeholder="Password" />
                        </Form.Item>
                        <div className="w-full flex items-center justify-between">
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                            <Link to={SIGN_UP}>Sign up</Link>
                        </div>
                    </Form>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default SignIn;
