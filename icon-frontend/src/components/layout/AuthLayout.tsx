import { Layout, Row, Col, Typography, theme } from "antd"
import { Outlet } from "react-router"
import { useEffect } from "react"

const { Content } = Layout
const { useToken } = theme

function AuthLayout() {
  const { token } = useToken()
  
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

  return (
    <Layout style={{ 
      minHeight: "100vh", 
      overflow: "hidden" // Prevent layout scrolling
    }}>
      <Content style={{ overflow: "hidden" }}> {/* Prevent content scrolling */}
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
        <Row style={{ 
          minHeight: "100vh", 
          overflow: "hidden" // Prevent row scrolling
        }}>
          {/* Left side - Logo */}
          <Col xs={0} md={10} lg={12} xl={14} style={{ overflow: "hidden" }}> {/* Prevent column scrolling */}
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "1rem",
                color: token.colorTextLightSolid,
                position: "relative",
                overflow: "hidden" // Prevent div scrolling
              }}
            >
              {/* Logo */}
              <div style={{ zIndex: 1, textAlign: "center" }}>
                <div
                  style={{
                    width: "400px",
                    height: "400px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    overflow: "visible", // Allow logo to overflow its container
                  }}
                >
                  {/* Logo image with same size as before */}
                  <img 
                    src="/src/assets/ICON-Logo-NoBG.png"
                    alt="ICON Logo"
                    style={{
                      width: "700%",
                      height: "auto",
                      objectFit: "contain",
                      maxWidth: "none",
                    }}
                  />
                </div>
              </div>
            </div>
          </Col>

          {/* Right side - Forms */}
          <Col xs={24} md={14} lg={12} xl={10} style={{ overflow: "hidden" }}> {/* Prevent column scrolling */}
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                overflow: "hidden" // Prevent div scrolling
              }}
            >
              <div style={{ width: "100%", maxWidth: "500px" }}>
                <Outlet />
              </div>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default AuthLayout