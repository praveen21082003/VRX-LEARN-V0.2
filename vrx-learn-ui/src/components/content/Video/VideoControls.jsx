import React, { useState, useEffect } from 'react'
import { Icon, Button } from '@/components/ui'
import { logo } from '@/assets';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

function VideoControls({ videoRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [speedIcon, setSpeedIcon] = useState("mdi:speedometer-medium");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };


  useEffect(() => {
    if (speed === 1) {
      setSpeedIcon("mdi:speedometer-medium")
    }
    if (speed < 1) {
      setSpeedIcon("mdi:speedometer-slow")
    }
    if (speed > 1) {
      setSpeedIcon("mdi:speedometer")
    }
  }, [speed]);



  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    }
    else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }

  //Praveen Bro

  // const handleVolumeChange = (e) => {
  //   const newVolume = parseFloat(e.target.value);
  //   videoRef.current.volume = newVolume;
  //   setVolume(newVolume);

  //   if (newVolume === 0) {
  //     setIsMuted(true);
  //   } else {
  //     setIsMuted(false);
  //   }
  // };

  //Updated

 const updateVolume = (newVolume) => {
  const video = videoRef.current;
  if (!video) return;

  const clampedVolume = Math.min(1, Math.max(0, newVolume));

  video.volume = clampedVolume;
  setVolume(clampedVolume);
  setIsMuted(clampedVolume === 0);

  if (clampedVolume > 0) {
    video.muted = false;
  }
};

//Updated

