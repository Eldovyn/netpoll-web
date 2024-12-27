'use client';
import React, { useEffect, useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import IconEmail from '../../../../public/iconEmailVerification.png';
import { apiAccountActivePage } from '@/api/auth';

interface UserResponse {
    username: string;
    email: string;
    user_id: string;
    is_active: boolean;
    avatar: string;
    created_at: number;
    updated_at: number;
}


const EmailVerification = () => {
    const searchParams = useSearchParams();

    const token = searchParams.get('token');

    const [userData, setUserData] = useState<UserResponse | null>(null);

    useEffect(() => {
        if (!token) {
            redirect('/register');
        }
        const verifyEmail = async () => {
            const response = await apiAccountActivePage(token);
            const resp = await response.json();
            if (response.status === 200) {
                setUserData(resp.data);
            } else {
                redirect('/register');
            }
        }
        verifyEmail();
    }, [token]);

    return (
        <section className="w-full min-h-screen bg-black flex-row pt-8 pb-5 items-center justify-center">
            <div className="bg-[#1c1c1e] md:w-[60%] w-[80%] xl:w-[45%] mx-auto rounded-md p-8 mt-[9rem]">
                <p className="text-center text-white font-semibold">Great, now verify your email</p>
                <Image src={IconEmail} alt="Email Verification Icon" className="w-[20%] mx-auto" />
                <p className="text-gray-400 text-sm">
                    Check your inbox at {userData?.email} and click the verification link inside to complete your registration. This link will expire in 5 minutes, so verify soon!
                </p>
                <br />
                <p className="text-gray-400 text-sm">
                    <span className="font-semibold text-gray-300">Don't receive the email?</span> Check your spam folder.
                </p>
            </div>
        </section>
    );
};

export default EmailVerification;
