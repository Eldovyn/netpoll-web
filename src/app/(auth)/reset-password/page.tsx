'use client';
import Image from "next/image";
import IconForm from "../../../../public/icon_from_1.png";
import Form from "@/layout/Form";
import Link from "next/link";
import { ToastContainer } from 'react-toastify';


const ResetPasswordPage = () => {
    return (
        <>
            <section className="w-full h-screen bg-black flex items-center justify-center">
                <div className="bg-[#1c1c1e] w-[40%] mx-auto p-8 rounded-md mt-10">
                    <Image src={IconForm} alt="logo" width={100} height={100} className="mx-auto" />
                    <h1 className="text-white text-center text-xl font-semibold pb-2">Welcome Back</h1>
                    <div className="flex flex-row mb-2 justify-center text-sm">
                        <div className="text-[#999999] me-1">Have an account?</div>
                        <Link href="/login">
                            <p className="ms-1 text-blue-500 hover:text-blue-600 underline">Login</p>
                        </Link>
                    </div>
                    <Form category="reset-password" />
                    <Link href="/register">
                        <p className="text-blue-500 hover:text-blue-600 text-sm flex justify-end me-4 mt-1 underline">Register</p>
                    </Link>
                </div>
            </section>
            <ToastContainer />
        </>
    )
};

export default ResetPasswordPage