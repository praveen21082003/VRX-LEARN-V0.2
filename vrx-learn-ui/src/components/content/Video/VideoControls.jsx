import React, { useState, useEffect } from 'react'
import { Icon, Button } from '@/components/ui'
import { logo } from '@/assets';

function VideoControls({ videoRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(2.9);


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

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);

    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };


  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    video.addEventListener("play", onPlay)
    video.addEventListener("pause", onPause)

    return () => {
      video.removeEventListener("play", onPlay)
      video.removeEventListener("pause", onPause)
    }
  }, [])



  return (
    <div className="absolute bottom-0 left-0 right-0 
                bg-linear-to-t
                text-white
                from-primary/80 
                via-black/50 
                to-transparent 
                px-5 py-3 flex flex-col gap-3 items-center"
    >
      <div className="h-1 w-full bg-gray-600 rounded-full">
        <div className="h-1 w-1/2 bg-white rounded-full" />
      </div>


      <div className='flex w-full justify-between'>


        <div className='flex  gap-4'>
          <div className='video-player w-10'>
            <Button
              frontIconHeight="18"
              frontIconWidth="18"
              frontIconName={isPlaying ? "iconoir:pause-solid" : "iconoir:play-solid"}
              textClass="text-white"
              bgClass=""
              className="p-2 rounded-full hover:bg-white/13"
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
                px-3
                rounded-full
                bg-black
                hover:bg-white/13
                transition-colors
                duration-200
              ">

              <Icon name="mingcute:volume-fill" height="18" width="18" />

              <div className="
                flex-1
                ml-2
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-300
              ">
                <div className="h-1 w-full bg-gray-600 rounded-full">
                  <div className={`h-1 w-${volume} bg-white rounded-full`} />
                </div>
              </div>

            </div>
          </div>



          <div className='video-player text-xs w-20'>
            <div className='video-player w-18 h-8 hover:bg-white/13'>
              <span>00</span><Icon name="fad:digital-colon" height="18" width="18" /><span>00</span>
            </div>
          </div>

        </div>

        <div className='video-player px-3 gap-1'>

          <img src={logo} className='bg-white h-7 ml-2 rounded-xs p-0.5' />

          <div className="video-player w-20 h-8 hover:bg-white/13 rounded-full px-2 flex gap-2 items-center">

            <Icon name="fluent:timer-2-20-filled" Height="20" Width="20" />

            <div className="flex items-end leading-none">

              <span className="text-white text-sm">2x</span>

              <Icon
                name="ic:round-arrow-drop-up"
                height="14"
                width="14"
                className=""
              />

            </div>

          </div>


          <Button
            frontIconHeight="18"
            frontIconWidth="18"
            frontIconName={isPlaying ? "mingcute:fullscreen-fill" : "mingcute:fullscreen-fill"}
            textClass="text-white"
            bgClass=""
            className="p-2 rounded-full hover:bg-white/13"
          />
        </div>
      </div>
    </div>
  )
}

export default VideoControls
