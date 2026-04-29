'use client';

import { Form, Input, Button, Checkbox, Alert, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loginUser } from '../api/loginApi';

interface FormValues {
  email: string;
  password: string;
  remember?: boolean;
}

interface ErrorState {
  msg: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export default function LoginLayout() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loginSuccess = useAppSelector((state) => state.auth.loginSuccess);
  const loginError = useAppSelector((state) => state.auth.loginError);

  const [error, setError] = useState<ErrorState>();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<FormValues>();

  // 🔥 Handle Login Result
  useEffect(() => {
    if (loginSuccess) {
      setLoading(false);
      setError({ msg: "Login successful! Redirecting...", type: "success" });

      localStorage.setItem('isAuthenticated', 'true');

      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);

      message.success('Login successful!');
      dispatch({ type: 'LOGIN_RESET' });

    } else if (loginError) {
      setLoading(false);
      setError({ msg: loginError, type: "error" });

      message.error(loginError);
      dispatch({ type: 'LOGIN_RESET' });
    }
  }, [loginSuccess, loginError]);

  // 🔥 Submit Handler
  const onFinish = async (values: FormValues) => {
    try {
      setLoading(true);

      dispatch(loginUser({
        email: values.email,
        password: values.password
      }));

    } catch (err) {
      setLoading(false);
      setError({
        msg: "Login failed. Please try again.",
        type: "error"
      });
      message.error('Login failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      padding: '1rem'
    }}>
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          padding: '1.75rem',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)'
        }}
      >
        <h1 style={{
          textAlign: 'center',
          fontSize: '22px',
          fontWeight: 700,
          marginBottom: '1rem'
        }}>
          Admin Login
        </h1>

        {error && (
          <Alert
            message={error.msg}
            type={error.type}
            showIcon
            closable
            onClose={() => setError(undefined)}
            style={{ marginBottom: '1rem' }}
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Enter email' },
              { type: 'email', message: 'Invalid email' }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Enter password' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember</Checkbox>
            </Form.Item>

            <a href="#">Forgot?</a>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}