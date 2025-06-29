import {Route} from 'react-router';
import Login from '../components/login/Login';
import Register from '../components/login/Register';
import AuthLayout from '../components/layout/AuthLayout';
import { RedirectIfAuthenticated } from '../util/authUtils';

const AuthRouter = (
    <Route path="/auth" element={<RedirectIfAuthenticated><AuthLayout/></RedirectIfAuthenticated>}>
        <Route index element={<Login/>} />
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<h1>forgot-password</h1>} />
    </Route>
);

export default AuthRouter;