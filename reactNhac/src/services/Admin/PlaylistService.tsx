import axiosInstance from "../../../configs/axios.tsx";

type post = {
    tenPlaylist: string,
    trangThai: boolean,
    anh: File,
    ngayTao?: Date,
    ngayCapNhat?: Date,
}
const postPlaylist = async (playList: post) => {
    try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('tenPlaylist', playList.tenPlaylist);
        formData.append('trangThai', playList.trangThai.toString());
        formData.append('anh', playList.anh);
        // @ts-ignore
        formData.append('ngayTao', playList.ngayTao);

        const response = await axiosInstance.post('/auth/postPlaylist', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            }
        });
        return {success: true, message: response.data.success};
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Đã có lỗi xảy ra";
        return {success: false, message: errorMessage};
    }
}

const getThongTinTheLoai = async (id: number) => {
    try {
        const res = await axiosInstance.get(`/auth/thongTinTheLoai/${id}`);
        return res.data
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Đã có lỗi xảy ra";
        return {success: false, message: errorMessage};
    }
}
const postSuaTheLoai = async (theLoai: post,id: number) => {
    try {
        const response = await axiosInstance.post(`/auth/postSuaTheLoai/${id}`, {
            tenTheLoai: theLoai.tenTheLoai,
            trangThai: theLoai.trangThai,
            ngayCapNhat: theLoai.ngayCapNhat
        })
        return {success: true, message: response.data.success};
    } catch (error: any) {
        throw error.response?.data?.error
    }
}

const getListPlaylist = async (page: number) => {
    try {
        const response = await axiosInstance.get(`/auth/getListPlaylist?page=${page}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.error || 'Đã xảy ra lỗi!';
    }
}
const deleteTheLoai = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/auth/deleteTheLoai/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
};

export {postPlaylist, getListPlaylist,postSuaTheLoai,deleteTheLoai,getThongTinTheLoai};
