import { useState } from "react";
import { FaHome, FaChartLine, FaCompactDisc, FaStar } from "react-icons/fa";

import { RiPlayListAddLine } from "react-icons/ri";
import HeaderUser from "./TimKiem.tsx";

export default function SidebarUser() {
    const [active, setActive] = useState("Khám Phá");

    const menusTop = [
        { name: "Thư Viện", icon: <FaHome /> },
        { name: "Khám Phá", icon: <FaCompactDisc /> },
        { name: "#zingchart", icon: <FaChartLine /> },
    ];

    const menusBottom = [
        { name: "BXH Nhạc Mới", icon: <FaChartLine /> },
        { name: "Chủ Đề & Thể Loại", icon: <FaCompactDisc /> },
        { name: "Top 100", icon: <FaStar /> },
    ];

    return (
        <div className="flex">
            <div className="w-64 bg-[#251b39] text-white h-screen p-4 flex flex-col">
                <div className="text-4xl font-bold mb-8 flex items-center gap-1 pl-3">
                    <span className="text-blue-400 stroke-white">Z</span>
                    <span className="text-pink-400 stroke-white">i</span>
                    <span className="text-yellow-400 stroke-white">n</span>
                    <span className="text-green-400 stroke-white">g</span>

                    <span className="text-white ml-1 text-xl self-end">mp4</span>
                </div>

                <div className="flex flex-col gap-2">
                    {menusTop.map((menu) => (
                        <div
                            key={menu.name}
                            onClick={() => setActive(menu.name)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#2f2739] ${
                                active === menu.name ? "bg-[#2f2739]" : ""
                            }`}
                        >
                            <span className="text-xl">{menu.icon}</span>
                            <span className="text-sm font-semibold">{menu.name}</span>
                        </div>
                    ))}
                </div>

                <hr className="my-4 border-[#2f2739]"/>

                <div className="flex flex-col gap-2">
                    {menusBottom.map((menu) => (
                        <div
                            key={menu.name}
                            onClick={() => setActive(menu.name)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#2f2739] ${
                                active === menu.name ? "bg-[#2f2739]" : ""
                            }`}
                        >
                            <span className="text-xl">{menu.icon}</span>
                            <span className="text-sm font-semibold">{menu.name}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-center">
                    <p className="text-xs mb-2">Đăng nhập để khám phá playlist dành riêng cho bạn</p>
                    <button className="bg-white text-purple-600 font-semibold text-sm px-4 py-1 rounded-full">
                        ĐĂNG NHẬP
                    </button>
                </div>

                <div className="mt-auto">
                    <button className="flex items-center gap-2 text-sm px-3 py-2 hover:bg-[#2f2739] w-full rounded-lg">
                        <RiPlayListAddLine className="text-xl"/>
                        Tạo playlist mới
                    </button>
                </div>
            </div>

            <div className="flex-1">
                <HeaderUser/>
            </div>
            </div>
            );
            }
