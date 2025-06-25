import {Route} from 'react-router';
import Login from '../components/login/Login';
import AuthLayout from '../components/layout/AuthLayout';

const AuthRouter = (
    <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Login/>} />
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<h1>register</h1>} />
        <Route path="forgot-password" element={<h1>forgot-password</h1>} />
    </Route>
);

export default AuthRouter;