import React, { useState } from "react";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { TiUser } from "react-icons/ti";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingSpinnerComponent from 'react-spinners-components';
import { apiRegister, apiAccountActive } from "@/api/auth";
import { alertFailed } from "@/components/ui/alertFailed";
import { alertSuccess } from "@/components/ui/alertSucces";
import { useRouter } from "next/navigation";

interface FormData {
    username: string;
    email: string;
    password: string;
}

interface FormErrors {
    username: string[];
    email: string[];
    password: string[];
}

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({
        username: [],
        email: [],
        password: [],
    });

    const { push } = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleValidation = (errors: { username: string[]; email: string[]; password: string[] }) => {
        setFormErrors({
            username: errors.username || [],
            email: errors.email || [],
            password: errors.password || [],
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const { username, email, password } = formData;

        try {
            const response = await apiRegister({ username, email, password });
            const resp = await response.json();

            if (response.status !== 200) {
                if (response.status === 400 && resp.errors) {
                    handleValidation(resp.errors);
                    alertFailed(resp.message);
                    return;
                }
            }
            if (response.status === 201) {
                const response = await apiAccountActive({ email });
                const resp = await response.json();
                if (response.status === 201) {
                    alertSuccess(resp.message);
                    setTimeout(() => push(`${process.env.NEXT_PUBLIC_NETPOLL_API}netpoll/account-active/page-verification?token=${resp.data.token}`), 5000);
                    return;
                }
            }
        } catch (error) {
            console.error('Error during registration:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={isLoading ? () => {} : handleSubmit}>
            <div className="p-4 text-white">
                <div className={`relative ${formErrors.username.length > 0 ? 'mb-2' : 'mb-5'}`}>
                    <TiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                        placeholder="username"
                        className="pl-10 w-full"
                        type="text"
                        onChange={handleInputChange}
                        name="username"
                        value={formData.username}
                    />
                </div>
                {formErrors.username.map((error, index) => (
                    <p key={index} className="text-red-500 text-sm">{error}</p>
                ))}

                <div className={`relative ${formErrors.email.length > 0 ? 'mb-2 mt-1' : 'mb-5'}`}>
                    <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                        placeholder="email address"
                        className="pl-10 w-full"
                        type="text"
                        onChange={handleInputChange}
                        name="email"
                        value={formData.email}
                    />
                </div>
                {formErrors.email.map((error, index) => (
                    <p key={index} className="text-red-500 text-sm">{error}</p>
                ))}

                <div className={`relative ${formErrors.password.length > 0 ? 'mb-2 mt-1' : ''}`}>
                    <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                        placeholder="password"
                        className="pl-10 pr-10 w-full"
                        type={showPassword ? "text" : "password"}
                        onChange={handleInputChange}
                        name="password"
                        value={formData.password}
                    />
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </span>
                </div>
                {formErrors.password.map((error, index) => (
                    <p key={index} className="text-red-500 text-sm">{error}</p>
                ))}
            </div>
            <Button className={`bg-blue-700 hover:bg-blue-800 w-[93%] flex mx-auto rounded-md ${formErrors.password.length > 0 ? 'mt-1' : 'mt-5'}`} type="submit">
                {isLoading ? (
                    <div className="flex flex-row text-white items-center cursor-pointer">
                        <LoadingSpinnerComponent type={'Spinner'} color={'white'} size={'100px'} />
                        <p className="ms-1">Register</p>
                    </div>
                ) : "Register"}
            </Button>
        </form>
    );
};

export default RegisterForm;
