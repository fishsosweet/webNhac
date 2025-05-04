<?php

namespace App\Http\Controllers\User\TrangChu;

use App\Http\Controllers\Controller;
use App\Http\Service\TrangChu\TrangChuService;
use App\Models\Baihat;
use App\Models\Playlist;
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
            ->limit(1)
            ->with('casi')
            ->get();

        return response()->json($songs);
    }
    public function getSonginPlaylist($id)
    {
        $playlist = Playlist::with('baihats.casi')->find($id);
        if ($playlist) {
            return response()->json($playlist->baihats);
        } else {
            return response()->json(['message' => 'Không tìm thấy Playlist'], 404);
        }
    }

    public function getNewSongs()
    {
        try {
            $songs = BaiHat::with('casi')
                ->orderBy('created_at', 'desc')
                ->limit(12)
                ->get();
            return response()->json($songs, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => 'Đã xảy ra lỗi khi lấy bài hát mới',
                'details' => $e->getMessage()
            ], 500);
        }
    }
    public function tangLuotXem($id)
    {
        $song = BaiHat::find($id);
        $song->increment('luotxem');
    }

    public function getTopBaiHat()
    {
        $topSongs = BaiHat::with('casi')
        ->orderByDesc('luotxem')
            ->take(3)
            ->get();

        return response()->json($topSongs);
    }
}
