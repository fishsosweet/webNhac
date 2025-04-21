<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\Admin\Login\apiLoginAdmin;
use \App\Http\Controllers\Admin\TheLoai\TheLoaiController;
use \App\Http\Controllers\Admin\CaSi\CaSiController;
use \App\Http\Controllers\Admin\BaiHat\BaiHatController;
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
    Route::delete('deleteTheLoai/{id}', [TheLoaiController::class, 'delete']);
    //CaSi
    Route::post('postCaSi', [CaSiController::class,'postCaSi']);
    Route::get('getListCaSi', [CaSiController::class, 'getList']);
    Route::post('postSuaCaSi/{id}', [CaSiController::class, 'postCapNhatCaSi']);
    Route::delete('deleteCaSi/{id}', [CaSiController::class, 'delete']);
    //BaiHat
    Route::get('dsTheLoai', [BaiHatController::class, 'getTheLoai']);
    Route::get('dsCaSi', [BaiHatController::class, 'getCaSi']);
    Route::post('postBaiHat', [BaiHatController::class, 'postBaiHat']);
});
