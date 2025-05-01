<?php

namespace App\Http\Controllers\User\TrangChu;

use App\Http\Controllers\Controller;
use App\Http\Service\TrangChu\TrangChuService;
use App\Models\Baihat;
use Illuminate\Http\Request;
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
    public function getPlaylist(){
        $response=$this->trangChuService->getPlaylist();
        return $response;
    }
    public function getNextSongs(Request $request)
    {
        $exclude = $request->input('exclude', []);

        $songs = Baihat::whereNotIn('id', $exclude)
            ->inRandomOrder()
            ->limit(5)
            ->with('casi')
            ->get();

        return response()->json($songs);
    }
}
