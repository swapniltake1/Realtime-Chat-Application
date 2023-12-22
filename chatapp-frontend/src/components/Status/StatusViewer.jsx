import React, { useEffect, useState } from 'react'
import { stories } from './TestImage'

const StatusViewer = () => {
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

  return (
    <div>
        <div className='flex justify-center items-center h-[100vh] bg-slate-900'>
            <div>
                <img className='max-h-[96vh] object-contain ' src={stories?.[curentStoryIndex].img} alt="" />
            </div>
        </div>
    </div>
  )
}

export default StatusViewer