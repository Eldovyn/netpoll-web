import React, { useState } from "react";
import { MdEmail } from 'react-icons/md';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiResetPassword } from "@/api/auth";
import { useRouter } from "next/navigation";
import { alertFailed } from "@/components/ui/alertFailed";
import { alertSuccess } from "@/components/ui/alertSucces";
import LoadingSpinnerComponent from 'react-spinners-components';

interface FormData {
    email: string;
}

interface FormErrors {
    email: string[];
}

const LoginForm = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({
        email: [],
    });

    const { push } = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleValidation = (errors: { email: string[] }) => {
        setFormErrors({
            email: errors.email || [],
        });
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await apiResetPassword({ email: formData.email });
            const resp = await response.json();

            if (response.status !== 201) {
                if (response.status === 400 && resp.errors) {
                    handleValidation(resp.errors);
                    alertFailed(resp.message);
                    return;
                }
                if (response.status === 404) {
                    alertFailed(resp.message);
                    return;
                }
                alertFailed(resp.message);
                return;
            }
            if (response.status === 201) {
                alertSuccess(resp.message);
                setTimeout(() => push(`${process.env.NEXT_PUBLIC_NETPOLL_API}netpoll/reset-password/page-reset-password?token=${resp.data.token}`), 5000);
            }
        } catch (error) {
            console.error('Error during login:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <form onSubmit={isLoading ? () => { } : handleSubmit}>
                <div className="p-4 text-white">
                    <div className="relative">
                        <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <Input placeholder="email address" className="pl-10 w-full" type="text" name="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                </div>
                {formErrors.email.map((error, index) => (
                    <p key={index} className="text-red-500 text-sm ms-4">{error}</p>
                ))}
                <Button className="bg-blue-700 hover:bg-blue-800 w-[95%] flex mx-auto rounded-md mt-2" type="submit">
                    {isLoading ? (
                        <div className="flex flex-row text-white items-center cursor-pointer">
                            <LoadingSpinnerComponent type={'Spinner'} color={'white'} size={'100px'} />
                            <p className="ms-1">Reset Password</p>
                        </div>
                    ) : "Reset Password"}
                </Button>
            </form>
        </>
    )
}

export default LoginForm