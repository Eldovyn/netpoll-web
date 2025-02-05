import React, { use, useState } from "react";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { TiUser } from "react-icons/ti";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingSpinnerComponent from 'react-spinners-components';
import { alertFailed } from "@/components/ui/alertFailed";
import { alertSuccess } from "@/components/ui/alertSucces";
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosInstance } from "@/lib/axios";

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

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { push } = useRouter();

    const { mutate } = useMutation(
        {
            mutationFn: async (data: FormData) => {
                const response = await axiosInstance.post('/netpoll/register', data);
                return response;
            },
            onError: (error) => {
                const err = error as AxiosError<ErrorResponse>;
                if (err.response?.status === 400 && err.response.data.errors) {
                    handleValidation({
                        username: err.response?.data?.errors?.username ?? [],
                        email: err.response?.data?.errors?.email ?? [],
                        password: err.response?.data?.errors?.password ?? [],
                    });
                }
                alertFailed(err.response?.data.message || err.message);
            },
            onSuccess: async (data) => {
                alertSuccess(data.data.message);
                const response = await axiosInstance.post('/netpoll/account-active', {
                    email : data.data.data.email
                })
                if (response.status === 201) {
                    setTimeout(() => push(`${process.env.NEXT_PUBLIC_NETPOLL_API}/netpoll/account-active/page-verification?token=${response.data.data.token}`), 5000);
                }
                return;
            },
        }
    )

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                mutate({
                    username: values.username,
                    email: values.email,
                    password: values.password
                })
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            } finally {
                setSubmitting(false);
            }
        },
    })

    const [formErrors, setFormErrors] = useState<FormErrors>({
        username: [],
        email: [],
        password: [],
    });

    const handleValidation = (errors: { username: string[]; email: string[]; password: string[] }) => {
        setFormErrors({
            username: errors.username || [],
            email: errors.email || [],
            password: errors.password || [],
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <form onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}>
            <div className="p-4 text-white">
                <div className={`relative ${formErrors.username.length > 0 ? 'mb-2' : 'mb-5'}`}>
                    <TiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                        placeholder="username"
                        className="pl-10 w-full"
                        type="text"
                        onChange={formik.handleChange}
                        name="username"
                        value={formik.values.username}
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
                        onChange={formik.handleChange}
                        name="email"
                        value={formik.values.email}
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
                        onChange={formik.handleChange}
                        name="password"
                        value={formik.values.password}
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
            <Button className={`bg-blue-700 hover:bg-blue-800 w-[95%] flex mx-auto rounded-md ${formErrors.password.length > 0 ? 'mt-1' : 'mt-5'}`} type="submit">
                {formik.isSubmitting ? (
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
