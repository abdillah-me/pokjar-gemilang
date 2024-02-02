import type { NextPage } from "next";
import Head from "next/head";
import HomePage from "./home";
import Header from "../src/components/header-footer/Header";
import Footer from "../src/components/header-footer/Footer";
import Layout from "../src/components/Layout/Layout";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../src/axios/firebase";

const Home: NextPage = () => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [images, setImages] = useState<any[]>([]);
    const readData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "images"));
            const dataList: any = [];
            querySnapshot.forEach((doc) => {
                dataList.push({ id: doc.id, ...doc.data() });
            });
            return setImages(dataList);
        } catch (e) {
            console.error("Error reading documents: ", e);
        } finally {
            setFirstLoad(false);
        }
    };

    useEffect(() => {
        readData();
    }, []);

    return (
        <Layout>
            {firstLoad ? (
                <div
                    className="flex flex-col items-center justify-center"
                    id="loadingData"
                    style={{
                        margin: "20px auto",
                        textAlign: "center",
                        height: 300,
                    }}
                >
                    <img
                        src={"/images/loading-animation.gif"}
                        alt="loading"
                        width={120}
                    />
                    <p className="mt-[-20px]">Sedang memuat data</p>
                </div>
            ) : (
                <HomePage data={images} />
            )}
        </Layout>
    );
};

export default Home;
