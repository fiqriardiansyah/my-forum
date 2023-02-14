import { Button, Form, Input } from "antd";
import { LoginData } from "models";
import { Link } from "react-router-dom";
import { SIGN_UP } from "utils/routes";

type Props = {
    onSubmit: (dt: LoginData) => void;
};

function LoginInput({ onSubmit }: Props) {
    return (
        <Form onFinish={onSubmit}>
            <Form.Item name="email" rules={[{ required: true, message: "Please input your email!" }]}>
                <Input size="large" placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                <Input.Password size="large" placeholder="Password" />
            </Form.Item>
            <div className="w-full flex items-center justify-between">
                <Button id="login-btn" type="primary" htmlType="submit" name="login">
                    Login
                </Button>
                <Link to={SIGN_UP}>Sign up</Link>
            </div>
        </Form>
    );
}

export default LoginInput;
