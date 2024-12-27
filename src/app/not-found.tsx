'use client'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation';

export default function NotFound() {
    return (
        <>
            <section className="w-full h-screen bg-black flex-row pt-8 pb-5 items-center justify-center">
                <div className="bg-[#1c1c1e] w-[40%] mx-auto rounded-md p-8 mt-[12rem]">
                    <h1 className="text-white text-center text-xl font-semibold pb-2">404 Not Found</h1>
                    <p className="text-white text-center text-sm">The page you are looking for is not found.</p>
                    <div className="flex justify-center">
                        <Button className='bg-blue-700 hover:bg-blue-800 rounded-sm w-[30%] mt-3 mx-auto' onClick={() => redirect('/login')}>
                            Login
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}