import { Routes, Route, Navigate } from 'react-router';
import AuthRoutes from './AuthRoutes';
import HomeRoutes from './HomeRoutes';

import NotFound from '../pages/NotFound'

function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            {/* Auth routes */}
            {AuthRoutes}

            {/* Home routes */}
            {HomeRoutes}

            {/* Catch-all route for 404 Not Found */}

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;