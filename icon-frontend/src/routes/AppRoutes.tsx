import { Routes } from 'react-router';
import AuthRoutes from './AuthRoutes';

function AppRoutes() {
    return(
        <Routes>
            {AuthRoutes}
        </Routes>
    );
};

export default AppRoutes;