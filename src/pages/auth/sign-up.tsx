import { AnimatePresence, motion } from "framer-motion";
import { Button, Form, Input } from "antd";
import { RegisterData } from "models";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { asyncDoRegister } from "states/users/action";
import { SIGN_IN } from "utils/routes";

function SignUp() {
    const dispatch = useDispatch();
    const onFinish = (data: RegisterData) => {
        dispatch(asyncDoRegister(data) as any);
    };

    return (
        <AnimatePresence mode="popLayout">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { type: "spring", duration: 0.5, bounce: 0.4 } }}
            >
                <div className="flex flex-col gap-4 w-[70%]">
                    <h2 className="m-0 font-semibold text-3xl">Join My Forum today</h2>
                    <Form onFinish={onFinish}>
                        <Form.Item name="name" rules={[{ required: true, message: "Please input your name!" }]}>
                            <Input size="large" placeholder="Name" />
                        </Form.Item>
                        <Form.Item name="email" rules={[{ required: true, message: "Please input your email!" }]}>
                            <Input size="large" placeholder="Email" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                            <Input.Password size="large" placeholder="Password" />
                        </Form.Item>
                        <div className="w-full flex items-center justify-between">
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                            <Link to={SIGN_IN}>Sign in</Link>
                        </div>
                    </Form>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default SignUp;
