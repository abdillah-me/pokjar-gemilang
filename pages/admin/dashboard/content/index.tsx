import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Authguard from "../../../../src/guard/Authguard";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../../src/axios/firebase";
import Link from "next/link";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { useRouter } from "next/router";

const ContentSettings = () => {
    const router = useRouter();
    const [newsData, setNewsData] = useState<any[]>([]);
    const [firstLoading, setFirstLoading] = useState<boolean>(true);
    const convertTimestampToReadableDate = (timestamp: any) => {
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleString(); // Atau gunakan date.toLocaleDateString() untuk hanya tanggal tanpa waktu
    };

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

    const deleteData = async (docId: any) => {
        setFirstLoading(true);
        try {
            await deleteDoc(doc(db, "news", docId));
        } catch (e) {
            console.error("Error deleting document: ", e);
        } finally {
            readData();
            setFirstLoading(false);
        }
    };

    return (
        <Authguard>
            <Sidebar>
                <div className="p-4">
                    <div
                        id="heading"
                        className="flex justify-between items-center mb-4"
                    >
                        <h1 className="text-2xl font-semibold">Content</h1>
                        <Link href="/admin/dashboard/content/create">
                            <button className="bg-green-600 py-1 px-4 rounded-md text-white">
                                Buat Baru
                            </button>
                        </Link>
                    </div>
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
                        <table className="w-full">
                            <thead>
                                <tr className="w-full bg-slate-300">
                                    <th className="border border-gray-300 p-2 w-2/12">
                                        Date
                                    </th>
                                    <th className="border border-gray-300 p-2 w-3/12">
                                        Judul
                                    </th>
                                    <th className="border border-gray-300 p-2 w-4/12">
                                        Isi Berita
                                    </th>
                                    <th className="border border-gray-300 p-2 w-2/12">
                                        Gambar
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {newsData.length > 0 ? (
                                    newsData.map((item: any, index: any) => {
                                        return (
                                            <tr key={index} className="">
                                                <td className="border border-gray-300 p-2">
                                                    <p>
                                                        {convertTimestampToReadableDate(
                                                            item.created
                                                        )}
                                                    </p>
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <p>{item.title}</p>
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <p>
                                                        {getTruncatedText(
                                                            item.content
                                                        )}
                                                    </p>
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <img
                                                        src={item.image[0]}
                                                        alt="image"
                                                        style={{
                                                            objectFit: "cover",
                                                            height: 100,
                                                            width: 200,
                                                        }}
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <div
                                                        id="actions"
                                                        className="flex items-center justify-center gap-2 text-sm"
                                                    >
                                                        <Link
                                                            href={`/admin/dashboard/content/${item.id}`}
                                                        >
                                                            <button className="bg-blue-600 py-1 px-4 rounded-md text-white">
                                                                Edit
                                                            </button>
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                deleteData(
                                                                    item.id
                                                                )
                                                            }
                                                            className="bg-red-600 py-1 px-4 rounded-md text-white"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </Sidebar>
        </Authguard>
    );
};

export default ContentSettings;
