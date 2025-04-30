<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\Admin\Login\apiLoginAdmin;
use \App\Http\Controllers\Admin\TheLoai\TheLoaiController;
use \App\Http\Controllers\Admin\CaSi\CaSiController;
use \App\Http\Controllers\Admin\BaiHat\BaiHatController;
use \App\Http\Controllers\User\TrangChu\TrangChuController;
use \App\Http\Controllers\Admin\Playlist\PlaylistController;
/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');*/


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'], function () {
    Route::post('login', [apiLoginAdmin::class, 'getapiLoginAdmin']);
    //TheLoai
    Route::post('postTheLoai', [TheLoaiController::class, 'postTheLoai']);
    Route::get('getListTheLoai', [TheLoaiController::class, 'getList']);
    Route::post('postSuaTheLoai/{id}', [TheLoaiController::class, 'postCapNhatTheLoai']);
    Route::get('thongTinTheLoai/{id}', [TheLoaiController::class, 'getTheloai']);
    Route::delete('deleteTheLoai/{id}', [TheLoaiController::class, 'delete']);
    //CaSi
    Route::post('postCaSi', [CaSiController::class,'postCaSi']);
    Route::get('getListCaSi', [CaSiController::class, 'getList']);
    Route::post('postSuaCaSi/{id}', [CaSiController::class, 'postCapNhatCaSi']);
    Route::get('thongTinCaSi/{id}', [CaSiController::class, 'getCaSi']);
    Route::delete('deleteCaSi/{id}', [CaSiController::class, 'delete']);
    //BaiHat
    Route::get('dsTheLoai', [BaiHatController::class, 'getTheLoai']);
    Route::get('dsCaSi', [BaiHatController::class, 'getCaSi']);
    Route::get('thongTinBaiHat/{id}', [BaiHatController::class, 'getBaiHat']);
    Route::post('postBaiHat', [BaiHatController::class, 'postBaiHat']);
    Route::get('getListBaiHat', [BaiHatController::class, 'getList']);
    Route::post('postSuaBaiHat/{id}', [BaiHatController::class, 'postCapNhatBaiHat']);
    Route::delete('deleteBaiHat/{id}', [BaiHatController::class, 'delete']);
    Route::get('choosePlaylists', [BaiHatController::class, 'getPlaylist']);
    Route::post('addBaiHatList', [BaiHatController::class, 'addBaiHatList']);

    //Playlist
    Route::post('postPlaylist', [PlaylistController::class,'postPlaylist']);
    Route::get('getListPlaylist', [PlaylistController::class, 'getList']);
});

Route::prefix('user')->group(function () {
    //TrangChu
    Route::get('getRandomSongs', [TrangChuController::class, 'getRandomSongs']);
    Route::post('nextSongs', [TrangChuController::class, 'getNextSongs']);
});
