"use client";


import { 
    useRef,
    useMemo,
    useState,
    useCallback,
    useEffect,
} from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay,FaPause } from "react-icons/fa";
import { RiForward10Fill, RiReplay10Fill  } from "react-icons/ri";
import { 
    IoVolumeMute,
    IoVolumeHighOutline,
    IoVolumeLowOutline,
} from "react-icons/io5";
import { Slider } from "@/components/ui/slider";
import { Maximize } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa6";
import { TbPlayerSkipForward } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { useControls } from "@/hooks/use-controls";


interface PlayerProps {
    url : string;
    poster : string; 
    title?: string;
}

const secToValue = ( len: number ) =>{
    const min = Math.floor(len/60);
    const sec = Math.floor(len%60);
    return `${min}:${sec<10 ? "0" : ""}${sec}`;
}

export const Player = ({
    url,
    poster,
    title
} : PlayerProps) => {

    const router = useRouter();
    const parentNode = useRef<HTMLDivElement|null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [ isPlaying, setIsPlaying ] = useState(true);
    const [ hover, setHover ] = useState(false);
    const [buffering, setBuffering] = useState(false);
    const { mute, setMute, setVolume, volume } = useControls();

    const Icon = isPlaying ?  FaPause :  FaPlay;

    const VolumeIcon = useMemo(()=>{
        if ( volume === 0 || mute ) {
            return IoVolumeMute;
        }
        if ( volume > .5 ){
            return IoVolumeHighOutline;
        }
        return IoVolumeLowOutline;
    }, [volume, mute]);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video){
            return;
        }
        if (video.paused) {
          video.play();
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
    };

    const handleBackward = () => {
        const video = videoRef.current;
        if (video){
            video.currentTime -= 10;
        }
    };

    const handleForward = () => {
        const video = videoRef.current;
        if (video){
            video.currentTime += 10;
        }
    };

    
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    
    const handleSeek = ( time:number )=>{
        if ( !videoRef.current ) {
            return;
        }
        videoRef.current.currentTime = time;
    }

    const toggleFullScreen = () => {
        if ( document.fullscreenElement ){
            document.exitFullscreen();
        } else {
            if ( parentNode.current ){
                parentNode.current.requestFullscreen();
            }
          }
    }
    
    useEffect(() => {
        const video = videoRef.current;
        if (!video){
            return;
        }
        const handleWaiting = () => setBuffering(true);
        const handlePlaying = () => setBuffering(false);
        const updateTime = () => setCurrentTime(Math.floor(video.currentTime));

        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('loadedmetadata', ()=>setDuration(video.duration));
        video.addEventListener("waiting", handleWaiting);
        video.addEventListener("playing", handlePlaying);
        
        return () => {
            video.removeEventListener('timeupdate', updateTime);
            video.removeEventListener('loadedmetadata', ()=>setDuration(video.duration));
            video.removeEventListener("waiting", handleWaiting);
            video.removeEventListener("playing", handlePlaying);
        };

    }, []);

    const debounce = (func: Function, wait: number) => {
        let timeout:Timer;
        return (...args: any) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => func(...args), wait);
        };
    };
    
    const handleHover = useCallback(debounce(() => setHover(false), 5000),[]);
    
    useEffect(() => {
        const handleMouseMove = () => {
            setHover(true);
            handleHover();
        };
    
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space" && e.target === document.body) {
                e.preventDefault();
                togglePlay();
                setHover(true);
                handleHover();
            }
        };
    
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("keydown", handleKeyDown);
    
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleHover]);
    

    useEffect(()=>{
        const video = videoRef.current;
        if (!video){
            return;
        }
        video.volume = volume;
    }, [volume]);


    const propogateBack = () => {
        if ( document.fullscreenElement ){
            document.exitFullscreen();
        }
        router.back();
    }

    const toggleMute = ()=>{
        setMute(!mute);
    }
   

    return (
        <div ref={parentNode} className="w-full h-full bg-black relative">
            <video
                disablePictureInPicture
                controlsList="nodownload noplaybackrate"
                autoPlay = {true}
                ref={videoRef}
                className="h-full w-full"
                poster={poster}
                onEnded={()=>{
                    setIsPlaying(false);
                }}
                onPause={()=>{
                    setIsPlaying(false);
                }}
                onPlay={()=>{
                    setIsPlaying(true);
                }}
                onClick={togglePlay}
                muted = { mute }
                src={url} 
            >
            </video>
            <div className={cn(
                "absolute top-0 left-0 right-0 w-full z-10 p-4 md:p-8 opacity-0 transition-opacity duration-300",
                hover && "opacity-100"
            )}>
                <FaArrowLeft className="h-7 w-7 md:h-9 md:w-9 text-white md:cursor-pointer" onClick={propogateBack} />
            </div>
            <div className={cn(
                "absolute bottom-0 left-0 right-0 w-full p-4 pb-8 md:p-8  bg-gradient-to-b from-transparent from-20% to-black opacity-0 transition-opacity duration-300",
                hover && "opacity-100"
            )}>
                <div className="flex items-center gap-4 md:gap-6">
                    <p className="text-white">{secToValue(currentTime)}</p>
                    <Slider
                        value={[currentTime]}
                        max={duration}
                        step={1}
                        onValueChange={(e)=>handleSeek(e[0])}
                        className="cursor-pointer h-5"
                    />
                   <p className="text-white">{secToValue(duration)}</p>
                </div>
                <div className={cn(
                        "grid grid-cols-2 md:grid-cols-2 w-full gap-10 items-center mt-8",
                        title && "md:grid-cols-3"
                    )}
                >
                    <div className="flex items-center gap-4 md:gap-7">
                        <Icon onClick={togglePlay} className="h-6 w-6 md:h-9 md:w-9 text-white md:cursor-pointer" />
                        <RiReplay10Fill onClick={handleBackward} className="h-7 w-7 md:h-11 md:w-11 text-white md:cursor-pointer" />
                        <RiForward10Fill onClick={handleForward} className="h-7 w-7 md:h-11 md:w-11 text-white md:cursor-pointer" />
                        <div className="flex items-center gap-x-4 group">
                            <VolumeIcon onClick={toggleMute}  className="h-7 w-7 md:h-11 md:w-11 text-white md:cursor-pointer" />
                            <Slider
                                value={[volume]}
                                max={1}
                                step={0.1}
                                onValueChange={(e)=>setVolume(e[0])}
                                className="cursor-pointer h-5 w-24 hidden group-hover:flex"
                            />
                        </div>
                    </div>
                    {
                        title && (
                            <div className="text-white text-xl font-semibold text-center hidden md:block">
                                {title}
                            </div>
                        )
                    }
                    <div className="flex items-center gap-4 md:gap-7 justify-end">
                        <TbPlayerSkipForward className="h-7 w-7 md:h-11 md:w-11 text-white md:cursor-pointer" />
                        <Maximize 
                            className="h-6 w-6 md:h-9 md:w-9 font-semibold text-white md:cursor-pointer"
                            onClick={toggleFullScreen}
                        />
                    </div>
                </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image
                    src="/loader.png"
                    height={80}
                    width={80}
                    alt="Loader"
                    className={cn(
                        "animate-spin hidden",
                        buffering && "block"
                    )}
                />
            </div>
        </div>
    )
}

