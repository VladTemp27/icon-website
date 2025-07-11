import { Layout, Menu, theme } from "antd";
import { useState, useEffect } from "react";

import './side.css';

const { Sider } = Layout;
const { useToken } = theme;

import useMenuItems from "./MenuItem";

interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

function Sidebar({ collapsed = false, onCollapse }: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(collapsed);
  const { token } = useToken();
  
  // Use either external or internal collapsed state
  const isCollapsed = onCollapse ? collapsed : internalCollapsed;
  
  // Handle collapse toggling
  const handleCollapse = (value: boolean) => {
    if (onCollapse) {
      onCollapse(value);
    } else {
      setInternalCollapsed(value);
    }
  };

  // Set CSS variables for theme colors
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', token.colorPrimary);
    document.documentElement.style.setProperty('--primary-color-light', token.colorPrimaryBg);
  }, [token.colorPrimary, token.colorPrimaryBg]);

  return (
    <Sider 
      width={280}
      collapsible 
      collapsed={isCollapsed}
      onCollapse={handleCollapse}
      style={{
        overflow: "auto",
        height: "calc(100vh - 64px)"
      }}
      theme="dark"
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['dashboard']}
        style={{ 
          padding: "24px 8px",
          height: "100%",
          fontSize: "20px"
        }}
        theme="dark"
        items={useMenuItems()}
        className="home-sidebar-menu"
      />
    </Sider>
  );
}

export default Sidebar;