import { axiosInstance } from "@/lib/axios";

interface UserOptions {
    [key: string]: any;
}

const apiRegister = async (options: UserOptions) => {
    const response = await axiosInstance.post('/netpoll/register', options);
    return response;
};

const apiAccountActive = async (options: UserOptions) => {
    const response = await axiosInstance.post('/netpoll/account-active', options);
    return response;
};

const apiLogin = async (options: UserOptions) => {
    const response = await axiosInstance.post('/netpoll/login', options);
    return response;
};

const apiMe = async (token: string) => {
    const response = await axiosInstance.get('/netpoll/@me', { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } });
    return response;
};

const apiResetPassword = async (options: UserOptions) => {
    const response = await axiosInstance.post('/netpoll/reset-password', options);
    return response;
};

export { apiRegister, apiAccountActive, apiLogin, apiMe, apiResetPassword };