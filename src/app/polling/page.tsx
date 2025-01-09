'use client';
import { useSearchParams } from 'next/navigation';
import NavBar from '@/components/ui/navbar';
import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { MdOutlineAdd, MdSaveAlt } from 'react-icons/md';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { FaDatabase, FaShareAlt } from "react-icons/fa";
import Form from '@/layout/Form';
import { AxiosError } from "axios";
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';
import LoadingSpinnerComponent from 'react-spinners-components';

interface Polling {
    polling_id: string;
    title: string;
    private: boolean;
    multi_choice: boolean;
    disable_comment: boolean;
    created_at: string;
    updated_at: string;
}

interface Answer {
    answer_id: string;
    answer: string;
    created_at: string;
    updated_at: string;
}

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}

const Polling = () => {
    const searchParams = useSearchParams();
    const pollingId = searchParams.get('pollingId');

    if (!pollingId) {
        redirect('/');
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['polling', pollingId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/netpoll/polling?polling_id=${pollingId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('accessToken') || ''}`
                }
            });
            return response;
        },
        enabled: !!pollingId,
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
                    <div className="bg-black w-[80%] mx-auto rounded-md p-8 mt-[3rem]">
                        <Card className="rounded-md bg-[#1c1c1e]">
                            <CardHeader>
                                <CardTitle>
                                    <h1 className='text-white font-semibold text-center text-lg'>{data?.data?.data?.polling.title}</h1>
                                </CardTitle>
                            </CardHeader>
                            <hr className="border-gray-500 w-[90%] mx-auto" />
                            <br />
                            <CardContent className='text-center text-white'>
                                <p>Click Button To Vote</p>
                                {data?.data?.data?.answer.map((answer: { answer: string }, index: number) => (
                                    <Button key={index} className='rounded-md mt-4 w-[95%] bg-blue-700 hover:bg-blue-800'>{answer.answer}</Button>
                                ))}
                                <div className="flex flex-row justify-center mt-3">
                                    <Button className='rounded-md bg-green-700 hover:bg-green-800 ms-1 me-1'>
                                        <div className="flex flex-row text-white items-center cursor-pointer">
                                            <MdSaveAlt size={16} className="text-[#999999]" />
                                            <p className="me-1 ms-1">Save Polling</p>
                                        </div>
                                    </Button>
                                    <Button className='rounded-md bg-green-700 hover:bg-green-800 ms-1 me-1'>
                                        <div className="flex flex-row text-white items-center cursor-pointer">
                                            <FaDatabase size={16} className="text-[#999999]" />
                                            <p className="me-1 ms-1">Result Polling</p>
                                        </div>
                                    </Button>
                                    <Button className='rounded-md bg-green-700 hover:bg-green-800 ms-1 me-1'>
                                        <div className="flex flex-row text-white items-center cursor-pointer">
                                            <FaShareAlt size={16} className="text-[#999999]" />
                                            <p className="me-1 ms-1">Share Polling</p>
                                        </div>
                                    </Button>
                                    <Button className='rounded-md bg-green-700 hover:bg-green-800 ms-1 me-1'>
                                        <div className="flex flex-row text-white items-center cursor-pointer">
                                            <MdOutlineAdd size={16} className="text-[#999999]" />
                                            <p className="me-1 ms-1">Create Polling</p>
                                        </div>
                                    </Button>
                                </div>
                            </CardContent>
                            <CardFooter className='text-gray-400 ms-6 text-sm'>
                                <p>Created By {data?.data?.data?.username}</p>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="bg-black w-[80%] mx-auto rounded-md p-8 mt-2">
                        <Card className='rounded-md bg-[#1c1c1e]'>
                            <CardHeader className='text-center'>
                                <CardTitle className='text-white text-lg'>Comentar</CardTitle>
                                <CardDescription className='text-white text-sm'>Enter your comment</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form category='comment' />
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </>
        );
    }

    return null;
};

export default Polling;
