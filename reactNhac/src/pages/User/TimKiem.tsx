import {FaSearch, FaDownload, FaCog } from "react-icons/fa";

export default function HeaderUser() {
    return (
        <div className="flex items-center justify-between px-4 py-2 bg-[#1a152b] h-[65px] backdrop-blur-md ">
            <div className="flex-1 mx-4 px-30">
                <div className="flex items-center bg-[#2f2739] rounded-full px-4 py-2">
                    <FaSearch className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                        className="bg-transparent outline-none text-white flex-1 placeholder-gray-400 text-sm"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button className="bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
                    Nâng cấp tài khoản
                </button>
                <button className="flex items-center bg-[#2f2739] hover:bg-[#3b2f4a] text-purple-400 text-sm font-semibold px-4 py-2 rounded-full">
                    <FaDownload className="mr-2" />
                    Tải bản Windows
                </button>
                <button className="bg-[#2f2739] p-2 rounded-full">
                    <FaCog className="text-white" />
                </button>
                <img
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                />
            </div>

        </div>
    );
}
