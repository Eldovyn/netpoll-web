'use client';
import Link from 'next/link';
import Image from 'next/image';
import IconWeb from '../../../public/icon_from_1.png';
import { useState, useEffect } from 'react';
import { MdOutlineAdd } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { IoSaveSharp } from 'react-icons/io5';
import { useMediaQuery } from 'react-responsive';
import { RiAccountCircleFill } from "react-icons/ri";
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';

interface UserData {
    access_token: string;
    avatar: string;
    email: string;
    is_active: boolean;
    user_id: string;
    username: string;
}

const NavBar = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const response = await axiosInstance.get('/netpoll/@me', { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${Cookies.get('accessToken') || ''}` } });
            return response;
        },
    })

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <nav className="sticky top-0 bg-black p-4 z-50 border-b-2 border-gray-800">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2 overflow-visible">
                        <Image src={IconWeb} alt="NetPool Logo" className="w-10" />
                        <p className="font-bold text-md text-white min-w-[6rem]">NetPool</p>
                    </div>
                    <button
                        className="text-white focus:outline-none md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-controls="navbarNav"
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                    <div
                        className={`absolute top-full left-0 w-full bg-black md:static md:flex justify-end ${isOpen ? 'block' : 'hidden'}`}
                        id="navbarNav"
                    >
                        <ul className={`md:flex items-center space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-0 text-sm`}>
                            <li className="nav-item">
                                <Link href="/">
                                    {isTabletOrMobile ? (
                                        <p className="ms-1 text-[#999999]">Create Polling</p>
                                    ) : (
                                        <div className="flex flex-row text-white items-center cursor-pointer">
                                            <MdOutlineAdd size={20} className="text-[#999999]" />
                                            <p className="ms-1">Create Polling</p>
                                        </div>
                                    )}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/list-polling">
                                    {isTabletOrMobile ? (
                                        <p className="me-1 ms-1 text-[#999999]">New Polling</p>
                                    ) : (
                                        <div className="flex flex-row text-white items-center cursor-pointer">
                                            <FaSearch size={15} className="text-[#999999]" />
                                            <p className="me-1 ms-1">New Polling</p>
                                        </div>
                                    )}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/my-polling">
                                    {isTabletOrMobile ? (
                                        <p className="me-1 ms-1 text-[#999999]">My Polling</p>
                                    ) : (
                                        <div className="flex flex-row text-white items-center cursor-pointer">
                                            <IoSaveSharp size={16} className="text-[#999999]" />
                                            <p className="me-1 ms-1">My Polling</p>
                                        </div>
                                    )}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/my-polling">
                                    {isTabletOrMobile ? (
                                        <p className="me-1 ms-1 text-[#999999]">Account</p>
                                    ) : (
                                        <div className="flex flex-row text-white items-center cursor-pointer">
                                            {data?.data?.avatar ? (
                                                <Image
                                                    src={data?.data?.avatar}
                                                    alt="User Avatar"
                                                    width={20}
                                                    height={20}
                                                    className="rounded-full border border-gray-500"
                                                />
                                            ) : (<RiAccountCircleFill size={20} className="text-[#999999]" />
                                            )}
                                            <p className="me-1 ms-1">Account</p>
                                        </div>
                                    )}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
