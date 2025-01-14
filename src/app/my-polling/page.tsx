'use client'
import NavBar from "@/components/ui/navbar"
import Form from "@/layout/Form"
import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "@/lib/axios"
import Cookies from "js-cookie"
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react"
import LoadingSpinnerComponent from 'react-spinners-components';
import PaginationPage from "@/layout/Pagination"
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { alertSuccess } from "@/components/ui/alertSucces"
import { alertFailed } from "@/components/ui/alertFailed"
import { ToastContainer } from 'react-toastify';

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}

interface FormData {
    title: string;
}

const MyPolling = () => {
    const { mutate } = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await axiosInstance.get('/netpoll/my-polling/search', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('accessToken') || ''}`
                },
                params: data
            });
            return response;
        },
        onError: async (error) => {
            const err = error as AxiosError<ErrorResponse>;
            alertFailed(err.response?.data.message || err.message);
        },
        onSuccess: async (data) => {
            alertSuccess(data.data.message);
        },
    })

    const formik = useFormik({
        initialValues: {
            title: '',
        },
        onSubmit: async (values) => {
            mutate({
                title: values.title
            })
        },
    })

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['my-polling'],
        queryFn: async () => {
            const response = await axiosInstance.get(`/netpoll/my-polling`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('accessToken') || ''}`
                }
            });
            return response;
        },
        refetchOnWindowFocus: false,
        retry: false,
    });

    const err = error as AxiosError<ErrorResponse>;

    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => {
                setShowSpinner(true);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (err?.response?.status === 404) {
        return (
            <>
                <NavBar />
                <section className="w-full min-h-screen bg-black flex-row pt-8 pb-5 items-center justify-center">
                    <div className="text-white flex justify-center items-center w-full min-h-screen">
                        <h1>Polling Not Found</h1>
                    </div>
                </section>
            </>
        );
    }

    if (isLoading) {
        return (
            <>
                <NavBar />
                <section className="w-full min-h-screen bg-black flex-row pt-8 pb-5 items-center justify-center">
                    {showSpinner ? (
                        <LoadingSpinnerComponent type={'Spinner'} color={'white'} size={'100px'} />
                    ) : (
                        <p></p>
                    )}
                </section>
            </>
        );
    }

    if (!isError && data) {
        return (
            <>
                <NavBar />
                <section className="w-full min-h-screen bg-black flex-row pt-8 pb-5 items-center justify-center">
                    <div className="bg-black w-[90%] mx-auto rounded-md p-8">
                        <h1 className="text-white text-start text-lg font-semibold pb-2">My Polling</h1>
                        <hr className="border-gray-800" />
                        <br />
                        <Form category="search-poll" formik={formik} />
                        <br />
                        <PaginationPage data={data?.data} category="my-polling"/>
                    </div>
                </section>
                <ToastContainer />
            </>
        )
    }
}

export default MyPolling