import React, { useEffect, useState } from 'react'
import { stories } from './TestImage'
import Progressbar from './Progressbar';
import {BsArrowLeft} from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const StatusViewer = () => {
    const navigate = useNavigate();
    const [curentStoryIndex, setcurentStoryIndex] = useState(0);
    const [activeStoryIndex, setactiveStoryIndex] = useState(0);

    const HandleNextStory = () =>{
        if(curentStoryIndex<stories?.length-1){
            setcurentStoryIndex(curentStoryIndex+1);
            setactiveStoryIndex(activeStoryIndex+1);
        }
        else{
            setcurentStoryIndex(0);
            setactiveStoryIndex(0);
        }
    }

    useEffect(() =>{
    const intervalId=setInterval(()=>{
     HandleNextStory();
    },2000)
    return ()=> clearInterval(intervalId);
    },[curentStoryIndex]);

    const handleNavigate=()=>{
         navigate(-1);
    }

  return (
    <div>
        <div className='relative flex justify-center items-center h-screen bg-slate-900'>
            <div className='relative'>
                <img className='max-h-[96vh] object-contain ' src={stories?.[curentStoryIndex].img} alt="" />
                <div className='absolute top-0 flex w-full'>
                    {stories.map((item, index)=><Progressbar key={index} duration={2000} index={index} activeIndex={activeStoryIndex} />)}
                </div>
            </div>
            <div>
                <BsArrowLeft onClick={handleNavigate} className='text-white text-2xl cursor-pointer absolute top-10 left-10' />
                <AiOutlineClose onClick={handleNavigate} className='text-white text-2xl cursor-pointer absolute top-10 right-10' />
            </div>
        </div>
    </div>
  )
}

export default StatusViewer