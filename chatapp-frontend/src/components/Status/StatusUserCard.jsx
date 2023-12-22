import React from 'react'
import { useNavigate } from 'react-router-dom'

const StatusUserCard = () => {
    const navigate = useNavigate();

    const HandleNavigate = () =>{
        navigate('/status/{userId}');
    }
  return (
    <div onClick={HandleNavigate} className='flex items-center p-3 cursor-pointer'>
        <div>
                    <img className='h-7 w-7 lg:w-10 lg:h-10 rounded-full' src="https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg" alt="Statusower" />
        </div>
        <div className='ml-2 text-white'>
            <p> UserName </p>
        </div>
    </div>
  )
}

export default StatusUserCard