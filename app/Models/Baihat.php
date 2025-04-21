<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Baihat extends Model
{
    use HasFactory;
    protected $table='baihat';
    protected $fillable = [
        'id',
        'title',
        'casi_id',
        'theloai_id',
        'audio_url',
        'anh',
        'thoiluong',
        'trangthai',
        'created_at',
        'updated_at'
    ];
public function casi()
{
    return $this->belongsTo(CaSi::class, 'casi_id');
}

public function theloai()
{
    return $this->belongsTo(TheLoai::class, 'theloai_id');
}
}
