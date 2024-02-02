import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Header: React.FC = () => {
    const [hash, setHash] = useState<string>("");

    const router = useRouter();
    console.log(router, "router");

    useEffect(() => {
        // Fungsi untuk memperbarui state berdasarkan hash URL
        const updateHash = () => {
            setHash(window.location.hash);
            if (router.route.includes("/informasi/[id]")) {
                setHash("#news");
            }
        };

        // Memperbarui hash saat komponen di-mount atau URL berubah
        updateHash();

        // Mendengarkan perubahan pada URL
        const handleRouteChange = (url: string) => {
            updateHash();
        };

        router.events.on("routeChangeComplete", handleRouteChange);

        // Cleanup
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router]);

    return (
        <div
            id="header"
            className="right-0 px-4 bg-white w-full flex flex-col gap-2 border-b md:flex-row md:items-center md:justify-between md:px-8"
            style={{ position: "sticky", top: 0, left: 0, zIndex: 10 }}
        >
            <div
                id="logo"
                className="flex items-center justify-between gap-5 h-fit w-full md:w-5/12"
            >
                <img
                    src="/images/logo-pokjar.svg"
                    alt="logo-pokjar"
                    style={{ width: "40%" }}
                />
                <div
                    className="hidden"
                    style={{
                        width: 1,
                        backgroundColor: "rgba(217, 217, 217, 1)",
                        height: "100%",
                    }}
                ></div>
                <img
                    src="/images/logo-pendidikan.svg"
                    alt="logo-pendidikan"
                    style={{ width: "15%", padding: 10 }}
                />
                <div
                    className="hidden"
                    style={{
                        width: 1,
                        backgroundColor: "rgba(217, 217, 217, 1)",
                        height: "100%",
                    }}
                ></div>
                <img
                    src="/images/logo-kampus-merdaka.svg"
                    alt="logo-kampus-merdeka"
                    style={{ width: "15%" }}
                />
                <div
                    className="hidden"
                    style={{
                        width: 1,
                        backgroundColor: "rgba(217, 217, 217, 1)",
                        height: "100%",
                    }}
                ></div>
                <img
                    src="/images/logo-ut.svg"
                    alt="logo-ut"
                    style={{ width: "15%", padding: 10 }}
                />
            </div>
            <div
                id="nav"
                className="flex items-center justify-between gap-2 text-[12px] mb-2 bg-[rgba(45,52,140,0.05)] p-2 rounded-lg md:bg-white md:gap-5 md:mt-3 md:text-lg md:w-full md:justify-end"
            >
                <Link href={"/"}>
                    <p
                        className={` ${
                            hash === "" && router.asPath !== "/informasi"
                                ? "text-[#2D348C]"
                                : "text-slate-900"
                        }`}
                    >
                        Profile
                    </p>
                </Link>
                <Link
                    href={`${
                        router.asPath === "/informasi" ? "/" : "#visi-misi"
                    }`}
                >
                    <p
                        className={` ${
                            hash === "#visi-misi"
                                ? "text-[#2D348C]"
                                : "text-slate-900"
                        }`}
                    >
                        Layanan
                    </p>
                </Link>
                <Link
                    href={`${
                        router.asPath === "/informasi" ? "/" : "#get-collage"
                    }`}
                >
                    <p
                        className={` ${
                            hash === "#get-collage"
                                ? "text-[#2D348C]"
                                : "text-slate-900"
                        }`}
                    >
                        Akademik
                    </p>
                </Link>
                <Link href={"/informasi"}>
                    <p
                        className={` ${
                            hash === "#news" ||
                            router.asPath.includes("/informasi")
                                ? "text-[#2D348C]"
                                : "text-slate-900"
                        }`}
                    >
                        Informasi
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default Header;
