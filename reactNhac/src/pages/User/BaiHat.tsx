// MusicPlayer.tsx
import { useEffect, useRef, useState, useMemo } from "react";
import {
    FaHeart, FaStepBackward, FaPlay, FaPause,
    FaStepForward, FaVolumeUp
} from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import {
    MdOutlineOndemandVideo, MdOutlineLyrics,
    MdOutlineFullscreen
} from "react-icons/md";
import { loadYouTubeAPI } from "../../services/Admin/APIAudioSong.tsx";
import { getDSPhat, tangLuotXem } from "../../services/User/TrangChuService.tsx";

interface Song {
    id: number;
    title: string;
    anh: string;
    casi: { ten_casi: string };
    audio_url: string;
    lyrics: string;
}

interface MusicPlayerProps {
    song: Song;
    playlist?: Song[];
}

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: typeof YT;
    }
}

export default function MusicPlayer({ song, playlist: playlistProp }: MusicPlayerProps) {
    const MAX_HISTORY = 100;
    const [volume, setVolume] = useState(1);
    const [queue, setQueue] = useState<Song[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isLyrics, setLyrics] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const playerRef = useRef<YT.Player | null>(null);
    const playerContainerRef = useRef<HTMLDivElement | null>(null);

    const currentSong = queue[currentIndex];
    useEffect(() => {
        if (!song) return;

        if (playlistProp && playlistProp.length > 0) {
            const filtered = playlistProp.filter((s, i, arr) =>
                arr.findIndex(x => x.id === s.id) === i // Lọc trùng trong chính playlist
            );

            const isDifferent = filtered.some((s, i) => s.id !== queue[i]?.id);
            if (isDifferent || queue.length !== filtered.length) {
                setQueue(filtered.slice(0, MAX_HISTORY));
                const index = filtered.findIndex(s => s.id === song.id);
                setCurrentIndex(index !== -1 ? index : 0);
                return; // không cần xử lý tiếp
            }
        }

        // Nếu không phải playlist → người dùng chọn bài lẻ
        if (song.id !== currentSong?.id) {
            insertSongToQueue(song);
        }
    }, [song, playlistProp]);





    const insertSongToQueue = (newSong: Song) => {
        setQueue(prev => {
            // Loại bỏ bản sao nếu bài đã có
            const withoutNewSong = prev.filter(s => s.id !== newSong.id);

            // Tính toán vị trí để chèn bài mới vào
            const insertPos = currentIndex + 1;
            const newQueue = [
                ...withoutNewSong.slice(0, insertPos),
                newSong,
                ...withoutNewSong.slice(insertPos)
            ].slice(-MAX_HISTORY); // Giới hạn tối đa 100 bài

            // Cập nhật index để phát ngay bài mới
            const newIndex = newQueue.findIndex(s => s.id === newSong.id);
            setCurrentIndex(newIndex);

            return newQueue;
        });
    };





    useEffect(() => {
        if (currentSong) {
            tangLuotXem(currentSong.id);
        }
    }, [currentSong?.id]);

    const extractVideoId = (url: string): string | null => {
        const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        return match ? match[1] : null;
    };

    const videoId = useMemo(() => extractVideoId(currentSong?.audio_url || ""), [currentSong]);

    useEffect(() => {
        const initPlayer = async () => {
            const videoId = extractVideoId(currentSong?.audio_url || "");
            if (!videoId) return;

            await loadYouTubeAPI();
            if (!playerContainerRef.current) return;

            if (playerRef.current) playerRef.current.destroy();

            playerRef.current = new window.YT.Player(playerContainerRef.current, {
                height: '0', width: '0', videoId,
                playerVars: { controls: 0, autoplay: 0, modestbranding: 1, disablekb: 1 },
                events: {
                    onReady: (event) => {
                        const player = event.target;
                        playerRef.current = player;
                        setTimeout(() => {
                            if (player && typeof player.setVolume === 'function') {
                                setDuration(player.getDuration());
                                setIsReady(true);
                                player.setVolume(volume * 100);
                                player.playVideo();
                                setIsPlaying(true);
                            }
                        }, 500);
                    },
                    onStateChange: (event) => {
                        if (event.data === window.YT.PlayerState.ENDED) {
                            handleSongEnd();
                        }
                    }
                }
            });
        };

        if (currentSong) {
            setIsReady(false);
            initPlayer();
        }

        return () => {
            playerRef.current?.destroy();
        };
    }, [currentSong?.audio_url]); // Lưu ý: dùng audio_url trực tiếp để trigger update


    useEffect(() => {
        if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
            playerRef.current.setVolume(volume * 100);
        }
    }, [volume]);
    const handleSongEnd = async () => {
        if (currentIndex < queue.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            try {
                const excludeIds = queue.map(s => s.id);
                const res = await getDSPhat(excludeIds);
                if (Array.isArray(res.data) && res.data.length > 0) {
                    const nextSong = res.data[0];
                    setQueue(prev => [...prev, nextSong].slice(-MAX_HISTORY));
                    setCurrentIndex(prev => prev + 1);
                }
            } catch (err) {
                console.error("Lỗi tải bài mới:", err);
            }
        }
    };

    const togglePlay = () => {
        if (!playerRef.current || !isReady) return;
        if (isPlaying) playerRef.current.pauseVideo();
        else playerRef.current.playVideo();
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        if (currentIndex < queue.length - 1) setCurrentIndex(prev => prev + 1);
        else handleSongEnd();
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1); // Quay lại bài hát trước đó trong mảng
        } else {
            // Nếu đã ở bài đầu tiên, có thể bạn muốn dừng lại hoặc giữ nguyên.
            setCurrentIndex(0);
            if (playerRef.current) {
                playerRef.current.seekTo(0, true); // Quay lại đầu bài
                playerRef.current.playVideo();
            }
        }
    };




    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef.current?.getCurrentTime) setCurrentTime(playerRef.current.getCurrentTime());
        }, 500);
        return () => clearInterval(interval);
    }, [isReady]);

    const formatTime = (time: number): string => {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    const showLyrics = () => setLyrics(true);

    if (!currentSong) return null;

    return (
        <div className="bg-[#120f19] p-4 flex items-center justify-between rounded-2xl shadow-lg relative">
            <div ref={playerContainerRef} style={{ display: 'none' }} />
            <div className="flex items-center gap-4 w-[300px]">
                <img src={`http://127.0.0.1:8000/${currentSong.anh}`} className="w-16 h-16 rounded-md object-cover" />
                <div>
                    <h3 className="text-white font-semibold truncate max-w-[150px]">{currentSong.title}</h3>
                    <p className="text-sm text-gray-400 truncate max-w-[150px]">{currentSong.casi?.ten_casi}</p>
                </div>
                <button className="text-white text-xl ml-2"><FaHeart /></button>
                <button className="text-white text-xl"><FiMoreHorizontal /></button>
            </div>

            <div className="flex flex-col items-center flex-1 px-10">
                <div className="flex items-center gap-5 mb-2">
                    <button className="text-white cursor-pointer" onClick={handleBack}><FaStepBackward /></button>
                    <button
                        onClick={togglePlay}
                        disabled={!isReady}
                        className={`w-10 h-10 flex items-center justify-center rounded-full border-2 cursor-pointer ${isReady ? "border-purple-500 text-purple-500" : "border-gray-500 text-gray-500"}`}
                    >
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button className="text-white cursor-pointer" onClick={handleNext}><FaStepForward /></button>
                </div>
                <div className="flex items-center w-[520px] gap-3">
                    <span className="text-sm text-gray-400">{formatTime(currentTime)}</span>
                    <div
                        className="flex-1 h-1 bg-gray-700 rounded relative cursor-pointer overflow-hidden"
                        onClick={(e) => {
                            if (!isReady || !playerRef.current) return;
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const newTime = (clickX / rect.width) * duration;
                            playerRef.current.seekTo(newTime, true);
                        }}
                    >
                        <div
                            className="h-full bg-white rounded transition-all duration-300"
                            style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                        />
                    </div>
                    <span className="text-sm text-gray-400">{formatTime(duration)}</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="text-white"><MdOutlineOndemandVideo size={20} /></button>
                <button className="text-white cursor-pointer" onClick={showLyrics}><MdOutlineLyrics size={20} /></button>
                {isLyrics && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-[#1e1b29] text-white rounded-lg p-6 w-[90%] max-w-lg max-h-[80vh] overflow-y-auto shadow-lg relative">
                            <button className="absolute top-2 right-2 text-gray-300 hover:text-white text-xl cursor-pointer" onClick={() => setLyrics(false)}>✕</button>
                            <h2 className="text-xl font-semibold mb-4 text-center">Lời bài hát</h2>
                            <div className="whitespace-pre-line leading-relaxed text-sm">{currentSong.lyrics || "Chưa có lời bài hát"}</div>
                        </div>
                    </div>
                )}
                <button className="text-white"><MdOutlineFullscreen size={20} /></button>
                <div className="flex items-center gap-2">
                    <FaVolumeUp className="text-white" />
                    <input
                        type="range" min="0" max="1" step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-24 h-1 accent-white"
                    />
                    <span className="text-white text-sm w-[32px]">{Math.round(volume * 100)}%</span>
                </div>
            </div>
        </div>
    );
}
