import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../src/axios/firebase";
import { useRouter } from "next/router";

const ImagesSettings = () => {
    const router = useRouter();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editMode2, setEditMode2] = useState<boolean>(false);

    const [idHero, setidHero] = useState<string>("");
    const [idHistory, setIdHistory] = useState<string>("");

    const [heroImage, setHeroImage] = useState<string>("");
    const [historyImage, setHistoryImage] = useState<string>("");
    const [firstLoading, setFirstLoading] = useState(true);

    const readData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "images"));
            const dataList: any = [];
            querySnapshot.forEach((doc) => {
                dataList.push({ id: doc.id, ...doc.data() });
            });
            setHeroImage(dataList[0].url);
            setidHero(dataList[0].id);
            setHistoryImage(dataList[1].url);
            setIdHistory(dataList[1].id);
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
    }, []);

    const handleEditMode = () => {
        if (editMode2) {
            setEditMode2(false);
        }
        setEditMode(!editMode);
    };

    const handleEditMode2 = () => {
        if (editMode) {
            setEditMode(false);
        }
        setEditMode2(!editMode2);
    };

    const handleSave = async (title: string, docId: string) => {
        setFirstLoading(true);
        if (title === "" || heroImage === "" || historyImage === "") {
            alert("data tidak boleh ada yang kosong");
            return;
        }
        const payload = {
            created: new Date(),
            title: title,
            url: title === "hero" ? heroImage : historyImage,
        };

        try {
            const docRef = doc(db, "images", docId);
            const updateData = await updateDoc(docRef, payload);
            setEditMode(false);
            setEditMode2(false);
        } catch (e) {
            console.error("Error updating document: ", e);
        } finally {
            setFirstLoading(false);
            readData();
        }
    };

    return (
        <div className="p-4 w-[500]">
            <h1 className="text-2xl font-semibold mb-3">Images Settings</h1>
            <hr className="my-4" />
            {/* table */}
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
                <div id="tableOfImage" className="flex flex-col gap-4">
                    <div id="hero">
                        <h1 className="text-xl font-semibold mb-2">
                            Image Hero
                        </h1>
                        <table className="w-full">
                            <thead>
                                <tr className="w-full bg-slate-300">
                                    <th className="border border-gray-300 p-2 w-6/12">
                                        Link Image
                                    </th>
                                    <th className="border border-gray-300 p-2 w-[310px]">
                                        Preview
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            value={heroImage}
                                            onChange={(e) =>
                                                setHeroImage(e.target.value)
                                            }
                                            readOnly={editMode === false}
                                            type="text"
                                            className={`w-full border border-gray-300 p-2 rounded-md text-sm mb-3 ${
                                                !editMode ? "outline-none" : ""
                                            }`}
                                            placeholder="input link image here"
                                        />
                                        <p>
                                            Catatan :
                                            <br />
                                            Gunakan gambar dengan minimal lebar
                                            dan tinggi ( 700 x 455)
                                        </p>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <img
                                            src={heroImage}
                                            alt="image"
                                            style={{
                                                objectFit: "cover",
                                                height: 300,
                                                width: 300,
                                            }}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <div
                                            id="actions"
                                            className="flex items-center justify-center gap-2"
                                        >
                                            {editMode ? (
                                                <button
                                                    onClick={() =>
                                                        handleSave(
                                                            "hero",
                                                            idHero
                                                        )
                                                    }
                                                    className="bg-green-600 py-1 px-4 rounded-md text-white"
                                                >
                                                    Simpan
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={handleEditMode}
                                                    className="bg-blue-600 py-1 px-4 rounded-md text-white"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr className="my-4" />
                    <div id="history">
                        <h1 className="text-xl font-semibold mb-2">
                            Image Sejarah
                        </h1>
                        <table className="w-full">
                            <thead>
                                <tr className="w-full bg-slate-300">
                                    <th className="border border-gray-300 p-2 w-6/12">
                                        Link Image
                                    </th>
                                    <th className="border border-gray-300 p-2 w-[310px]">
                                        Preview
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            value={historyImage}
                                            readOnly={editMode2 === false}
                                            type="text"
                                            className={`w-full border border-gray-300 p-2 rounded-md text-sm mb-3 ${
                                                !editMode2 ? "outline-none" : ""
                                            }`}
                                            placeholder="input link image here"
                                            onChange={(e) =>
                                                setHistoryImage(e.target.value)
                                            }
                                        />
                                        <p>
                                            Catatan :
                                            <br />
                                            Gunakan gambar dengan minimal lebar
                                            dan tinggi ( 700 x 455)
                                        </p>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <img
                                            src={historyImage}
                                            alt="image"
                                            style={{
                                                objectFit: "cover",
                                                height: 300,
                                                width: 300,
                                            }}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <div
                                            id="actions"
                                            className="flex items-center justify-center gap-2"
                                        >
                                            {editMode2 ? (
                                                <button
                                                    onClick={() =>
                                                        handleSave(
                                                            "history",
                                                            idHistory
                                                        )
                                                    }
                                                    className="bg-green-600 py-1 px-4 rounded-md text-white"
                                                >
                                                    Simpan
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={handleEditMode2}
                                                    className="bg-blue-600 py-1 px-4 rounded-md text-white"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImagesSettings;
