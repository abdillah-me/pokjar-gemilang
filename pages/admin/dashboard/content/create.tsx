import React, { useState } from "react";
import Authguard from "../../../../src/guard/Authguard";
import Sidebar from "../Sidebar";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../src/axios/firebase";
import { useRouter } from "next/router";
import { Editor, EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";

const CreateNews: React.FC = () => {
    const router = useRouter();
    const [judul, setJudul] = useState<string>("");
    const [isiBerita, setIsiBerita] = useState(() => EditorState.createEmpty());
    const [images, setImages] = useState<any[]>([]);

    const addData = async (e: any) => {
        e.preventDefault();
        const rawContentState: any = convertToRaw(isiBerita.getCurrentContent());

        if (
            judul === "" ||
            !isiBerita.getCurrentContent().hasText() ||
            images.length === 0
        ) {
            alert("data tidak boleh ada yang kosong");
            return;
        }
        const payload = {
            created: new Date(),
            title: judul,
            content: JSON.stringify(rawContentState),
            image: images,
        };

        try {
            const docRef = await addDoc(collection(db, "news"), payload);
            console.log("Document written with ID: ", docRef.id);
            if (docRef) {
                router.replace("/admin/dashboard/content");
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
    return (
        <Authguard>
            <Sidebar>
                <div id="createnews" className="p-4">
                    <p className="font-semibold text-xl">Buat berita terbaru</p>
                    <hr className="my-3" />
                    <form
                        id="form"
                        action=""
                        className="flex flex-col gap-4"
                        onSubmit={addData}
                    >
                        <div id="judul" className="flex flex-col gap-1 ">
                            <label
                                htmlFor="judul"
                                className="text-sm font-semibold"
                            >
                                Judul Berita
                            </label>
                            <input
                                type="text"
                                className="border border-gray-200 outline-gray-200 rounded-md px-2 py-1"
                                placeholder="Masukkan Judul Berita"
                                onChange={(e) => setJudul(e.target.value)}
                            />
                        </div>
                        <div id="gambar" className="flex flex-col gap-1 ">
                            <label
                                htmlFor="judul"
                                className="text-sm font-semibold"
                            >
                                Cover Gambar
                            </label>
                            <input
                                type="text"
                                className="border border-gray-200 outline-gray-200 rounded-md px-2 py-1"
                                placeholder="Masukkan link gambar"
                                onChange={(e) =>
                                    setImages([...images, e.target.value])
                                }
                            />
                        </div>
                        <div id="isi-berita" className="flex flex-col gap-1 ">
                            <label
                                htmlFor="isiBerita"
                                className="text-sm font-semibold"
                            >
                                Isi berita
                            </label>
                            <div className="border border-gray-200 outline-gray-200 rounded-md p-2">
                                <Editor
                                    editorState={isiBerita}
                                    onChange={setIsiBerita}
                                    placeholder="Masukkan isi berita"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 py-1 px-4 rounded-md text-white w-fit"
                        >
                            Simpan
                        </button>
                    </form>
                </div>
            </Sidebar>
        </Authguard>
    );
};

export default CreateNews;
