import React, { useState } from "react";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <>
            <form action="">
                <div className="p-4 text-white">
                    <div className="mb-5 relative">
                        <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <Input placeholder="email address" className="pl-10 w-full" type="text" />
                    </div>
                    <div className="mt-5 relative">
                        <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <Input
                            placeholder="password"
                            className="pl-10 pr-10 w-full"
                            type={showPassword ? "text" : "password"}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={togglePasswordVisibility}>
                            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                        </span>
                    </div>
                </div>
            </form>
            <Button className="bg-blue-700 w-[93%] flex mx-auto rounded-md mt-5">Login</Button>
        </>
    )
}

export default LoginForm