import React, { useEffect, useState } from "react";
import { GoCheckCircle } from "react-icons/go";
import { LuChevronRight } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa6";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../src/axios/firebase";
import Link from "next/link";

interface Props {
    data: any[];
}

const HomePage: React.FC<Props> = ({ data }) => {
    return (
        <div id="container">
            <div
                id="hero"
                className="px-4 py-4 bg-white flex flex-col-reverse items-center gap-4 md:flex-row md:items-center md:w-full md:px-8 md:py-[15vh]"
            >
                <div id="hero-heading" className="md:w-6/12">
                    <p className="text-md font-medium  text-primary md:mb-4">
                        Saatnya Kuliah Online
                    </p>
                    <p className="text-2xl font-semibold  text-primary md:text-[40px] md:font-bold md:mb-4">
                        POKJAR GEMILANG
                    </p>
                    <p className="text-2xl font-semibold  text-primary md:text-[40px] md:font-bold md:mb-4">
                        KABUPATEN KEBUMEN
                    </p>
                    <p className="text-[12px] font-[100p] md:text-[20px] text-primary">
                        (Untuk Masa Depan Gemilang) - Universitas Terbuka
                        Purwokerto{" "}
                    </p>
                    <button className="bg-primary py-1 flex gap-2 items-center px-4 text-[12px] font-[100] text-white rounded-md mt-5 md:py-2 md:text-[12px] md:font-semibold">
                        Lebih lanjut tentang kami <FaAngleRight />
                    </button>
                </div>
                <div id="hero-image" className="md:w-6/12">
                    <img
                        src={data[0]?.url}
                        alt="hero-image"
                        style={{
                            width: "100%",
                            height: "40vh",
                            objectFit: "cover",
                        }}
                    />
                </div>
            </div>
            <div
                id="history"
                className="bg-[#FAFAFA] px-4 py-4 flex flex-col gap-4 md:w-full md:flex-row md:items-center md:justify-between md:gap-[40px] md:py-10 md:px-8"
            >
                <div id="history-image" className="md:w-5/12">
                    <img
                        src={data[1]?.url}
                        alt="hero-image"
                        style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                        }}
                    />
                </div>
                <div id="history-title" className="md:w-full">
                    <p className="text-primary text-sm md:text-base">
                        Tentang kami
                    </p>
                    <p className="text-gray-900 font-semibold text-lg md:text-xl">
                        Sejarah dan Latar Belakang
                    </p>
                    <div
                        className="bg-primary rounded-full my-2"
                        style={{ width: "30%", height: "6px" }}
                    ></div>
                    <p className="text-[12px] leading-5 text-gray-600 mt-3 text-justify md:text-lg">
                        Di Wilayah Sekitar Pokjar Gemilang, yang Berlokasi di
                        Jalan Kabupaten Menghubungkan Kecamatan Kuwarasan,
                        Adimulyo, Karanganyar, Gombong, banyak terdapat Sekolah
                        Lanjutan Tingkat Atas. Mayoritas siswanya berasal dari
                        masyarakat petani dan pedagang. Setelah lulus SLTA,
                        banyak dari mereka bekerja di Kebumen atau luar Kebumen.
                        Beberapa juga bekerja di pabrik-pabrik di sekitar
                        wilayah, seperti Pabrik Rokok Sampoerna, Pabrik Ternit,
                        pengolahan kayu, pabrik bata dan genteng, serta di
                        supermarket dan toko-toko di wilayahnya. Beberapa juga
                        bekerja di sektor perbankan seperti BCA, BSI, BRI,
                        Mandiri, BNI, Bank Jateng, Danamon, dll. Dengan motivasi
                        tinggi untuk melanjutkan kuliah, UT menjadi solusi
                        efisien bagi mereka. Oleh karena itu, didirikanlah
                        tempat layanan UT Purwokerto. Oleh karena itu
                        didirikanlah KELOMPOK BELAJAR (POKJAR) UNIVERSITAS
                        PURWOKERTO di Kebumen dengan nama POKJAR GEMILANG pada
                        tanggal 1 Mei 2023 untuk memberi layanan bagi mahasiswa,
                        calon mahasiswa dan masyarakat luas di kabupaten Kebumen
                        dan juga luar kabupaten Kebumen yang Membutuhkan.
                    </p>
                </div>
            </div>
            <div
                id="visi-misi"
                className="px-4 py-4 mt-4 text-slate-900 md:px-8"
            >
                <p className="text-md font-semibold  md:text-xl">
                    Visi dan Misi{" "}
                </p>
                <p className="text-md font-semibold  md:text-xl">
                    Universitas Terbuka Purwokerto
                </p>
                <div
                    className="bg-primary rounded-full w-[30%] my-2 md:w-1/6"
                    style={{ height: "6px" }}
                ></div>
                <div
                    id="card"
                    className="flex flex-col gap-2 md:flex-row md:gap-4 md:mt-4"
                >
                    <div
                        id="visi"
                        className="p-4 shadow-md rounded-md md:w-6/12 md:p-5"
                    >
                        <p className="text-sm font-semibold text-slate-800 mb-2 md:text-lg">
                            Visi
                        </p>
                        <div
                            id="visi-point"
                            className=" flex items-center gap-2 text-[12px] md:text-lg"
                        >
                            <div id="icon">
                                <GoCheckCircle
                                    className="text-primary"
                                    style={{ width: "20px" }}
                                />
                            </div>
                            <p>
                                Menjadi Perguruan Tinggi Terbuka dan Jarak Jauh
                                Berkualitas Dunia
                            </p>
                        </div>
                    </div>
                    <div
                        id="misi"
                        className="p-4 shadow-md rounded-md md:w-6/12 md:p-5"
                    >
                        <p className="text-sm font-semibold text-slate-800 mb-2 md:text-xl">
                            Misi
                        </p>
                        <div
                            id="point"
                            className="flex flex-col gap-2 w-full md:text-lg"
                        >
                            <div
                                id="visi-point"
                                className=" flex items-center gap-2 text-[12px] md:text-lg"
                            >
                                <div id="icon">
                                    <GoCheckCircle
                                        className="text-primary"
                                        style={{ width: "20px" }}
                                    />
                                </div>
                                <p>
                                    Meningkatkan Daya Tampung Perguruan Tinggi
                                    Negeri
                                </p>
                            </div>
                            <div
                                id="visi-point"
                                className=" flex items-center gap-2 text-[12px] md:text-lg"
                            >
                                <div id="icon">
                                    <GoCheckCircle
                                        className="text-primary"
                                        style={{ width: "20px" }}
                                    />
                                </div>
                                <p>
                                    Meningkatkan Pemerataan Akses Pendidikan
                                    Tinggi yang Berkualitas Dunia
                                </p>
                            </div>
                            <div
                                id="visi-point"
                                className=" flex items-center gap-2 text-[12px] md:text-lg"
                            >
                                <div id="icon">
                                    <GoCheckCircle
                                        className="text-primary"
                                        style={{ width: "20px" }}
                                    />
                                </div>
                                <p>
                                    Mengembangkan Budaya Belajar Sepanjang Hayat
                                </p>
                            </div>
                            <div
                                id="visi-point"
                                className=" flex items-center gap-2 text-[12px] md:text-lg"
                            >
                                <div id="icon">
                                    <GoCheckCircle
                                        className="text-primary"
                                        style={{ width: "20px" }}
                                    />
                                </div>
                                <p>
                                    Mendiseminasikan Hasil Kajian Keilmuan dan
                                    Pendidikan Jarak Jauh untuk Mendukung
                                    Pembangunan Nasional dan Global
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="get-collage" className="px-4 py-4 mt-4 md:px-8">
                <p className="text-md font-semibold md:text-xl">
                    Sistem Pengambilan Mata Kuliah
                </p>
                <div
                    className="bg-primary rounded-full w-[30%] my-2 md:w-1/6"
                    style={{ height: "6px" }}
                ></div>
                <div
                    id="card"
                    className="p-4 shadow-md rounded-md flex flex-col gap-3 text-[12px] md:mt-4"
                >
                    <div id="sipas">
                        <p className="font-semibold text-primary  md:text-lg">
                            SIPAS (Sistem Paket Semester)
                        </p>
                        <p className="text-justify  md:text-base">
                            Sipas adalah sistem pengambilan matakuliah yang
                            dibuat dalam bentuk paket-paket semester. Sipas
                            terdiri dari Sipas Non TTM, Sipas Semi, dan Sipas
                            Penuh. Sipas Non TTM merupakan Sipas tanpa tutorial
                            tatap muka, tutorial yang diberikan berupa Tutorial
                            Online. Sipas Semi merupakan Sipas dengan tutorial
                            tatap muka untuk setengah dari jumlah matakuliah
                            yang ada dalam paket. Sipas Penuh merupakan Sipas
                            dengan tutorial tatap muka untuk semua matakuliah
                            yang ada dalam paket.
                        </p>
                    </div>
                    <div id="non-sipas">
                        <p className="font-semibold text-primary md:text-lg">
                            NON SIPAS
                        </p>
                        <p className="text-justify  md:text-base">
                            Non Sipas adalah sistem pengambilan matakuliah yang
                            dilakukan secara bebas. oleh mahasiswa. Pemilihan
                            matakuliah dapat berpedoman pada Katalog UT
                        </p>
                    </div>
                </div>
            </div>
            <div id="academik" className="px-4 py-4 mt-4 bg-[#FAFAFA] md:p-8">
                <p className="text-md font-semibold md:text-xl">Akademik</p>
                <div
                    className="bg-primary rounded-full w-[30%] my-2 md:w-1/6"
                    style={{ height: "6px" }}
                ></div>
                <div
                    id="major"
                    className="grid gap-4 grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 md:mt-4"
                >
                    <Link href={"https://www.ut.ac.id/feb/"} target="_blank">
                        <p className="bg-primary text-[12px] p-2 rounded-md text-white md:text-base">
                            Fakultas Ekonomi & Bisnis ( FEB )
                        </p>
                    </Link>
                    <Link href={"https://www.ut.ac.id/fst/"} target="_blank">
                        <p className="bg-primary text-[12px] p-2 rounded-md text-white md:text-base">
                            Fakultas Sains & Teknologi (FST)
                        </p>
                    </Link>
                    <Link href={"https://www.ut.ac.id/fhisip/"} target="_blank">
                        <p className="bg-primary text-[12px] p-2 rounded-md text-white md:text-base">
                            Fakultas Hukum, Ilmu Sosial, dan Ilmu Hukum ( FISHIP
                            )
                        </p>
                    </Link>
                    <Link href={"https://www.ut.ac.id/fkip/"} target="_blank">
                        <p className="bg-primary text-[12px] p-2 rounded-md text-white md:text-base">
                            Fakultas Keguruan & Ilmu Pendidikan (FKIP)
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
