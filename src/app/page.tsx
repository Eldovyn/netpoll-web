'use client';
import NavBar from "@/components/ui/navbar";
import Form from "@/layout/Form";
import { ToastContainer } from 'react-toastify';

export default function Home() {
    return (
        <>
            <NavBar />
            <section className="w-full min-h-screen bg-black flex-row pt-8 pb-5 items-center justify-center">
                <div className="bg-[#1c1c1e] w-[40%] mx-auto rounded-md p-8">
                    <h1 className="text-white text-center text-lg font-semibold pb-2">Create New Poll</h1>
                    <Form category="add-poll" />
                </div>
                <div className="bg-[#1c1c1e] w-[40%] mx-auto rounded-md p-8 mt-5">
                    <Form category="search-poll" />
                </div>
            </section>
            <ToastContainer />
        </>
    );
}
