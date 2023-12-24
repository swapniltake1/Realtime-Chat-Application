import { Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { BsArrowLeft, BsCheck2 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const NewGroup = () => {
    const [isImgUploading, setIsImgUploading] = useState(false);
    const [groupName, setGroupName] = useState('');
    const navigate = useNavigate();

    const HandleNavigate =()=>{
        navigate(-1);
    };

    return (
        <div className='w-full h-full'>
            {/* Header */}
            <div className='flex items-center space-x-10 bg-[#4693ff] text-white pt-16 px-10 pb-5'>
                <BsArrowLeft className='cursor-pointer text-2xl font-bold' onClick={HandleNavigate} />
                <p className='text-xl font-semibold'> New Group </p>
            </div>

            {/* Image Upload */}
            <div className='flex flex-col justify-center items-center my-12'>
                <label htmlFor="imgInput" className='relative'>
                    <div className='rounded-full border-2 border-gray-500 overflow-hidden w-40 h-40'>
                        <img className='w-full h-full object-cover' src="https://www.onlygfx.com/wp-content/uploads/2018/03/group-photo-posing-silhouette-1.png" alt="" />
                        {isImgUploading && <CircularProgress className='absolute top-0 left-0 w-full h-full' />}
                    </div>
                    <input type="file" id='imgInput' className='hidden' onChange={() => console.log("Image Changed")} />
                </label>
               
            </div>


            {/* Group Name Input */}
            <div className='w-full flex items-center py-2 px-5 justify-between'>
                <input
                    className='w-full outline-none border-b-2 border-blue-500 px-2 bg-transparent'
                    placeholder='Grp name'
                    value={groupName}
                    type="text"
                    onChange={(e) => setGroupName(e.target.value)}
                />
            </div>

            {/* Check Button */}
            {groupName &&
                <div className='py-10 bg-slate-200 flex items-center justify-center'>
                    <Button style={{ borderRadius: '50%' }}>
                        <div className='bg-[#5bf37a] rounded-full p-4'>
                            <BsCheck2 className='text-white font-bold text-3xl' />
                        </div>
                    </Button>
                </div>
            }
        </div>
    );
};

export default NewGroup;
