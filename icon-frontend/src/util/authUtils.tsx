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
            console.log('Token found, checking authentication...');
            checkAuth(token).then((result) => {
                setIsAuthenticated(result);
            });
        } else {
            console.log('No token found, user is not authenticated.');
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

// This function checks if the user is authenticated by verifying the token
// It returns true if the token is valid, otherwise false
async function checkAuth(token: string | null): Promise<boolean> {
    if (!token){
        return false;
    }
    try{
        const response = await axios.post('http://localhost:1525/api/auth/verify',{} ,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        console.log(response.data)

        if(response.status === 200) {
            return true;
        }

        return false;
    }catch (error) {
        console.error('Error checking authentication:', error);
        return false;
    }
};
