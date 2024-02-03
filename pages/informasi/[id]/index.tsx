import React, { useEffect, useState } from "react";
import Layout from "../../../src/components/Layout/Layout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../src/axios/firebase";
import { useRouter } from "next/router";
import { Editor, EditorState, convertFromRaw } from "draft-js";

const DetailNews: React.FC = () => {
    const router = useRouter();
    const { id }: any = router.query;

    const [berita, setBerita] = useState<any>(null);
    const [firstLoading, setFirstLoading] = useState<boolean>(true);

    const getDocumentById = async (id: string) => {
        try {
            const docRef = doc(db, "news", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                let contentState;
                try {
                    // Check if data.content is a string and parse it
                    contentState =
                        typeof data.content === "string"
                            ? convertFromRaw(JSON.parse(data.content))
                            : convertFromRaw(data.content); // Use directly if it's already an object
                } catch (error) {
                    console.error("Error parsing content: ", error);
                    // Handle error or set a fallback state
                }

                if (contentState) {
                    const editorState =
                        EditorState.createWithContent(contentState);
                    setBerita({ ...data, content: editorState });
                }
            }
        } catch (error) {
            console.error("Error getting document:", error);
            throw error; // Melempar error untuk penanganan lebih lanjut jika diperlukan
        } finally {
            setFirstLoading(false);
        }
    };

    useEffect(() => {
        if (router.isReady && id) {
            getDocumentById(id);
        }
    }, [id, router]);

    const convertTimestampToReadableDate = (timestamp: any) => {
        const date = new Date(timestamp?.seconds * 1000);
        return date.toLocaleString(); // Atau gunakan date.toLocaleDateString() untuk hanya tanggal tanpa waktu
    };
    return (
        <Layout>
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
                <div id="container" className="px-8 py-8">
                    <div id="heading" className="mb-4">
                        <h1 className="text-xl text-center font-semibold capitalize">
                            {berita?.title}
                        </h1>
                    </div>
                    <div id="image">
                        <img
                            src={berita?.image[0]}
                            alt=""
                            className="w-full h-[50vh] object-cover rounded-md"
                        />
                    </div>
                    <div id="date">
                        <p className="text-sm mt-2">
                            {convertTimestampToReadableDate(berita?.created)}
                        </p>
                    </div>
                    <hr className="my-4" />
                    <div id="news">
                        {berita && (
                            <Editor
                                editorState={berita.content}
                                readOnly={true}
                                onChange={() => {}}
                            />
                        )}
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default DetailNews;
