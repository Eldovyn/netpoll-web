'use client';
import NavBar from "@/components/ui/navbar";
import Form from "@/layout/Form";

export default function Home() {
    return (
        <>
            <NavBar />
            <section className="w-full h-screen bg-black flex items-center justify-center border-t-2 border-gray-800">
                <div className="bg-[#1c1c1e] w-[40%] mx-auto rounded-md p-8">
                    <h1 className="text-white text-center text-lg font-semibold pb-2">Create New Poll</h1>
                    <Form category="add-poll" />
                </div>
            </section>
        </>
    );
}
