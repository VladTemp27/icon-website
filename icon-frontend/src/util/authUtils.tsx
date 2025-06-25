import type { JSX } from "react";
import axios from "axios";
import { Navigate } from "react-router";

import { useEffect, useState } from "react";

import Loading from "../pages/Loading";

export const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checkAuth(token).then((result) => {
                setIsAuthenticated(result);
            });
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    if (isAuthenticated === null) {
        return <Loading />
    }

    if(isAuthenticated) {
        return <Navigate to="/home/dashboard" replace />;
    }

    return children;
};

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checkAuth(token).then((result) => {
                setIsAuthenticated(result);
            });
        } else {
            setIsAuthenticated(false);
        }
    })

    if( isAuthenticated === null) {
        return <Loading />;
    }

    if( isAuthenticated === false) {
        return <Navigate to="/auth/login" replace />;
    }
    
    return children;
};

async function checkAuth(token: string | null): Promise<boolean> {
    try{
        console.log('Checking authentication with token:', token);
        const response = await axios.post('http://localhost:1525/api/auth/verify', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if(response.status === 200) {
            return true;
        }

        return false;
    }catch (error) {
        console.error('Error checking authentication:', error);
        return false;
    }
};
