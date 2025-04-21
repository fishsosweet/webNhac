<?php

namespace App\Http\Controllers\Admin\BaiHat;

use App\Http\Controllers\Controller;
use App\Http\Service\BaiHat\BaiHatService;
use Illuminate\Http\Request;

class BaiHatController extends Controller
{
    protected $baiHatService;
    public function __construct(BaiHatService $baiHatService){
        $this->baiHatService = $baiHatService;
    }
    public function getTheLoai()
    {
        $response=$this->baiHatService->theLoai();
        return $response;
    }
    public function getCaSi()
    {
        $response=$this->baiHatService->caSi();
        return $response;
    }

    public function postBaiHat(Request $request){
        $response = $this->baiHatService->post($request);
        return $response;
    }
}
