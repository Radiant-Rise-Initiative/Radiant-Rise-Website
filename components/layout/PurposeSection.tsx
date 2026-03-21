"use client";

import { useState, useRef, useEffect } from "react";
import { PurposeStatement } from "@/components/ui/PurposeStatement";
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function PurposeSection() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    
    // Custom Video Player State
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
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
            <PurposeStatement
                title="Radiant Rise"
                description="Dedicated to breaking cycles of poverty by equipping young mothers and youths with the vocational skills, spiritual foundation, and resilience needed to thrive."
                imageSrc="/assets/images/hero_images/Hero 06.jpg"
                imageAlt="Radiant Rise Purpose"
                actionText="Play Trailer"
                onActionClick={() => setIsVideoOpen(true)}
                infoPoints={[
                    "To provide holistic empowerment that addresses not just economic needs, but emotional and spiritual well-being for lasting transformation.",
                    "To build sustainable futures where every participant becomes a pillar of strength, driving self-reliance and prosperity within their community."
                ]}
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
                        {/* Global Close Button */}
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
                                isFullscreen ? "rounded-none h-full max-w-none border-none aspect-auto" : "aspect-video rounded-xl sm:rounded-2xl"
                            )}
                            onClick={(e) => {
                                e.stopPropagation();
                                togglePlay(); 
                            }}
                        >
                            <video 
                                ref={videoRef}
                                src="/assets/images/video_stories/Radiant%20Rise%20Story.mp4" 
                                autoPlay 
                                playsInline
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                className="w-full h-full object-contain cursor-pointer"
                            />
                            
                            {/* Controls Overlay */}
                            <div 
                                className={cn(
                                    "absolute bottom-0 left-0 right-0 px-6 pb-6 pt-24 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300 flex flex-col gap-4",
                                    showControls ? "opacity-100" : "opacity-0"
                                )}
                                onClick={e => e.stopPropagation()} 
                            >
                                {/* Progress Bar */}
                                <div className="w-full relative h-1.5 bg-white/20 rounded-full cursor-pointer overflow-hidden group/track">
                                    <div 
                                        className="absolute top-0 left-0 h-full bg-[#CD5929]"
                                        style={{ width: `${progress}%` }}
                                    />
                                    <input 
                                        type="range"
                                        min="0" max="100" step="0.1"
                                        value={progress}
                                        onChange={handleSeek}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                                
                                {/* Controls */}
                                <div className="flex items-center justify-between text-white">
                                    <div className="flex items-center gap-6">
                                        <button onClick={togglePlay} className="hover:text-[#CD5929] transition-colors focus:outline-none">
                                            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                                        </button>
                                        
                                        <div className="flex items-center gap-3 group/volume">
                                            <button onClick={toggleMute} className="hover:text-[#CD5929] transition-colors focus:outline-none">
                                                {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
                                            </button>
                                            <div className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-300 ease-out flex items-center">
                                                <input 
                                                    type="range" 
                                                    min="0" max="1" step="0.05" 
                                                    value={isMuted ? 0 : volume} 
                                                    onChange={handleVolumeChange}
                                                    className="w-full accent-[#CD5929] h-1"
                                                />
                                            </div>
                                        </div>
                                        
                                        <span className="text-sm font-medium font-mono tracking-wider opacity-80 mt-0.5">
                                            {currentTime} / {duration}
                                        </span>
                                    </div>
                                    
                                    <button onClick={toggleFullscreen} className="hover:text-[#CD5929] transition-colors focus:outline-none">
                                        {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
