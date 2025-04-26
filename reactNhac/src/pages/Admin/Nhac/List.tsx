import ReactPaginate from "react-paginate";
import { useState, useEffect } from 'react';
import Sidebar from '../SideBar';
import { getListBaiHat,deleteBaiHat} from "../../../services/Admin/BaiHatService";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import YouTubeAudioPlayer from "../../../services/AudioSong.tsx";
const ListBaiHat = () => {
    const [list, setList] = useState<any[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);


    const getData = async (page: number) => {
        const res = await getListBaiHat(page);
        if (res && Array.isArray(res.data)) {
            setList(res.data);
            setPageCount(res.last_page);
        } else {
            setList([]);
        }
    }

    const handleDelete = async (id: number) => {
        const confirmDelete = confirm("Bạn có chắc chắn muốn xóa bài hát này?");
        if (!confirmDelete) return;
        try {
            await deleteBaiHat(id);
            alert("Đã xóa thành công");
            if (list.length === 1 && currentPage > 1) {
                const newPage = currentPage - 1;
                setCurrentPage(newPage);
            } else {
                if(list.length===1)
                    window.location.reload();
                else
                    setCurrentPage(currentPage);
            }

            await getData(currentPage);
        } catch (error: any) {
            alert("Xóa thất bại! " + (error.message || "Lỗi không xác định"));
        }
    };

    useEffect(() => {
        getData(currentPage);
    }, [currentPage]);

    const handlePageClick = (data: any) => {
        setCurrentPage(data.selected + 1);
    };

    return (
        <div className="flex">
            <Sidebar/>
            <div className="flex-1 p-10 ">
                <table className="text-black w-full text-center border border-black border-collapse">
                    <thead>
                    <tr className="bg-blue-300 border border-black">
                        <th className="w-[50px] border border-black">ID</th>
                        <th className="border border-black">Tên bài hát</th>
                        <th className="border border-black">Ca sĩ</th>
                        <th className="border border-black">Thể loại</th>
                        <th className="border border-black">Bài hát</th>
                        <th className="border border-black">Ảnh</th>
                        <th className="border border-black">Thời lượng</th>
                        <th className="border border-black">Trạng thái</th>
                        <th className="border border-black">Cập nhật</th>
                        <th className="border border-black"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(list) && list.length > 0 ? (
                        list.map((item) => (
                            <tr key={item.id}>
                                <td className="w-[50px] bg-white text-black border border-black">{item.id}</td>
                                <td className="bg-white text-black border border-black">{item.title}</td>
                                <td className="bg-white text-black border border-black">
                                    {item.casi.ten_casi}
                                </td>
                                <td className="bg-white text-black border border-black">
                                    {item.theloai.ten_theloai}
                                </td>
                                <td className="bg-white text-black border border-black p-2">
                                    <div className="justify-center items-center flex">
                                        <YouTubeAudioPlayer videoUrl={item.audio_url}/>
                                    </div>
                                </td>
                                <td className="bg-white text-black border border-black ">
                                    <img src={`http://127.0.0.1:8000/${item.anh}`} className="w-[90px] h-[70px] m-auto p-2"
                                         alt="Poster"/>
                                </td>
                                <td className="bg-white text-black border border-black">
                                    {item.thoiluong} phút
                                </td>
                                <td className="bg-white text-black text-center border border-black">
                                    {item.trangthai === 1 ? (
                                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">YES</span>
                                    ) : (
                                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">NO</span>
                                    )}
                                </td>
                                <td className="bg-white text-black border border-black">
                                    {dayjs(item.updated_at).format('DD/MM/YYYY')}
                                </td>
                                <td className="p-2 border border-black">
                                    <Link
                                        to={`/admin/songs/edit/${item.id}`}
                                        className="bg-blue-500 px-2 py-1 text-white rounded m-1 inline-block"
                                    >
                                        Sửa
                                    </Link>
                                    <button className="bg-red-500 px-2 py-1 text-white rounded cursor-pointer"
                                            onClick={() => handleDelete(item.id)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={9} className="bg-red-100 border border-red-400 text-red-700 text-center">
                                {list.length === 0 ? "Không có dữ liệu" : list}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName="flex justify-center items-center space-x-2 mt-4"
                    activeClassName="bg-blue-500 text-white border border-blue-500 w-[42px] h-10 flex items-center justify-center rounded-md" // Đảm bảo trang active có diện tích và căn giữa
                    pageClassName="page-item"
                    pageLinkClassName="page-link px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white transition-all"
                    previousClassName="prev-item px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    nextClassName="next-item px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                />


            </div>
        </div>
    );
};

export default ListBaiHat;
