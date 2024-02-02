import React from "react";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div id="footer" className="bg-primary px-4 pt-4 mt-20 ">
            <div
                id="footer"
                className="grid gap-4 grid-cols-1 text-white md:pt-7 md:flex md:items-center md:justify-start md:gap-20"
            >
                <div id="logo" className="bg-white w-1/2 p-2 rounded md:w-fit">
                    <img src="/images/logo-pokjar.svg" alt="logo-pokjar" />
                </div>
                <div id="media-contact" className="flex gap-10 md:w-fit md:gap-20">
                    <div id="media" className="flex flex-col gap-1">
                        <p className="text-sm">Media Sosial</p>
                        <div id="insta" className="flex items-center gap-1">
                            <FaInstagram />
                            <p className="text-[10px] font-light">
                                Pokjar_Gemilang
                            </p>
                        </div>
                        <div id="insta" className="flex items-center gap-1">
                            <AiOutlineFacebook />
                            <p className="text-[10px] font-light">
                                Pokjar Gemilang
                            </p>
                        </div>
                    </div>
                    <div id="contact" className="flex flex-col gap-1">
                        <p className="text-sm">Kontak Person</p>
                        <div id="wa" className="flex items-center gap-1">
                            <FaWhatsapp />
                            <p className="text-[10px] font-light">
                                +62 821-3828-7005 (Bu Aminah)
                            </p>
                        </div>
                        <div id="wa" className="flex items-center gap-1">
                            <FaWhatsapp />
                            <p className="text-[10px] font-light">
                                +62 882-0033-35460 (Bu Riska)
                            </p>
                        </div>
                    </div>
                </div>
                <div id="location" className="flex flex-col gap-1">
                    <p className="text-sm">Alamat Lokasi</p>
                    <div id="loc-icon" className="flex items-start gap-1">
                        <IoLocationOutline />
                        <div id="loc" className="text-[10px] font-light">
                            <p>
                                Jl. Sawangan-Gombong Rt 02 Rw 01, Desa Sawangan,
                                Kec. Kuwarasan, Kab. Kebumen, KP 54366.
                            </p>
                            <p>
                                Buka layanan offline setiap hari pukul 08.30 -
                                14.00 ( Minggu tutup). Layanan online setiap
                                hari 24 jam
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="copyright" className="bg-white py-2 rounded-t-md mt-5 md:mt-10">
                <p className="text-[8px] text-center text-slate-700 md:text-sm">
                    Copyright {currentYear} - All Rights Reserved |
                    goingtoweb.com
                </p>
            </div>
        </div>
    );
};

export default Footer;
