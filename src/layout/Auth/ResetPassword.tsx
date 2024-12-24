import React from "react";
import { MdEmail } from 'react-icons/md';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
    return (
        <>
            <form action="">
                <div className="p-4 text-white">
                    <div className="relative">
                        <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <Input placeholder="email address" className="pl-10 w-full" type="text" />
                    </div>
                </div>
            </form>
            <Button className="bg-blue-700 w-[93%] flex mx-auto rounded-md mt-2">Reset Password</Button>
        </>
    )
}

export default LoginForm