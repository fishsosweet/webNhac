import axiosInstance from "../../../configs/axios.tsx";

const getDSBaiRandom =async ()=>{
    try{
        const res=await axiosInstance.get('/user/getRandomSongs');
        return res.data
    }catch (error: any){
        return {error: "Load thất bại!"};
    }
}
const getDSPhat = async (excludeIds: number[] = []) => {
    return axiosInstance.post("/user/nextSongs", { exclude: excludeIds });
};
export {getDSBaiRandom,getDSPhat}
