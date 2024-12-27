'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import IconEmail from '../../../../public/iconEmailVerification.png';

const EmailVerification = () => {
    const searchParams = useSearchParams();

    const email = searchParams.get('email');

    return (
        <section className="w-full min-h-screen bg-black flex-row pt-8 pb-5 items-center justify-center">
            <div className="bg-[#1c1c1e] md:w-[60%] w-[80%] xl:w-[45%] mx-auto rounded-md p-8 mt-[9rem]">
                <p className="text-center text-white font-semibold">Great, now verify your email</p>
                <Image src={IconEmail} alt="Email Verification Icon" className="w-[20%] mx-auto" />
                <p className="text-gray-400 text-sm">
                    Check your inbox at {email} and click the verification link inside to complete your registration. This link will expire in 5 minutes, so verify soon!
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
