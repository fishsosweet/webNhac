<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    use HasFactory;
    protected $table='playlists';
    protected $fillable = [
        'id',
        'ten_playlist',
        'user_id',
        'trangthai',
        'anh',
        'created_at',
        'updated_at'
    ];
    public function baihats()
    {
        return $this->belongsToMany(Baihat::class)->withTimestamps();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
