import { toast } from 'react-toastify';

export const alertFailed = async (message: string) => {
    toast.error(message, {
        position: "bottom-right",
    });
};