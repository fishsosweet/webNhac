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
        Schema::create('baihat', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100);

            $table->unsignedBigInteger('casi_id');
            $table->unsignedBigInteger('theloai_id');

            $table->string('audio_url', 255);
            $table->string('anh', 255)->nullable();
            $table->time('thoiluong')->nullable();
            $table->boolean('trangthai')->default(true);
            $table->timestamps(); // Tạo created_at & updated_at

            // Khóa ngoại
            $table->foreign('casi_id')->references('id')->on('casi')->onDelete('cascade');
            $table->foreign('theloai_id')->references('id')->on('theloai')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('baihat');
    }
};
