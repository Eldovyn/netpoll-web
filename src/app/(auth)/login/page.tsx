'use client';
import Image from "next/image";
import IconForm from "../../../../public/icon_from_1.png";
import Form from "@/layout/Form";


const LoginPage = () => {
    return (
        <>
            <section className="w-full h-screen bg-black flex items-center justify-center">
                <div className="bg-[#1c1c1e] w-[40%] mx-auto p-8 rounded-md mt-10">
                    <Image src={IconForm} alt="logo" width={100} height={100} className="mx-auto" />
                    <h1 className="text-white text-center text-xl font-semibold pb-2">Welcome Back</h1>
                    <div className="flex flex-row mb-2 justify-center text-sm">
                        <div className="text-[#999999] me-1">Don't have an account?</div>
                        <div className="text-white ms-1">Register</div>
                    </div>
                    <Form category="login" />
                </div>
            </section>
        </>
    );
};

export default LoginPage;

