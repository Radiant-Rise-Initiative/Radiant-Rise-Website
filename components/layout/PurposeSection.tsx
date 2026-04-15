"use client";

import { useState, useRef, useEffect } from "react";
import { PurposeStatement } from "@/components/ui/PurposeStatement";
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PurposeSectionProps {
    title?: string;
    imageSrc?: string;
    description?: string;
    videoSrc?: string;
    infoPoints?: string[];
}

export function PurposeSection({ 
    title,
    imageSrc,
    description,
    videoSrc,
    infoPoints = []
}: PurposeSectionProps) {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    
    // Custom Video Player State
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);

    const formatTime = (timeInSeconds: number) => {
        if (isNaN(timeInSeconds)) return "0:00";
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const total = videoRef.current.duration;
            setCurrentTime(formatTime(current));
            if (total > 0) {
                setProgress((current / total) * 100);
            }
        }
    };

    const handleProgress = () => {
        if (videoRef.current && videoRef.current.buffered.length > 0) {
            const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
            const total = videoRef.current.duration;
            if (total > 0) {
                setBuffered((bufferedEnd / total) * 100);
            }
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(formatTime(videoRef.current.duration));
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const seekTo = parseFloat(e.target.value);
        if (videoRef.current) {
            const time = (seekTo / 100) * videoRef.current.duration;
            videoRef.current.currentTime = time;
            setProgress(seekTo);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            setVolume(newVolume);
            setIsMuted(newVolume === 0);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch((err) => console.log(err));
        } else {
            document.exitFullscreen().catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const resetTimeout = () => {
            setShowControls(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (isPlaying) setShowControls(false);
            }, 3000);
        };

        if (isVideoOpen) {
            window.addEventListener('mousemove', resetTimeout);
            resetTimeout();
        }

        return () => {
            window.removeEventListener('mousemove', resetTimeout);
            clearTimeout(timeout);
        };
    }, [isVideoOpen, isPlaying]);

    useEffect(() => {
        // Reset player state when modal opens
        if (isVideoOpen) {
            setIsPlaying(true);
            setProgress(0);
            setBuffered(0);
            setCurrentTime("0:00");
            setShowControls(true);
        } else {
            // Ensure video pauses when modal closes
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }
    }, [isVideoOpen]);

    return (
        <>
            {/* Force browser to aggressively preload the video in the background so it's ready instantly */}
            <link 
                rel="preload" 
                as="video" 
                href={videoSrc} 
                type="video/mp4" 
            />
            
            <PurposeStatement
                title={title || ""}
                description={description || ""}
                imageSrc={imageSrc || ""}
                imageAlt="Radiant Rise Purpose"
                actionText="Play Trailer"
                onActionClick={() => setIsVideoOpen(true)}
                infoPoints={infoPoints}
            />
            
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 lg:p-12 cursor-pointer"
                        onClick={() => setIsVideoOpen(false)}
                    >
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsVideoOpen(false);
                            }}
                            className={cn(
                                "absolute z-50 transition-all duration-500 bg-black/40 hover:bg-black/80 rounded-full p-3 backdrop-blur-xl border border-white/10 text-white",
                                isFullscreen ? "top-8 right-8" : "top-6 right-6 lg:top-12 lg:right-12",
                                showControls ? "opacity-100" : "opacity-0"
                            )}
                        >
                            <X size={24} />
                        </button>
                        
                        <motion.div 
                            ref={containerRef}
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className={cn(
                                "relative w-full max-w-6xl overflow-hidden bg-black group shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10",
                                isFullscreen ? "h-full max-w-none border-none aspect-auto" : "aspect-video"
                            )}
                            onClick={(e) => {
                                e.stopPropagation();
                                togglePlay(); 
                            }}
                        >
                            <video 
                                ref={videoRef}
                                src={videoSrc} 
                                autoPlay 
                                playsInline
                                onTimeUpdate={handleTimeUpdate}
                                onProgress={handleProgress}
                                onLoadedMetadata={handleLoadedMetadata}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                className="w-full h-full object-contain cursor-pointer"
                            />
                                                       {/* Controls Overlay */}
                            <div 
                                className={cn(
                                    "absolute bottom-0 left-0 right-0 px-8 pb-8 pt-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 flex items-center gap-5 text-white",
                                    showControls ? "opacity-100" : "opacity-0"
                                )}
                                onClick={e => e.stopPropagation()} 
                            >
                                {/* Play/Pause Toggle */}
                                <button 
                                    onClick={togglePlay} 
                                    className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors border border-white/10 drop-shadow-md"
                                >
                                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                                </button>

                                {/* Volume Toggle */}
                                <button 
                                    onClick={toggleMute} 
                                    className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors border border-white/10 drop-shadow-md"
                                >
                                    {isMuted || volume === 0 ? <VolumeX size={18} fill="currentColor" /> : <Volume2 size={18} fill="currentColor" opacity={0.9} />}
                                </button>
                                
                                {/* Progress Bar with Gaps */}
                                <div className="flex-1 relative h-6 overflow-visible cursor-pointer group flex items-center">
                                    {/* Played Track (Left) */}
                                    <div 
                                        className="absolute left-0 h-[3px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] pointer-events-none"
                                        style={{ width: `max(0px, calc(${progress}% - 5px))` }}
                                    />
                                    
                                    {/* Playhead Pill (Center) */}
                                    <div 
                                        className="absolute w-[3px] h-4 bg-white shadow-md pointer-events-none"
                                        style={{ left: `calc(${progress}% - 1.5px)` }}
                                    />

                                    {/* Unplayed Track (Right - Base) */}
                                    <div 
                                        className="absolute h-[3px] bg-white/10 shadow-sm pointer-events-none transition-none"
                                        style={{ 
                                            left: `min(100%, calc(${progress}% + 5px))`, 
                                            width: `max(0px, calc(100% - (${progress}% + 5px)))` 
                                        }}
                                    />

                                    {/* Buffered Track (Right - Load Fill) */}
                                    <div 
                                        className="absolute h-[3px] bg-white/30 shadow-sm pointer-events-none transition-all duration-300"
                                        style={{ 
                                            left: `min(100%, calc(${progress}% + 5px))`, 
                                            width: `max(0px, calc(${buffered}% - (${progress}% + 5px)))` 
                                        }}
                                    />
                                    
                                    <input 
                                        type="range"
                                        min="0" max="100" step="0.1"
                                        value={progress}
                                        onChange={handleSeek}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                </div>

                                {/* Timestamp */}
                                <span className="text-xs font-mono uppercase tracking-widest opacity-90 shrink-0 tabular-nums drop-shadow-md pt-0.5">
                                    {currentTime} / {duration}
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
