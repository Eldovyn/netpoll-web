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
import Avatar from '../../../public/avatar.jpg';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { apiGetPolling } from '@/api/polling';

interface PollingResponse {
    message: string;
    data: {
        username: string;
        user_id: string;
        polling: Polling;
        answer: Answer[];
    };
}

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



const Polling = () => {
    const searchParams = useSearchParams();
    const pollingId = searchParams.get('pollingId');
    const [pollingData, setPollingData] = useState<PollingResponse | null>(null);

    if (!pollingId) {
        redirect('/');
    }

    useEffect(() => {
        const token = Cookies.get('accessToken') || '';
        const getPolling = async () => {
            const response = await apiGetPolling(token, pollingId);
            const resp = await response.json();
            if (response.status === 200) {
                setPollingData(resp);
            }
        }
        getPolling();
    }, []);

    if (!pollingData) {
        return <p>Loading...</p>;
    }


    return (
        <>
            <NavBar />
            <section className="w-full min-h-screen bg-black flex-row pt-8 pb-5 items-center justify-center">
                <div className="bg-black w-[80%] mx-auto rounded-md p-8 mt-[3rem]">
                    <Card className="rounded-md bg-[#1c1c1e]">
                        <CardHeader>
                            <CardTitle>
                                <h1 className='text-white font-semibold text-center text-lg'>{pollingData.data.polling.title}</h1>
                            </CardTitle>
                        </CardHeader>
                        <hr className="border-gray-500 w-[90%] mx-auto" />
                        <br />
                        <CardContent className='text-center text-white'>
                            <p>Click Button To Vote</p>
                            {pollingData.data.answer.map((answer, index) => (
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
                            <p>Created By {pollingData.data.username}</p>
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
                            <div className="flex items-start space-x-4 p-4">
                                <Image src={Avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-bold text-white">2IA03_Andana Farras Pramudita</span>
                                        <span className="text-sm text-gray-500">Posted on December 24, 2024</span>
                                    </div>
                                    <p className="mt-2 text-white">Komentar 1</p>
                                    <button className="mt-2 text-sm text-blue-500 hover:underline">Reply</button>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4 p-4">
                                <Image src={Avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-bold text-white">2IA03_Andana Farras Pramudita</span>
                                        <span className="text-sm text-gray-500">Posted on December 24, 2024</span>
                                    </div>
                                    <p className="mt-2 text-white">Komentar 2</p>
                                    <button className="mt-2 text-sm text-blue-500 hover:underline">Reply</button>
                                    <div className="flex items-start space-x-4 p-4">
                                        <Image src={Avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <span className="font-bold text-white">2IA03_Andana Farras Pramudita</span>
                                                <span className="text-sm text-gray-500">Posted on December 24, 2024</span>
                                            </div>
                                            <p className="mt-2 text-white">Reply 1</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4 p-4">
                                <Image src={Avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-bold text-white">2IA03_Andana Farras Pramudita</span>
                                        <span className="text-sm text-gray-500">Posted on December 24, 2024</span>
                                    </div>
                                    <p className="mt-2 text-white">Komentar 3</p>
                                    <button className="mt-2 text-sm text-blue-500 hover:underline">Reply</button>
                                    <div className="flex items-start space-x-4 p-4">
                                        <Image src={Avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <span className="font-bold text-white">2IA03_Andana Farras Pramudita</span>
                                                <span className="text-sm text-gray-500">Posted on December 24, 2024</span>
                                            </div>
                                            <p className="mt-2 text-white">Reply 1</p>
                                        </div>
                                    </div>
                                    <hr className="border-gray-500 w-[95%] mx-auto" />
                                    <div className="flex items-start space-x-4 p-4">
                                        <Image src={Avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <span className="font-bold text-white">2IA03_Andana Farras Pramudita</span>
                                                <span className="text-sm text-gray-500">Posted on December 24, 2024</span>
                                            </div>
                                            <p className="mt-2 text-white">Reply 2</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-gray-500 w-full mx-auto" />
                            <br />
                            <Form category='comment' />
                        </CardContent>
                    </Card>
                </div>
            </section>
        </>
    );
}

export default Polling;
