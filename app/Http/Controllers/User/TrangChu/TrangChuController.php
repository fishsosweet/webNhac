<?php

namespace App\Http\Controllers\User\TrangChu;

use App\Http\Controllers\Controller;
use App\Http\Service\TrangChu\TrangChuService;

class TrangChuController extends Controller
{
    protected $trangChuService;
    public function __construct(TrangChuService $trangChuService){
        $this->trangChuService = $trangChuService;
    }

    public function getRandomSongs(){
        $response=$this->trangChuService->getRandomBaiHat();
        return $response;
    }
}
