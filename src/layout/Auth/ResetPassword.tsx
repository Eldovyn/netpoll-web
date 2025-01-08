import React, { useState } from "react";
import { MdEmail } from 'react-icons/md';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { alertFailed } from "@/components/ui/alertFailed";
import { alertSuccess } from "@/components/ui/alertSucces";
import LoadingSpinnerComponent from 'react-spinners-components';
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";

interface FormData {
    email: string;
}

interface FormErrors {
    email: string[];
}

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}

const LoginForm = () => {
    const { push } = useRouter();

    const { mutate } = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await axiosInstance.post('/netpoll/reset-password', data);
            return response
        },
        onError: async (error) => {
            const err = error as AxiosError<ErrorResponse>
            if (err.response?.status === 400 && err.response.data.errors) {
                handleValidation({
                    email: err.response?.data?.errors?.email ?? [],
                });
            }
            alertFailed(err.response?.data.message || err.message);
        },
        onSuccess: async (data) => {
            alertSuccess(data.data.message);
            setTimeout(() => push(`${process.env.NEXT_PUBLIC_NETPOLL_API}/netpoll/reset-password/page-reset-password?token=${data.data.data.token}`), 5000);
        }
    })

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                mutate({ email: values.email })
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            } finally {
                setSubmitting(false);
            }
        },
    })

    const [formErrors, setFormErrors] = useState<FormErrors>({
        email: [],
    });

    const handleValidation = (errors: { email: string[] }) => {
        setFormErrors({
            email: errors.email || [],
        });
    };

    return (
        <>
            <form onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}>
                <div className="p-4 text-white">
                    <div className="relative">
                        <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <Input placeholder="email address" className="pl-10 w-full" type="text" name="email" value={formik.values.email} onChange={formik.handleChange} />
                    </div>
                </div>
                {formErrors.email.map((error, index) => (
                    <p key={index} className="text-red-500 text-sm ms-4">{error}</p>
                ))}
                <Button className="bg-blue-700 hover:bg-blue-800 w-[95%] flex mx-auto rounded-md mt-2" type="submit">
                    {formik.isSubmitting ? (
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