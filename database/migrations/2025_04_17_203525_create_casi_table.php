<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('casi', function (Blueprint $table) {
            $table->id();
            $table->string('ten_casi', 100);
            $table->string('gioitinh', 10);// Tên ca sĩ
            $table->text('mota')->nullable(); // Mô tả tiểu sử
            $table->string('anh')->nullable(); // Ảnh đại diện ca sĩ (URL hoặc tên file)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('casi');
    }
};
