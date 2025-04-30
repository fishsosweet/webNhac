<?php

namespace App\Http\Service\TrangChu;

use App\Http\Controllers\Controller;
use App\Models\Baihat;

class TrangChuService extends Controller
{
    public function getRandomBaiHat(){
        try{
            $baiHatRandom = Baihat::inRandomOrder()->where('trangthai',1)->with(['casi:id,ten_casi', 'theloai:id,ten_theloai'])->limit(8)->get();
            return response()->json($baiHatRandom, 200);
        }
       catch (\Exception $exception){
            return response()->json([
                'error' => $exception->getMessage(),
            ],500);
       }

    }
}
