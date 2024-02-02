import React from "react";
import Head from "next/head";
import Header from "../header-footer/Header";
import Footer from "../header-footer/Footer";

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div className="font-poppins max-w-[1440px] mx-auto">
            <Head>
                <title>Pokjar Gemilang</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="min-h-screen">{children}</main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;
