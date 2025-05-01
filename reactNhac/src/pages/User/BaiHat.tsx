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
import { getDSPhat } from "../../services/User/TrangChuService.tsx";

interface Song {
    id: number;
    title: string;
    anh: string;
    casi: {
        ten_casi: string;
    };
    audio_url: string;
    lyrics:string;
}

interface MusicPlayerProps {
    song: Song;
}

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: typeof YT;
    }
}

export default function MusicPlayer({ song }: MusicPlayerProps) {
    const [volume, setVolume] = useState(0.5);
    const playerRef = useRef<YT.Player | null>(null);
    const playerContainerRef = useRef<HTMLDivElement | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const [isLyrics, setLyrics] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentSong, setCurrentSong] = useState<Song>(song);
    const [playlist, setPlaylist] = useState<Song[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const showLyrics= async ()=>{
        setLyrics(true);
    }

    const extractVideoId = (url: string): string | null => {
        const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        return match ? match[1] : null;
    };

    const videoId = useMemo(() => extractVideoId(currentSong.audio_url), [currentSong.audio_url]);

    const fetchNextSongs = async (excludeIds: number[] = []) => {
        try {
            const response = await getDSPhat(excludeIds);
            if (Array.isArray(response.data)) {
                setPlaylist(response.data);
                setCurrentIndex(0);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách nhạc:", error);
        }
    };
    useEffect(() => {
        if (!song) return;

        setCurrentSong({ ...song });
        setPlaylist((prev) => {
            const remaining = prev.filter(s => s.id !== song.id);
            return [song, ...remaining];
        });
        setCurrentIndex(0);
    }, [song]);




    useEffect(() => {
        if (playlist.length > 0) {
            setCurrentIndex(0);
            setCurrentSong(playlist[0]);
        }
    }, [playlist]);

    useEffect(() => {
        const initPlayer = async () => {
            await loadYouTubeAPI();

            if (!playerContainerRef.current || !videoId) return;

            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }

            playerRef.current = new window.YT.Player(playerContainerRef.current, {
                height: '0',
                width: '0',
                videoId,
                playerVars: {
                    controls: 0,
                    autoplay: 0,
                    modestbranding: 1,
                    disablekb: 1,
                },
                events: {
                    onReady: (event) => {
                        const player = event.target;

                        setTimeout(() => {
                            setDuration(player.getDuration());
                            setIsReady(true);
                            player.playVideo();
                            player.setVolume(volume * 100);
                            setIsPlaying(true);
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

        setIsReady(false);
        initPlayer();

        return () => {
            playerRef.current?.destroy();
            playerRef.current = null;
        };
    }, [videoId]);

    const handleSongEnd = () => {
        const playedIds = [currentSong.id, ...playlist.map(s => s.id)];

        if (playlist.length > 0 && currentIndex < playlist.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setCurrentSong(playlist[nextIndex]);
        } else {
            fetchNextSongs(playedIds);
        }
    };


    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef.current?.getCurrentTime) {
                setCurrentTime(playerRef.current.getCurrentTime());
            }
        }, 500);
        return () => clearInterval(interval);
    }, [isReady]);

    const togglePlay = () => {
        if (!playerRef.current || !isReady) return;

        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
        setIsPlaying(!isPlaying);
    };

    const formatTime = (time: number): string => {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };


    const handlePrevSong = () => {
        if (!playerRef.current) return;

        if (playlist.length > 0 && currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setCurrentIndex(prevIndex);
            setCurrentSong(playlist[prevIndex]);
        } else {
            playerRef.current.seekTo(0, true);
            playerRef.current.playVideo();
        }
    };


    const handleNextSong = () => {
        if (playlist.length > 0 && currentIndex < playlist.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setCurrentSong(playlist[nextIndex]);
        } else {
            const playedIds = [currentSong.id, ...playlist.map(s => s.id)];
            fetchNextSongs(playedIds);
        }
    };


    return (
        <div className="bg-[#120f19] p-4 flex items-center justify-between rounded-2xl shadow-lg relative">
            <div ref={playerContainerRef} style={{ display: 'none' }} />

            <div className="flex items-center gap-4 w-[300px]">
                <img
                    src={`http://127.0.0.1:8000/${currentSong.anh}`}
                    alt="Album Cover"
                    className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                    <h3 className="text-white font-semibold truncate max-w-[150px]">{currentSong.title}</h3>
                    <p className="text-sm text-gray-400 truncate max-w-[150px]">{currentSong.casi?.ten_casi}</p>
                </div>
                <button className="text-white text-xl ml-2"><FaHeart /></button>
                <button className="text-white text-xl"><FiMoreHorizontal /></button>
            </div>

            <div className="flex flex-col items-center flex-1 px-10">
                <div className="flex items-center gap-5 mb-2">

                    <button className="text-white" onClick={handlePrevSong}><FaStepBackward/></button>
                    <button
                        onClick={togglePlay}
                        disabled={!isReady}
                        className={`w-10 h-10 flex items-center justify-center rounded-full border-2 cursor-pointer ${isReady ? "border-purple-500 text-purple-500" : "border-gray-500 text-gray-500"}`}
                    >
                        {isPlaying ? <FaPause/> : <FaPlay/>}
                    </button>
                    <button className="text-white" onClick={handleNextSong}><FaStepForward/></button>
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
                            style={{width: duration ? `${(currentTime / duration) * 100}%` : '0%'}}
                        />
                    </div>
                    <span className="text-sm text-gray-400">{formatTime(duration)}</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="text-white"><MdOutlineOndemandVideo size={20}/></button>
                <button className="text-white"><MdOutlineLyrics size={20} onClick={()=>showLyrics()}
                />
                    {isLyrics && (
                        <div
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                            <div
                                className="bg-[#1e1b29] text-white rounded-lg p-6 w-[90%] max-w-lg max-h-[80vh] overflow-y-auto shadow-lg relative">
                                <button
                                    className="absolute top-2 right-2 text-gray-300 hover:text-white text-xl"
                                    onClick={() => setLyrics(false)}
                                >
                                    ✕
                                </button>
                                <h2 className="text-xl font-semibold mb-4 text-center">Lời bài hát</h2>
                                <div className="whitespace-pre-line leading-relaxed text-sm">
                                    {currentSong.lyrics || "Chưa có lời bài hát"}
                                </div>
                            </div>
                        </div>
                    )}
                </button>
                <button className="text-white"><MdOutlineFullscreen size={20}/></button>
                <div className="flex items-center gap-2">
                    <FaVolumeUp className="text-white"/>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => {
                            const vol = parseFloat(e.target.value);
                            setVolume(vol);
                            playerRef.current?.setVolume(vol * 100);
                        }}
                        className="w-24 h-1 accent-white"
                    />
                    <span className="text-white text-sm w-[32px]">{Math.round(volume * 100)}%</span>
                </div>

            </div>
        </div>
    );
}
