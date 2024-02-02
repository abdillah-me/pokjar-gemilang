import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
interface Props {
    children: React.ReactNode;
}

const Sidebar: React.FC<Props> = ({ children }) => {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.clear();
        router.replace("/admin");
    };
    return (
        <div className="flex">
            <div
                className="bg-white pl-4 pt-4 pr-3 shadow-md border-r-0"
                style={{
                    width: "15%",
                    minHeight: "100vh",
                }}
            >
                <ul className=" text-white flex flex-col gap-2">
                    <Link href="/admin/dashboard">
                        <li
                            className={` hover:bg-primary hover:text-white py-2 rounded-md px-4 ${
                                router.asPath === "/admin/dashboard"
                                    ? "bg-primary text-white"
                                    : "text-black"
                            }`}
                        >
                            Image
                        </li>
                    </Link>
                    <Link href="/admin/dashboard/content">
                        <li
                            className={` hover:bg-primary hover:text-white py-2 rounded-md px-4 ${
                                router.asPath === "/admin/dashboard/content"
                                    ? "bg-primary text-white"
                                    : "text-black"
                            }`}
                        >
                            Content
                        </li>
                    </Link>
                </ul>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-1 rounded-md mt-[30vh] flex items-center justify-between gap-2"
                >
                    Logout
                    <RiLogoutBoxRLine />
                </button>
            </div>
            <div id="content" className="w-full">
                {children}
            </div>
        </div>
    );
};

export default Sidebar;
