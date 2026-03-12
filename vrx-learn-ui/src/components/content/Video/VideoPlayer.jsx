import React, { useRef, useState } from 'react'
import VideoControls from './VideoControls'
import { useContentProtection } from '@/hooks/useContentProtection';
function VideoPlayer({ url,id }) {
    useContentProtection(true)
    const videoRef = useRef(null);






    return (

        <div className="relative  w-full aspect-video bg-black rounded-lg overflow-hidden">
            <video
                key={id}
                ref={videoRef}
                className="w-full h-full"
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
            >
                <source src={url} type="video/mp4" />
            </video>
            <VideoControls videoRef={videoRef} />
        </div>

    )
}

export default VideoPlayer
