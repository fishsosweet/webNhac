<?php

namespace App\Http\Controllers\Admin\BaiHat;

use App\Http\Controllers\Controller;
use App\Http\Service\BaiHat\BaiHatService;

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
}