const handleVolumeChange = (e) => {
const val = parseFloat(e.target.value);
updateVolume(val);
};

  const handleProgressBarChange = (e) => {
    const newTime = Number(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }

//Praveen Bro

  // const toggleMute = () => {
  //   const video = videoRef.current;
  //   video.muted = !video.muted;
  //   setIsMuted(video.muted);
  // }


  // Updated

  const toggleMute = () => {
  const targetVolume = isMuted ? (volume > 0 ? volume : 0.5) : 0;
  updateVolume(targetVolume);
};


  const toggleFullscreen = () => {
    const videoContainer = videoRef.current?.parentElement;
    if (!videoContainer) return;

    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

      useKeyboardShortcuts({
      'f': toggleFullscreen,
      ' ': togglePlay,
      'arrowright': () => { videoRef.current.currentTime += 10 },
      'arrowleft': () => { videoRef.current.currentTime -= 10 },
      'arrowup': () => updateVolume(volume + 0.1),
      'arrowdown': () => updateVolume(volume - 0.1),
      'm': toggleMute
  }, [volume, isPlaying, isFullscreen , isMuted]);


  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    const handleClickOutside = (e) => {
      if (!e.target.closest(".speed-dropdown")) {
        setIsOpen(false);
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    }

    const handleLoadMetadata = () => {
      setDuration(video.duration);
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleProgress = () => {
      const video = videoRef.current

      if (!video || video.buffered.length === 0) return;

      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      setBuffered(bufferedEnd);
    }


    const handleVisibilityChange = () => {
      if (document.hidden && !video.paused){
        video.pause();
        setIsPlaying(false);
      }
    }

    const handleWindowBlur = () => {
      if (!video.paused) {
        video.pause();
        setIsPlaying(false);
      }
    };

    video.addEventListener("play", onPlay)
    video.addEventListener("pause", onPause)
    video.addEventListener("loadedmetadata", handleLoadMetadata)
    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("progress", handleProgress)
    document.addEventListener("click", handleClickOutside)
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    window.addEventListener("visibilityChange", handleVisibilityChange);
    window.addEventListener("blur", handleVisibilityChange)


    return () => {
      video.removeEventListener("play", onPlay)
      video.removeEventListener("pause", onPause)
      video.removeEventListener("loadedmetadata", handleLoadMetadata)
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("progress", handleProgress)
      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      window.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("blur",handleWindowBlur)

    }
  }, [videoRef, isPlaying])




  return (
    <div className="absolute bottom-0 left-0 right-0 
                bg-linear-to-t
                text-white
                to-transparent 
                px-5 py-3 flex flex-col gap-3 items-center"
    >
      <input
        type="range"
        min="0"
        max={duration}
        step="0.01"
        value={currentTime}
        onChange={handleProgressBarChange}
        className="w-full h-1 hover:h-1.5 rounded appearance-none cursor-pointer accent-red-800"
        style={{
          background: `linear-gradient(to right, #840227 ${(currentTime / duration) * 100}%, #4b5563 ${(currentTime / duration) * 100}%)`
        }}
      />


      <div className='flex w-full justify-between'>


        <div className='flex  gap-4'>
          <div className='video-player w-10'>
            <Button
              frontIconHeight="18"
              frontIconWidth="18"
              frontIconName={isPlaying ? "iconoir:pause-solid" : "iconoir:play-solid"}
              textClass="text-white"
              bgClass=""
              className="w-8 h-8 rounded-full hover:bg-white/13"
              onClick={() => togglePlay()}
            />
          </div>


          <div className="
            video-player
            group
            hover:p-1
            w-10
            hover:w-36
            transition-all
            duration-300
            ease-in-out
          ">
            <div className="
                flex items-center
                w-full
                h-full
                p-2
                rounded-full
                hover:bg-white/13
                transition-colors
                duration-200
              ">

              <Button frontIconName={isMuted ? 'mingcute:volume-off-fill' : 'mingcute:volume-fill'} frontIconHeight="20" frontIconWidth="20" bgClass="" onClick={() => toggleMute()} />

              <div className="
                flex-1
                ml-2
                mb-1
                opacity-0
                group-hover:opacity-100
                transition-opacity items-center
                duration-300
              ">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-21 h-1 appearance-none rounded cursor-pointer accent-white"
                  style={{
                    background: `linear-gradient(to right, white ${ (isMuted ? 0 : volume) * 100}%, #4b5563 ${ (isMuted ? 0 : volume) * 100}%)`
                  }}
                />
              </div>

            </div>
          </div>



          <div className='video-player text-xs w-25'>
            <div className='flex justify-center rounded-full items-center w-23 h-8 hover:bg-white/13'>
              <span>{formatTime(currentTime)}</span><Icon name="fad:digital-colon" height="18" width="18" /><span>{formatTime(duration)}</span>
            </div>
          </div>

        </div>

        <div className='video-player px-3 gap-1'>

          <img src={logo} className='bg-white h-7 ml-2 rounded-xs p-0.5' />

          <div className="video-playerp gap-2 px-2 h-8 hover:bg-white/13 rounded-full flex items-center">

            <Icon name={speedIcon} height="20" width="20" />

            <div className="relative speed-dropdown">

              <div
                onClick={() => setIsOpen(prev => !prev)}
                className="
                  flex justify-between items-end 
                  cursor-pointer 
                  py-1
                  rounded-md
                  transition
                  select-none
                "
              >
                <span className="text-white text-sm font-medium">
                  {speed}x
                </span>

                <Icon
                  name="ic:round-arrow-drop-up"
                  height="14"
                  width="14"
                  className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                    }`}
                />
              </div>

              {/* Dropdown */}
              {isOpen && (
                <div className="
                  absolute 
                  bottom-10 
                  left-0
                  bg-black/90 
                  backdrop-blur-md
                  rounded-md 
                  shadow-lg 
                  py-2 
                  w-24
                  text-sm
                ">
                  {[0.5, 0.75, 1, 1.5, 2].map((s) => (
                    <div
                      key={s}
                      onClick={() => {
                        setSpeed(s);
                        videoRef.current.playbackRate = s;
                        setIsOpen(false);
                      }}
                      className={`
                        px-3 py-1 cursor-pointer
                        hover:bg-white/10
                        ${speed === s ? "text-primary font-semibold" : "text-white"}
                      `}
                    >
                      {s}x
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>


          <Button
            frontIconHeight="18"
            frontIconWidth="18"
            frontIconName={isFullscreen ? "mingcute:fullscreen-exit-fill" : "mingcute:fullscreen-fill"}
            textClass="text-white"
            bgClass=""
            onClick={() => toggleFullscreen()}
            className="p-2 rounded-full hover:bg-white/13"
          />
        </div>
      </div>
    </div>
  )
}

export default VideoControls
