'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import IconEmail from '../../../../public/iconEmailVerification.png';
import Image from 'next/image';

const EmailVerification = () => {
    const searchParams = useSearchParams();
    const username = searchParams.get('username');

    return (
        <section className="w-full min-h-screen bg-black flex-row pt-8 pb-5 items-center justify-center">
            <div className="bg-[#1c1c1e] md:w-[60%] w-[80%] xl:w-[45%] mx-auto rounded-md p-8 mt-[12rem]">
                <p className="text-center text-white font-semibold">
                    Thanks {username} for your registration
                </p>
                <Image
                    src={IconEmail}
                    alt="Email Verification Icon"
                    className="w-[20%] m-3 mx-auto"
                />
                <p className="text-gray-400 text-sm text-center">
                    Your account has been successfully active
                </p>
                <Link href="/login">
                    <p className="underline font-semibold text-sm text-gray-400 text-end">
                        Login
                    </p>
                </Link>
            </div>
        </section>
    );
};

export default EmailVerification;
