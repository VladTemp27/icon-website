import { Layout, Spin } from 'antd';
import { useNavigate } from 'react-router';

const { Content } = Layout;

function Loading() {

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content>
                {/* Background pattern */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        opacity: 0.3,
                    }}
                />
                
                {/* Centered content */}
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center"
                }}>
                    <Spin size="large" tip="Checking authentication..." />
                </div>
            </Content>
        </Layout>
    );
}

export default Loading;