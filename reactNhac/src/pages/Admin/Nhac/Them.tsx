import Sidebar from '../SideBar';
import {SubmitHandler, useForm} from "react-hook-form";
import {postCaSi} from "../../../services/Admin/CaSiService.tsx";
import {useState,useEffect} from "react";
import {getDSTheLoai} from "../../../services/Admin/BaiHatService.tsx";
import Select from 'react-select';
type Inputs = {
    tenBaiHat: string,
    idCaSi:string,
    idTheLoai: string,
    audio_URL: string,
    anh:File,
    thoiLuong:bigint,
    trangThai:boolean,
    ngayTao: Date,
};


const BaiHat = () => {
    const [thongBao, setThongBao] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const {register, handleSubmit, reset, formState: {errors},setValue} = useForm<Inputs>();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [theLoai,setTheLoai] =useState<any[]>([]);
    const getTheLoai=async ()=>{
        try{
            const res = await getDSTheLoai();
            if (res && Array.isArray(res)) {
                setTheLoai(res);
            }
        }
        catch (error){
            setThongBao({type: 'error', message: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.'});
        }
    }
    const themBaiHat: SubmitHandler<Inputs> = async (data) => {
        try {
            const res = await postCaSi(data);
            setThongBao({
                type: res.success ? 'success' : 'error',
                message: res.message
            });
            reset();
        } catch (error) {
            setThongBao({type: 'error', message: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.'});
        }
    }
    useEffect(() => {
        getTheLoai();
    }, []);


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
            setValue('anh', file);
        }
    };


    const options = theLoai.map((tl) => ({
        value: tl.id,
        label: tl.ten_theloai,
    }));
    return (
        <div className="flex">
            <Sidebar/>
            <div className="flex-1 p-10">
                {thongBao && (
                    <div
                        className={`px-4 py-3 rounded relative border
                            ${thongBao.type === 'success'
                            ? 'bg-green-100 border-green-400 text-green-700'
                            : 'bg-red-100 border-red-400 text-red-700'
                        }`}
                        role="alert"
                    >
                        <span className="block sm:inline">{thongBao.message}</span>
                    </div>
                )}
                <h1 className="mb-4 font-bold text-2xl">Thêm Bài Hát</h1>
                <form encType="multipart/form-data" onSubmit={handleSubmit(themBaiHat)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="mb-5">
                                <label htmlFor="tentheloai" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tên bài hát
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    {...register("tenBaiHat", {required: "Vui lòng nhập tên Bài Hát"})}
                                />
                                {errors.tenBaiHat && (
                                    <span className="text-red-600 text-sm">{errors.tenBaiHat.message}</span>
                                )}
                            </div>
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kích hoạt</label>
                                <div className="flex items-center gap-4">
                                    <label className="inline-flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value="1"
                                            {...register("trangThai", {required: "Chọn trạng thái"})}
                                            className="text-blue-600"
                                        />
                                        <span>Có</span>
                                    </label>
                                    <label className="inline-flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value="0"
                                            {...register("trangThai", {required: "Chọn trạng thái"})}
                                            className="text-blue-600"
                                        />
                                        <span>Không</span>
                                    </label>
                                </div>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="theloai">Chọn thể loại:</label>
                                <Select
                                    options={options}
                                    onChange={(selectedOption) => {
                                        // @ts-ignore
                                        setValue('idTheLoai', selectedOption?.value); // Gán giá trị cho react-hook-form
                                    }}
                                    placeholder="Nhập tên thể loại..."
                                />
                                {errors.idTheLoai && (
                                    <span className="text-red-600 text-sm">{errors.idTheLoai.message}</span>
                                )}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="moTaCaSi" className="block text-sm font-medium text-gray-700 mb-1">
                                    Mô tả ca sĩ
                                </label>
                                <textarea
                                    id="moTaCaSi"

                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    {...register("moTa", {required: "Vui lòng nhập mô tả ca sĩ"})}
                                />
                                {errors.moTa && (
                                    <span className="text-red-600 text-sm">{errors.moTa.message}</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="mb-5">
                                <label htmlFor="anh" className="block text-sm font-medium text-gray-700 mb-1">
                                    Ảnh bìa
                                </label>
                                <input
                                    type="file"
                                    id="anh"
                                    name="anh"
                                    accept="image/*"
                                    onChange={handleImageChange} // Xử lý ảnh preview
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    // Không dùng register ở đây
                                />
                                {previewImage && (
                                    <div id="image_show" className="mt-2">
                                        <img src={previewImage} alt="Preview" className="h-40 object-cover rounded-md"/>
                                    </div>
                                )}
                            </div>

                            <div className="mb-5">
                                <label htmlFor="created_at" className="block text-sm font-medium text-gray-700 mb-1">
                                    Ngày tạo
                                </label>
                                <input
                                    type="datetime-local"
                                    id="created_at"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    {...register("ngayTao", {required: "Vui lòng chọn ngày tạo"})}
                                />
                                {errors.ngayTao && (
                                    <span className="text-red-600 text-sm">{errors.ngayTao.message}</span>
                                )}
                            </div>
                        </div>

                    </div>


                    <button
                        type="submit"
                        className="btn btn-primary btn-lg mt-5 bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Thêm thể loại
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BaiHat;
