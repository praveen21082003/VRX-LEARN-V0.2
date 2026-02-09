import React from 'react'
import {TriangleAlert} from 'lucide-react';

function InputWarnMessage(
    {
        icon = <TriangleAlert size={15} strokeWidth={3} />,
        message,
    }
) {

    
  return (
    <div className='flex gap-1.5 font-medium text-[#D32F2F]'>
      <span>{icon}</span>
      <p className='text-xs'>{message}</p>
    </div>
  )
}

export default InputWarnMessage
