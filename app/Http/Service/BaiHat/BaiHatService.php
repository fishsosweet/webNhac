<?php

namespace App\Http\Service\BaiHat;

use App\Http\Controllers\Controller;
use App\Models\Baihat;
use App\Models\Casi;
use App\Models\TheLoai;

class BaiHatService extends Controller
{
    public function theLoai()
    {
        $theLoai=TheLoai::select('id','ten_theloai')->get();
        return response()->json($theLoai);
    }
    public function caSi()
    {
        $caSi=Casi::select('id','ten_casi')->get();
        return response()->json($caSi);
    }


    public function post($request)
    {
        $request->validate([
            'anh' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);
        try {
            $pathanh='';
            if($request->hasFile('anh') && $request->file('anh')->isValid()){
                $nameimage = $request->file('anh')->getClientOriginalName();
                $path = 'uploads/' . date("Y/m/d");
                if (!file_exists(public_path($path))) {
                    mkdir(public_path($path), 0777, true);
                }
                $request->file('anh')->move(public_path($path), $nameimage);
                $pathanh = $path . '/' . $nameimage;

            }
            Baihat::create([
                'title' => $request->tenBaiHat,
                'casi_id' => $request->idCaSi,
                'theloai_id' => $request->idTheLoai,
                'audio_url'=> $request->audio_URL,
                'thoiluong' => $request->thoiLuong,
                'trangthai'=>$request->trangThai,
                'anh'=> $pathanh,
                'created_at' => $request->ngayTao,
            ]);
            return response()->json([
                'success' => 'Thêm bài hát thành công'
            ], 201);
        } catch (\Exception $exception) {
            return response()->json([
                'error' => 'Thêm bài hát thất bại',
            ], 500);
        }
    }
}
