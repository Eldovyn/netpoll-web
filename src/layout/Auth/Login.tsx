import React, { useState } from "react";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingSpinnerComponent from 'react-spinners-components';
import { alertFailed } from "@/components/ui/alertFailed";
import { alertSuccess } from "@/components/ui/alertSucces";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

interface FormData {
    email: string;
    password: string;
}

interface FormErrors {
    email: string[];
    password: string[];
}

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}



const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { push } = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleEmailAccountActive = async (email: string) => {
        try {
            const response = await axiosInstance.post('/netpoll/account-active', { email });
            alertSuccess(response.data.message);
            setTimeout(() => push(`${process.env.NEXT_PUBLIC_NETPOLL_API}/netpoll/account-active/page-verification?token=${response.data.data.token}`), 5000);
            return;
        } catch (error) {
            const err = error as AxiosError<ErrorResponse>;
            alertFailed(err.message);
        }
    }

    const { mutate } = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await axiosInstance.post('/netpoll/login', data);
            return response;
        },
        onError: async (error) => {
            const err = error as AxiosError<ErrorResponse>;
            if (err.response?.status === 404) {
                alertFailed(err.response.data.message);
                return;
            }
            if (err.response?.status === 400 && err.response.data.errors) {
                handleValidation({
                    email: err.response?.data?.errors?.email ?? [],
                    password: err.response?.data?.errors?.password ?? [],
                });
                alertFailed(err.response.data.message);
                return;
            }
            if (err.response?.status === 403) {
                return await handleEmailAccountActive(formik.values.email);
            }
        },
        onSuccess: async (data) => {
            alertSuccess(data.data.message);
            Cookies.set('accessToken', data.data.data.access_token);
            setTimeout(() => push('/'), 5000);
            return;
        },
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                mutate({
                    email: values.email,
                    password: values.password
                })
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({
        email: [],
        password: [],
    });

    const handleValidation = (errors: { email: string[]; password: string[] }) => {
        setFormErrors({
            email: errors.email || [],
            password: errors.password || [],
        });
    };

    return (
        <>
            <form onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}>
                <div className="p-4 text-white">
                    <div className={`${formErrors.email.length > 0 ? 'mb-1' : 'mb-5'} relative`}>
                        <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <Input placeholder="email address" className="pl-10 w-full" type="text" onChange={formik.handleChange} name="email" />
                    </div>
                    {formErrors.email.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">{error}</p>
                    ))}
                    <div className={`${formErrors.email.length > 0 ? 'mt-3' : ''} ${formErrors.password.length > 0 ? 'mb-1' : ''} relative`}>
                        <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <Input
                            placeholder="password"
                            className="pl-10 pr-10 w-full"
                            type={showPassword ? "text" : "password"} onChange={formik.handleChange} name="password"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={togglePasswordVisibility}>
                            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                        </span>
                    </div>
                    {formErrors.password.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">{error}</p>
                    ))}
                </div>
                <Button className="bg-blue-700 w-[95%] flex mx-auto rounded-md mt-5 hover:bg-blue-800" type="submit">
                    {formik.isSubmitting ? (
                        <div className="flex flex-row text-white items-center cursor-pointer">
                            <LoadingSpinnerComponent type={'Spinner'} color={'white'} size={'100px'} />
                            <p className="ms-1">Login</p>
                        </div>
                    ) : "Login"}
                </Button>
            </form>
        </>
    )
}

export default LoginForm