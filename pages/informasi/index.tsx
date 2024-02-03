import React, { useEffect, useState } from "react";
import Layout from "../../src/components/Layout/Layout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../src/axios/firebase";
import Link from "next/link";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { useRouter } from "next/router";

const News: React.FC = () => {
    const router = useRouter();
    const [newsData, setNewsData] = useState<any[]>([]);
    const [firstLoading, setFirstLoading] = useState<boolean>(true);

    const getTruncatedText = (editorState: any) => {
        const contentState = editorState.getCurrentContent();
        const text = contentState.getPlainText();
        const truncatedText = text.slice(0, 50);
        return truncatedText + (text.length > 50 ? "..." : "");
    };

    const readData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "news"));
            const dataList: any = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                try {
                    let contentState;
                    if (typeof data.content === "string") {
                        contentState = convertFromRaw(JSON.parse(data.content));
                    } else {
                        contentState = convertFromRaw(data.content);
                    }
                    data.content = EditorState.createWithContent(contentState);
                } catch (error) {
                    console.error(
                        "Error parsing content for document ID " +
                            doc.id +
                            ": ",
                        error
                    );
                    data.content = EditorState.createEmpty();
                }
                dataList.push({ id: doc.id, ...data });
            });
            dataList.sort(
                (a: any, b: any) => b.created.toDate() - a.created.toDate()
            );
            setNewsData(dataList);
        } catch (e) {
            console.error("Error reading documents: ", e);
        } finally {
            setFirstLoading(false);
        }
    };

    useEffect(() => {
        if (router.isReady) {
            readData();
        }
    }, [router]);

    const convertTimestampToReadableDate = (timestamp: any) => {
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleString(); // Atau gunakan date.toLocaleDateString() untuk hanya tanggal tanpa waktu
    };

    return (
        <Layout>
            <div id="container" className="p-4 md:px-8 md:py-8">
                <h1 className="text-xl font-semibold">Informasi</h1>
                <div
                    className="bg-primary rounded-full w-[30%] my-2 md:w-1/6"
                    style={{ height: "6px" }}
                ></div>
                {firstLoading ? (
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
                    <div
                        id="cards-news"
                        className="grid gap-4 grid-cols-2 md:grid-cols-4 mt-4 md:my-8"
                    >
                        {newsData.map((data: any, index: number) => {
                            return (
                                <Link key={index} href={`/informasi/${data.id}`}>
                                    <div
                                        id="item-news"
                                        className="bg-white p-2 hover:shadow-md rounded-md cursor-pointer border"
                                    >
                                        <div id="images">
                                            <img
                                                src={data.image[0]}
                                                alt=""
                                                className="md:h-[180px] h-[100px] w-full object-cover"
                                            />
                                        </div>
                                        <p className="createdAt px-1 py-1 mb-2 bg-primary text-[7px] md:py-1 md:px-2 w-fit text-white rounded mt-3 md:text-xs">
                                            {convertTimestampToReadableDate(
                                                data.created
                                            )}
                                        </p>
                                        <p className="title text-primary md:font-semibold text-sm md:text-lg md:mt-4 capitalize">
                                            {data.title.substring(0, 20)}
                                        </p>
                                        <hr className="md:my-4" />
                                        <p className="textNews text-slate-700 text-[9px] mt-2 md:text-base">
                                            {getTruncatedText(data.content)}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default News;
