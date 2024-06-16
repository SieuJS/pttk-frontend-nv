'use client';

import { useRef, useState, useEffect, useCallback, MutableRefObject } from 'react';

import { loginAction, logoutAction } from '../actions/auth-action';

export interface UserData {
    userId: string | null;
    token: string | null;
    expiredDateToken: Date | null;
    type : string | null;
}

export default function AuthHook() {
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [type, setType] = useState<string | null>(null);
    const [deadlineToken, setDeadlineToken] = useState<Date | undefined>();

    const tokenTimeRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const userData: UserData = JSON.parse(userDataString);
            login(userData);
            loginAction(userData);
        }
    }, []);

    const login = useCallback( async (userData : UserData) => {

        const deadline = userData.expiredDateToken || new Date(new Date().getTime() + 3600 * 1000);

        const newUserData: UserData = {
            userId :userData.userId,
            token : userData.token,
            expiredDateToken: deadline,
            type : userData.type
        };

        setDeadlineToken(deadline);
        
        localStorage.setItem('userData', JSON.stringify(newUserData));
        await loginAction(userData);
        setToken(userData.token);
        setUserId(userData.userId);
        setType (userData.type)
    }, []);

    const logout = useCallback(async () => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('userData');
        if (tokenTimeRef.current) {
            clearTimeout(tokenTimeRef.current);
        }
        await logoutAction();
    }, []);

    useEffect(() => {
        if (token && deadlineToken) {
            const timeRemain = new Date(deadlineToken).getTime() - new Date().getTime();
            tokenTimeRef.current = setTimeout(logout, timeRemain);
        } else if (tokenTimeRef.current) {
            clearTimeout(tokenTimeRef.current);
        }
    }, [token, deadlineToken, logout]);

    return { login, logout, token, userId, type };
}
