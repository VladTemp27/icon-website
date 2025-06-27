import { Layout, Menu, Row, Col, Typography, theme, Avatar, Button, Dropdown } from "antd"
import { Outlet } from "react-router"
import { useEffect, useState } from "react"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
  CalendarOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import type { MenuProps } from "antd";
import { useNavigate } from 'react-router';
import Sidebar from "../sidebar/Sidebar";

const { Content, Header, Sider } = Layout
const { useToken } = theme

function HomeLayout() {
  const { token } = useToken();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  
  // Prevent scrolling when this component mounts
  useEffect(() => {
    // Save the current overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
	localStorage.removeItem('role');
	localStorage.removeItem('username');
    navigate('/auth/login');
  };

const userDropdownItems: MenuProps['items'] = [
  {
    key: '1',
    label: <span style={{fontSize:'19px', padding: '10px'}}>Profile</span>,
    icon: <UserOutlined style={{fontSize: '25px'}} />,
    onClick: () => navigate('/home/profile')
  },
  {
    key: '2',
    label: <span style={{fontSize:'19px', padding: '10px'}}>Settings</span>,
    icon: <SettingOutlined style={{fontSize: '25px'}} />,
    onClick: () => navigate('/home/settings')
  },
  {
    key: '3',
    type: 'divider',
	style: { margin: '8px 0' },
  },
  {
    key: '4',
    label: <span style={{fontSize:'19px', padding: '10px'}}>Logout</span>,
    icon: <LogoutOutlined style={{fontSize: '25px'}} />,
    onClick: handleLogout,
    danger: true
  },
];

  return (
    <Layout style={{ 
      minHeight: "100vh", 
      overflow: "hidden"
    }}>
      {/* Top Navbar */}
      <Header style={{ 
        padding: "0 24px", 
        display: "flex", 
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)" 
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', color: token.colorTextLightSolid }}
          />
          <div style={{ marginLeft: 24 }}>
            <img
              src="/src/assets/ICON-Logo-NoBG.png" 
              alt="ICON"
              style={{ height: 128, width: 'auto' }}
            />
          </div>
        </div>
        
        <div>
<Dropdown 
  menu={{ items: userDropdownItems }} 
  placement="bottomRight"
  trigger={['click']}
>
  <Avatar
    style={{ 
      backgroundColor: token.colorPrimary,
      cursor: "pointer" 
    }}
    icon={<UserOutlined />}
  />
</Dropdown>
        </div>
      </Header>
      
      <Layout>
        <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
        
        {/* Main Content Area */}
        <Content style={{ 
          padding: 24, 
          margin: 0, 
          minHeight: "calc(100vh - 64px)",
          position: "relative",
          overflow: "auto"
        }}>
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
              zIndex: -1
            }}
          />
          
          {/* Page Content (from child routes) */}
          <div style={{ 
            background: 'rgba(30, 30, 30, 0.7)',
            padding: 24,
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            minHeight: 'calc(100vh - 112px)',
            backdropFilter: 'blur(10px)'
          }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default HomeLayout