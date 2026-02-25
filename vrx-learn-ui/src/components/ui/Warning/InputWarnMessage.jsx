import React from 'react'
import Icon from '../Icon'

function InputWarnMessage(
    {
        icon = <Icon name="jam:triangle-danger-f" width="16px" height="16px" /> ,
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
