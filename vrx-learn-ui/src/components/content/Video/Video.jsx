import React from 'react'

function Video({url}) {
    return (
        <div className=''>
            <video
                className="w-full rounded-lg"
                src={url}
                controls
            />
        </div>
    )
}

export default Video
