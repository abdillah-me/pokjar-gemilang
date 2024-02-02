import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../src/axios/firebase";
import Authguard from "../../../../../src/guard/Authguard";
import Sidebar from "../../Sidebar";

const EditContent: React.FC = () => {
    const router = useRouter();
    const { id }: any = router.query;

    const [judul, setJudul] = useState<string>("");
    const [isiBerita, setIsiBerita] = useState<string>("");
    const [images, setImages] = useState<any[]>([]);

    const getDocumentById = async (id: string) => {
        try {
            const docRef = doc(db, "news", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setJudul(docSnap.data().title);
                setIsiBerita(docSnap.data().content);
                setImages(docSnap.data().image);
                return docSnap.data(); // Mengembalikan data dokumen
            } else {
                console.log("No such document!");
                return null; // Jika dokumen tidak ditemukan
            }
        } catch (error) {
            console.error("Error getting document:", error);
            throw error; // Melempar error untuk penanganan lebih lanjut jika diperlukan
        }
    };

    useEffect(() => {
        if (router.isReady && id) {
            getDocumentById(id);
        }
    }, [id]);

    const updateData = async (docId: string) => {
        if (judul === "" || isiBerita === "" || images.length === 0) {
            alert("data tidak boleh ada yang kosong");
            return;
        }
        const payload = {
            created: new Date(),
            title: judul,
            content: isiBerita,
            image: images,
        };
        try {
            const docRef = doc(db, "news", docId);
            const updateData = await updateDoc(docRef, payload);
            router.replace("/admin/dashboard/content");
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    };

    return (
        <Authguard>
            <Sidebar>
                <div id="createnews" className="p-4">
                    <p>Buat berita terbaru</p>
                    <hr className="my-3" />
                    <div id="form" className="flex flex-col gap-4">
                        <div id="judul" className="flex flex-col gap-1 ">
                            <label
                                htmlFor="judul"
                                className="text-sm font-semibold"
                            >
                                Judul Berita
                            </label>
                            <input
                                value={judul}
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
                                value={images[0]}
                                type="text"
                                className="border border-gray-200 outline-gray-200 rounded-md px-2 py-1"
                                placeholder="Masukkan link gambar"
                                onChange={(e) =>
                                    setImages([
                                        ...images.slice(0, 0),
                                        e.target.value,
                                        ...images.slice(0 + 1),
                                    ])
                                }
                            />
                        </div>
                        <div id="gambar" className="flex flex-col gap-1 ">
                            <label
                                htmlFor="judul"
                                className="text-sm font-semibold"
                            >
                                Gambar Tambahan ( opsional )
                            </label>
                            <input
                                value={images[1] ?? ""}
                                type="text"
                                className="border border-gray-200 outline-gray-200 rounded-md px-2 py-1"
                                placeholder="Masukkan link gambar"
                                onChange={(e) =>
                                    setImages([
                                        ...images.slice(0, 1),
                                        e.target.value,
                                        ...images.slice(1 + 1),
                                    ])
                                }
                            />
                        </div>
                        <div id="gambar" className="flex flex-col gap-1 ">
                            <label
                                htmlFor="judul"
                                className="text-sm font-semibold"
                            >
                                Gambar Tambahan ( opsional )
                            </label>
                            <input
                                value={images[2] ?? ""}
                                type="text"
                                className="border border-gray-200 outline-gray-200 rounded-md px-2 py-1"
                                placeholder="Masukkan link gambar"
                                onChange={(e) =>
                                    setImages([
                                        ...images.slice(0, 2),
                                        e.target.value,
                                        ...images.slice(2 + 1),
                                    ])
                                }
                            />
                        </div>
                        <div id="isi-berita" className="flex flex-col gap-1 ">
                            <label
                                htmlFor="judul"
                                className="text-sm font-semibold"
                            >
                                Isi berita
                            </label>
                            <textarea
                                value={isiBerita}
                                className="border border-gray-200 outline-gray-200 rounded-md px-2 py-1"
                                placeholder="Masukkan isi berita"
                                onChange={(e) => setIsiBerita(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => updateData(id)}
                            className="bg-blue-600 py-1 px-4 rounded-md text-white w-fit"
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </Sidebar>
        </Authguard>
    );
};

export default EditContent;
