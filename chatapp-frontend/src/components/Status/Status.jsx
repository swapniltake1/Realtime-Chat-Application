import React from 'react'
import StatusUserCard from './StatusUserCard'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Status = () => {

    const navigate = useNavigate();

    const HandleNavigate=()=>{
        navigate(-1);
       }

  return (
    <div>
        <div className='flex items-center px-[14vw] py-[7vh]  '>   
            <div className='left h-[85vh] bg-[#585368] lg:w-[30%] w-[50%] px-5'>
                <div className='pt-5 h-[13%]'>
                 <StatusUserCard />
                </div>
                <hr />
                <div className='overflow-y-auto h-[85%]'>
                    {[1,2,3,4,5,6,7,8,9,10].map((item)=> <StatusUserCard />)}
                </div>
            </div>
            <div className='right relative h-[85vh] lg:w-[70%] w-[50%] bg-[#0b141a]'>
                <AiOutlineClose onClick={HandleNavigate} className='text-white cursor-pointer absolute top-5 right-10' />

            </div>
        </div>
    </div>
  )
}

export default Status