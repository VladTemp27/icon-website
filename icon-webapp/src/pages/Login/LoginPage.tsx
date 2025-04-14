import { LoginForm } from "./LoginForm"
import "./LoginPage.css"

export function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <img src="./images/Logo.png" alt="ICON Logo" className="logo" />
            <h2 className="title">Sign in to your account</h2>
            <p className="subtitle">Enter your credentials to access the ICON platform</p>
          </div>
          <LoginForm />
        </div>
      </div>
      <footer className="footer">&copy; {new Date().getFullYear()} ICON. All rights reserved.</footer>
    </div>
  )
}