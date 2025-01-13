'use client'
import NavBar from "@/components/ui/navbar"
import Form from "@/layout/Form"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "@/lib/axios"
import Cookies from "js-cookie"
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react"
import LoadingSpinnerComponent from 'react-spinners-components';
import PollingList from "@/layout/PollingData"

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}

interface PollingData {
    created_at: number;
    disable_comment: boolean;
    multi_choice: boolean;
    polling_id: string;
    private: boolean;
    title: string;
    updated_at: number;
}

const MyPolling = () => {
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
                        <Form category="search-poll" />
                        <br />
                        <PollingList data={data?.data.data} />
                    </div>
                </section>
            </>
        )
    }
}

export default MyPolling