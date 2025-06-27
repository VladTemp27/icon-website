import { Navigate } from "react-router";
import type {JSX} from "react";

export const IndexRedirect  = () => {
    const role = localStorage.getItem('role');
    switch(role) {
        case 'executive':
            return <Navigate to="/home/dashboard" replace />;
        case 'member':
            return <Navigate to="/home/announcements" replace />;
        case 'officer':
            return <Navigate to="/home/dashboard" replace />;
        default:
            console.error('No valid role found in localStorage');
            return <Navigate to="/auth/login" replace />;
    }
}

export const CheckRole = ({children, requiredRole}: {children: JSX.Element, requiredRole: [string]}) => {
    const role = localStorage.getItem('role');
    if (!role) {
        console.error('No role found in localStorage');
        return <Navigate to="/auth/login" replace />;
    }

    if (!requiredRole.includes(role)){
        console.error(`Role mismatch: expected ${requiredRole}, but got ${role}`);
        return <Navigate to="/home/" replace />;
    }
    return children;
}