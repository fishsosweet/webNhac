<?php

namespace App\Http\Service\Playlist;

use App\Http\Controllers\Controller;
use App\Models\Casi;
use App\Models\Playlist;

class PlaylistService extends Controller
{
    public function post($request)
    {
        $request->validate([
            'anh' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);
        try {
            $pathanh = '';
            if ($request->hasFile('anh') && $request->file('anh')->isValid()) {
                $nameimage = $request->file('anh')->getClientOriginalName();
                $path = 'uploads/' . date("Y/m/d");
                if (!file_exists(public_path($path))) {
                    mkdir(public_path($path), 0777, true);
                }
                $request->file('anh')->move(public_path($path), $nameimage);
                $pathanh = $path . '/' . $nameimage;

            }

            Playlist::create([
                'ten_playlist' => $request->tenPlaylist,
                'user_id' => auth('api')->id(),
                'trangthai' => $request->trangThai,
                'anh' => $pathanh,
                'created_at' => $request->ngayTao,
            ]);
            return response()->json([
                'success' => 'Thêm playlist thành công'
            ], 201);
        } catch (\Exception $exception) {
            return response()->json([
                'error' => 'Thêm playlist thất bại',
                'message' => $exception->getMessage(),
            ], 500);
        }
    }
    public function update($request, $id)
    {
        $request->validate([
            'anh' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);
        try {

            $casi = Casi::find($id);
            if (!$casi) {

                return response()->json(['error' => 'Ca sĩ không tồn tại'], 404);
            }
            $pathanh='';
            if($request->hasFile('anh') && $request->file('anh')->isValid()){
                $nameimage = $request->file('anh')->getClientOriginalName();
                $path = 'uploads/' . date("Y/m/d");
                if (!file_exists(public_path($path))) {
                    mkdir(public_path($path), 0777, true); // Tạo thư mục nếu chưa có
                }
                $request->file('anh')->move(public_path($path), $nameimage);
                $pathanh = $path . '/' . $nameimage;

            }

            $casi->ten_casi= $request->tenCaSi;
            $casi->gioitinh = $request->gioiTinh;
            $casi->mota = $request->moTa;
            $casi->anh =$pathanh;
            $casi->updated_at = $request->ngayCapNhat;
            $casi->save();
            return response()->json(['success' => 'Cập nhật ca sĩ thành công'], 200);
        } catch (\Exception $exception) {
            return response()->json([
                'error' => 'Cập nhật ca sĩ thất bại',
                'message' => $exception->getMessage(),
            ], 500);
        }
    }


    public function list()
    {
        $playlist = Playlist::with('user:id,name')
            ->select('id', 'ten_playlist', 'trangthai', 'anh', 'user_id', 'updated_at') // thêm user_id
            ->paginate(10);

        if ($playlist->count() > 0)
            return response()->json($playlist, 200);
        return response()->json(['error' => 'Không có dữ liệu'], 404);
    }

    public function destroy($id)
    {
        $casi = Casi::find($id);
        if (!$casi) {
            return response()->json(['erorr' => 'Không tìm thấy ca sĩ'], 404);
        }

        $casi->delete();
        return response()->json(['success' => 'Xóa thành công']);
    }

    public function getID($id)
    {
        try {
            $casi = Casi::find($id);
            return response()->json($casi);
        }catch (\Exception $exception) {
            return response()->json([
                'error' =>"ID không tồn tại",
                'message' => $exception->getMessage(),
            ], 500);
        }
    }
}
