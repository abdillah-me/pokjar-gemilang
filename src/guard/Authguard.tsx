import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Props {
    children: React.ReactNode;
}

const Authguard: React.FC<Props> = ({ children }) => {
    const router = useRouter();
    const [token, setToken] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("tokenPokjar");
        setToken(token || "");
        if (!token) {
            router.replace("/");
        }
    }, [token, router]);

    // Jika token tidak ada, tampilkan loading atau halaman login
    if (!token) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Redirecting...</p>
            </div>
        );
    }

    // Jika token ada, render children
    return <>{children}</>;
};

export default Authguard;
