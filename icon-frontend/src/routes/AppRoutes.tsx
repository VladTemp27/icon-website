import { Routes, Route, Navigate } from 'react-router';
import AuthRoutes from './AuthRoutes';

import NotFound from '../pages/NotFound'

function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            {/* Auth routes */}
            {AuthRoutes}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;