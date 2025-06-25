import {Route} from 'react-router';

const AuthRouter = (
    <Route path="/auth" element={null}>
        <Route index element={<h1>404</h1>} />
        <Route path="*" element={<h1>404</h1>} />
        <Route path="login" element={<h1>login</h1>} />
        <Route path="register" element={<h1>register</h1>} />
        <Route path="forgot-password" element={<h1>forgot-password</h1>} />
        <Route path="reset-password" element={null} />
    </Route>
);

export default AuthRouter;