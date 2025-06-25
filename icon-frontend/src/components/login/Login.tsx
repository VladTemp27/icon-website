import { useState } from 'react';
import { Form, Input, Button, Typography, Divider, Space, message, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

const { Title, Text } = Typography;

function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const onFinish = async (values: { username: string; password: string }) => {
        try {
            setLoading(true);
            // Replace with actual API call
            console.log('Login attempt with:', values);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            message.success('Login successful!');
            // Navigate to dashboard or home page after successful login
            // navigate('/dashboard');
        } catch (error) {
            message.error('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            style={{ 
                width: '100%',
                maxWidth: '450px',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                background: 'rgba(30, 30, 30, 0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
        >
            <div style={{ width: '100%', padding: '16px 8px' }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <Title level={2} style={{ marginBottom: '8px', fontSize: '28px' }}>Welcome Back</Title>
                    <Text type="secondary">Please sign in to continue</Text>
                </div>

                <Form
                    name="login_form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input 
                            prefix={<UserOutlined style={{ color: 'rgba(255,255,255,.5)' }} />} 
                            placeholder="Username" 
                            size="large"
                            style={{ height: '50px', borderRadius: '8px' }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined style={{ color: 'rgba(255,255,255,.5)' }} />}
                            placeholder="Password"
                            size="large"
                            style={{ height: '50px', borderRadius: '8px' }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            loading={loading}
                            block
                            size="large"
                            style={{ height: '50px', fontSize: '16px', borderRadius: '8px' }}
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                    
                    <Divider plain style={{ margin: '24px 0' }}>Or</Divider>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                        <Button 
                            type="link" 
                            onClick={() => navigate('/auth/register')}
                            size="large"
                        >
                            Register Now
                        </Button>
                        <Button 
                            type="link" 
                            onClick={() => navigate('/auth/forgot-password')}
                            size="large"
                        >
                            Forgot Password?
                        </Button>
                    </div>
                </Form>
            </div>
        </Card>
    );
}

export default Login;