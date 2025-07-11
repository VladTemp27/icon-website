import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const { Title, Text } = Typography;

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: RegisterFormValues) => {
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:1525/api/auth/register', {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        username: values.username,
        password: values.password
      });

      if (response.status === 201) {
        message.success('Registration successful! Please log in.');
        navigate('/auth/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      if(error instanceof axios.AxiosError) {
        if (error.response?.data?.message) {
          message.error(error.response.data.message);
        } else {
          message.error('Registration failed. Please try again.');
        }
      }

    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
    message.error('Please check your input and try again.');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: '40px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2} style={{ color: 'white', marginBottom: '8px' }}>
            Join ICON
          </Title>
          <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Create your account to get started
          </Text>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size="large"
          style={{ width: '100%' }}
        >
          <Form.Item
            name="firstName"
            rules={[
              { required: true, message: 'Please input your first name!' },
              { min: 2, message: 'First name must be at least 2 characters!' }
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(255, 255, 255, 0.6)' }} />}
              placeholder="First Name"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white'
              }}
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[
              { required: true, message: 'Please input your last name!' },
              { min: 2, message: 'Last name must be at least 2 characters!' }
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(255, 255, 255, 0.6)' }} />}
              placeholder="Last Name"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white'
              }}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: 'rgba(255, 255, 255, 0.6)' }} />}
              placeholder="Email"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white'
              }}
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: 'Please input your phone number!' },
              { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number!' }
            ]}
          >
            <Input
              prefix={<PhoneOutlined style={{ color: 'rgba(255, 255, 255, 0.6)' }} />}
              placeholder="Phone Number"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white'
              }}
            />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
              { min: 3, message: 'Username must be at least 3 characters!' }
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(255, 255, 255, 0.6)' }} />}
              placeholder="Username"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white'
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(255, 255, 255, 0.6)' }} />}
              placeholder="Password"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white'
              }}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(255, 255, 255, 0.6)' }} />}
              placeholder="Confirm Password"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white'
              }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: '16px' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                width: '100%',
                height: '48px',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '8px'
              }}
            >
              Create Account
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Already have an account?{' '}
              <Button
                type="link"
                onClick={() => navigate('/auth/login')}
                style={{
                  color: '#667eea',
                  padding: 0,
                  fontSize: '14px',
                  textDecoration: 'underline'
                }}
              >
                Sign in here
              </Button>
            </Text>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;