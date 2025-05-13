import Cookies from 'js-cookie';
import {ECookieKey} from "@/types/enums/cookieEnums";


const commonOptions = {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
};

export const setTokens = (accessToken: string, refreshToken: string) => {
    Cookies.set(ECookieKey.ACCESS_TOKEN, accessToken, {
        ...commonOptions,
        expires: 2, // 2 days
    });

    Cookies.set(ECookieKey.REFRESH_TOKEN, refreshToken, {
        ...commonOptions,
        expires: 7, // 7 days
    });
};

export const getAccessToken = (): string | undefined => {
    return Cookies.get(ECookieKey.ACCESS_TOKEN);
};

export const getRefreshToken = (): string | undefined => {
    return Cookies.get(ECookieKey.REFRESH_TOKEN);
};

export const clearTokens = () => {
    Cookies.remove(ECookieKey.ACCESS_TOKEN, { path: '/' });
    Cookies.remove(ECookieKey.REFRESH_TOKEN, { path: '/' });
};
