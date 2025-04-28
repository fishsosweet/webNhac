import axiosInstance from "../../../configs/axios.tsx";

const getDSBaiRandom =async ()=>{
    try{
        const res=await axiosInstance.get('/user/getRandomSongs');
        return res.data
    }catch (error: any){
        return {error: "Load thất bại!"};
    }
}

export {getDSBaiRandom}
