import React, { useState } from 'react';
import { BsArrowLeft, BsCheck, BsCheck2, BsPencil } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);
    const [username, setusername] = useState(null);

    const handleArrowclick =()=>{
        navigate(-1);
    }

    const HandleFlag =()=>{
        setFlag(true);
    }

    const HandleCheck = () =>{
        setFlag(false);
    }

    const HandleUsernameChange = (e) =>{
         setusername(e.target.value);
    }


  return (
    <div className='w-full h-full'>

        <div className='flex items-center -space-x-10 bg-cyan-600 text-white pt-16 px-10 pb-5 justify-between '>

            <BsArrowLeft className='cursor-pointer text-2xl font-bold' onClick={handleArrowclick} />
            <p className='font-semibold cursor-pointer' > Profile </p>

        </div>

        <div className="flex flex-col justify-center items-center my-12">

            <label htmlFor='ImgInput'>
                <img className='rounded-full w-[15vw] h-[15vw] cursor-pointer' src="https://cdn.pixabay.com/photo/2017/01/12/21/42/tiger-1975790_640.jpg" alt="" />
            </label>
            <input type="file" id='ImgInput' className='hidden' />

        </div>

        <div className='bg-white'>

            <p className='px-3 py-3'>Your Name</p>

            { !flag &&
            <div className='w-full flex justify-between items-center'>
                <p className=' px-3 py-3'>{ username || "Swapniltake1"}</p>
                <BsPencil onClick={HandleFlag} className='cursor-pointer mr-3' />
            </div>
               }

               {
                flag && 
                <div className='w-full flex items-center justify-between py-2'> 
                    <input onChange={HandleUsernameChange} className='ml-3 w-[80%] outline-none border-b-2 border-orange-700 p-2' type="text" placeholder='Enter your Name ' />
                    <BsCheck2 onClick={HandleCheck} className='cursor-pointer text-2xl mr-3' />
                </div>
               }

        </div>
        <div className='px-3 my-0'>
            <p className='py-10'>this name will appear on your message </p>
        </div>
    </div>
  )
}

export default Profile