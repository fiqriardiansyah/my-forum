import { Button, Form, Input } from "antd";
import { RegisterData } from "models";
import { Link } from "react-router-dom";
import { SIGN_IN } from "utils/routes";

type Props = {
    onSubmit: (dt: RegisterData) => void;
};

function RegisterInput({ onSubmit }: Props) {
    return (
        <Form onFinish={onSubmit}>
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
                <Button id="register-btn" type="primary" htmlType="submit">
                    Register
                </Button>
                <Link to={SIGN_IN}>Sign in</Link>
            </div>
        </Form>
    );
}

export default RegisterInput;
