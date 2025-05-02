import axiosInstance from "../../../configs/axios.tsx";

const getDSBaiRandom =async ()=>{
    try{
        const res=await axiosInstance.get('/user/getRandomSongs');
        return res.data
    }catch (error: any){
        return {error: "Load thất bại!"};
    }
}
const getDSPlaylist =async ()=>{
    try{
        const res=await axiosInstance.get('/user/getPlaylist');
        return res.data
    }catch (error: any){
        return {error: "Load thất bại!"};
    }
}
const getDSPhat = async (excludeIds: number[] = []) => {
    return axiosInstance.post("/user/nextSongs", { exclude: excludeIds });
};

const getSongsInPlaylist = async (id: number) => {
    return axiosInstance.get(`/user/getSonginPlaylist/${id}`);
};
const getDSMoiPhatHanh = async () => {
    return axiosInstance.get(`/user/getNewSongs`);
};

export {getDSBaiRandom,getDSPhat,getDSPlaylist,getSongsInPlaylist,getDSMoiPhatHanh}
