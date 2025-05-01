// const recentlyPlayed = [
//     { title: "Ballad Việt Ngày Nay", img: "/path/to/image1.jpg" },
//     { title: "#zingchart", img: "/path/to/image2.jpg" },
//     { title: "Old But Gold", img: "/path/to/image3.jpg" },
//     { title: "Top 100 Nhạc Electronic/Dance", img: "/path/to/image4.jpg" },
//     { title: "Top 100 Pop Âu Mỹ Hay Nhất", img: "/path/to/image5.jpg" },
//     { title: "Hit-Maker: Hứa Kim Tuyền", img: "/path/to/image6.jpg" },
// ];
import {getDSBaiRandom, getDSPlaylist} from "../../services/User/TrangChuService.tsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
    FaHeart
} from "react-icons/fa";

export default function HomeUser({ onPlaySong }: { onPlaySong: (song: any) => void }) {
    const [baiHatRandom, setBaiHatRandom] = useState<any[]>([]);
    const [playlist, setPlaylist] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getBaiHatRandom = async () => {
        setIsLoading(true);
        try {
            const res = await getDSBaiRandom();
            if (res && !res.error) {
                setBaiHatRandom(res);
            }
        } catch (e: any) {
            console.error("Đã có lỗi xảy ra", e);
        }
        setIsLoading(false);
    }

    const getPlaylist = async () => {
        setIsLoading(true);
        try {
            const res = await getDSPlaylist();
            if (res && !res.error) {
                setPlaylist(res);
            }
        } catch (e: any) {
            console.error("Đã có lỗi xảy ra", e);
        }
    }

    useEffect(() => {
        getBaiHatRandom();
        getPlaylist();
    }, []);
    return (
        <div className="p-15 bg-[#170f23] text-white">
            {/*<section className="mb-10">*/}
            {/*    <div className="flex justify-between items-center mb-4">*/}
            {/*        <h2 className="text-2xl font-bold">Nghe Gần Đây</h2>*/}
            {/*        <button className="text-sm text-purple-400 hover:underline">Tất Cả {'>'}</button>*/}
            {/*    </div>*/}
            {/*    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">*/}
            {/*        {recentlyPlayed.map((item, index) => (*/}
            {/*            <div key={index} className="flex flex-col items-center">*/}
            {/*                <img*/}
            {/*                    src={item.img}*/}
            {/*                    alt={item.title}*/}
            {/*                    className="rounded-lg w-full h-28 object-cover mb-2"*/}
            {/*                />*/}
            {/*                <span className="text-sm text-center">{item.title}</span>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/* Gợi Ý Cho Bạn */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Gợi Ý Cho Bạn</h2>
                    <button
                        onClick={getBaiHatRandom}
                        disabled={isLoading}
                        className={`text-sm px-4 py-1 rounded-full flex items-center gap-2 cursor-pointer
        ${isLoading ? 'bg-gray-400' : 'bg-purple-500 hover:bg-purple-600'} text-white transition`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                Đang làm mới...
                            </>
                        ) : (
                            <>
                                <svg className="h-4 w-4 " viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="2">
                                    <path
                                        d="M4 4v5h.582M20 20v-5h-.581M4.582 9A7.5 7.5 0 0112 4.5c2.033 0 3.878.79 5.218 2.082M19.418 15A7.5 7.5 0 0112 19.5c-2.033 0-3.878-.79-5.218-2.082"/>
                                </svg>
                                Làm Mới
                            </>
                        )}
                    </button>

                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {baiHatRandom.map((item) => (
                        <div key={item.id}
                             className="group relative flex items-center gap-6 hover:bg-[#2a213a] rounded-md transition duration-300">

                            <img
                                src={`http://127.0.0.1:8000/${item.anh}`}
                                alt={item.title}
                                className="w-15 h-15 object-cover rounded-md flex-shrink-0 cursor-pointer m-2"
                                onClick={() => onPlaySong(item)}/>
                            <div className="flex flex-col overflow-hidden">
                                <Link to="/">
                                    <span
                                        className="font-semibold hover:text-[#9b4de0] text-[18px] truncate max-w-[150px]">
                                        {item.title}
                                    </span>
                                </Link>
                                <Link to="/">
      <span className="text-xs text-gray-400 hover:text-[#9b4de0] truncate max-w-[180px]">
        {item.casi.ten_casi}
      </span>
                                </Link>
                            </div>
                            <div
                                className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button className="text-white hover:text-pink-500 cursor-pointer">
                                    <FaHeart/>
                                </button>
                                <button className="text-white hover:text-gray-400 cursor-pointer">
                                    ⋮
                                </button>
                            </div>

                        </div>

                    ))}
                </div>
            </section>
            <section>
                <div className=" py-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-white text-2xl font-bold">Chill</h2>
                        <a href="#" className="text-sm text-gray-400 hover:text-white">
                            TẤT CẢ &gt;
                        </a>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {playlist.map((playlist, index) => (
                            <div key={index} className="cursor-pointer group">
                                <div className="w-full h-[210px] bg-gray-500 rounded-lg overflow-hidden">

                                    <img
                                        src={`http://127.0.0.1:8000/${playlist.anh}`}
                                        alt={playlist.ten_playlist}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter brightness-90 grayscale-[60%]"
                                    />
                                </div>
                                <h3 className="text-gray-500 mt-2 font-semibold text-sm">{playlist.ten_playlist}</h3>
                                <p className="text-gray-400 text-xs line-clamp-2">{playlist.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
