import Link from 'next/link';
import Image from 'next/image';
import IconWeb from '../../../public/icon_from_1.png';
import { useState } from 'react';
import { MdOutlineAdd } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { IoSaveSharp } from "react-icons/io5";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="relative bg-black p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-1 overflow-visible">
                    <Image src={IconWeb} alt="" className="w-10" />
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
                    className={`absolute top-full left-0 w-full bg-black md:static md:flex justify-end ${isOpen ? "block" : "hidden"}`}
                    id="navbarNav"
                >
                    <ul className={`md:flex items-center space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-0 text-sm`}>
                        <li className="nav-item">
                            <Link href="/">
                                <div className="flex flex-row text-white items-center cursor-pointer">
                                    <MdOutlineAdd size={20} className='text-[#999999]' />
                                    <p className="ms-1">Create Polling</p>
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/history">
                                <div className="flex flex-row text-white items-center cursor-pointer">
                                    <FaSearch size={15} className='text-[#999999]' />
                                    <p className="me-1 ms-1">New Polling</p>
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/history">
                                <div className="flex flex-row text-white items-center cursor-pointer">
                                    <IoSaveSharp size={16} className='text-[#999999]' />
                                    <p className="me-1 ms-1">My Polling</p>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar