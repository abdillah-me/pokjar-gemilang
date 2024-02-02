import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/axios/firebase";
import { useRouter } from "next/router";

const AdminPage: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<boolean>(false);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const response: any = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const { accessToken } = response.user;
            const { uid } = response.user;
            // save to lacal storage
            if (accessToken && uid) {
                localStorage.setItem(
                    "tokenPokjar",
                    JSON.stringify(accessToken)
                );
                localStorage.setItem("idPokjar", JSON.stringify(uid));
                router.replace("/admin/dashboard");
            }
        } catch (error) {
            setError(true);
            console.log(error);
        } finally {
            setEmail("");
            setPassword("");
        }
    };

    useEffect(() => {
        const tokenPokjar = localStorage.getItem("tokenPokjar");
        if (tokenPokjar && tokenPokjar !== "") {
            router.replace("/admin/dashboard");
        }
    }, []);

    return (
        <div
            id="admin"
            className="flex justify-center items-center min-h-screen bg-primary"
        >
            <div
                id="form"
                className="p-4 border border-gray-200 shadow-md rounded-md flex flex-col gap-2 bg-white w-4/5 md:w-1/4 md:gap-4"
            >
                <p className="text-center md:font-semibold md:text-2xl">
                    Admin UT Pokjar Gemilang
                </p>
                <hr />
                <div id="email" className="flex flex-col">
                    <label
                        htmlFor="email"
                        className="font-medium text-primary md:text-xl md:mb-2"
                    >
                        Email
                    </label>
                    <input
                        className="border border-primary rounded-md text-sm px-2 py-2 font-light"
                        placeholder="input email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div id="password" className="flex flex-col">
                    <label
                        htmlFor="password"
                        className="font-medium text-primary md:text-xl md:mb-2"
                    >
                        Password
                    </label>
                    <input
                        className="border border-primary rounded-md text-sm px-2 py-2 font-light"
                        placeholder="input password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="bg-primary py-2 px-4 text-[12px] text-white font-medium rounded-md mt-4 md:py-3 md:text-xl"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default AdminPage;
