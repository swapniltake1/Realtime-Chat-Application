import React, { useState } from 'react';
import { BsArrowLeft, BsCheck, BsCheck2, BsPencil } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../Redux/Auth/Action';

const Profile = ({HandleCloseOpenProfile}) => {
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);
    const [username, setusername] = useState(null);
    const {auth} = useSelector(store=>store);
    const dispatch = useDispatch();
    const [tempPicture, setTempPicture] = useState(null);

        

    const HandleFlag =()=>{
        setFlag(true);
    }

    const HandleCheck = () =>{
        
    const data = {
        id: auth.reqUser.id,
        token: localStorage.getItem("token"),
        data: { fullName: username },
    };
       setusername(username);
       dispatch(updateUser(data));
       setFlag(false);
    }

    const HandleUsernameChange = (e) =>{
         setusername(e.target.value);
    }

    const uploadToCloudnary = (pics) => {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "muts8jvf");
        data.append("cloud_name", "def1ublz5");
        
        fetch("https://api.cloudinary.com/v1_1/def1ublz5/image/upload", {
            method: "POST",
            body: data,
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data) {
                setTempPicture(data.url.toString());
                
                const data2 = {
                    id: auth.reqUser.id,
                    token: localStorage.getItem("token"),
                    data: { profilePicture: data.url.toString() },
                };
                dispatch(updateUser(data2));
            } else {
                console.error("Error: URL not found in response data");
            }
        })
        .catch((error) => {
            console.error("Error uploading to Cloudinary:", error);
        });
    };

   const handleUpdateUsername=(e)=>{

    const data = {
        id: auth.reqUser.id,
        token: localStorage.getItem("token"),
        data: { fullName: username },
    };

           if(e.key==="Enter"){
                    dispatch(updateUser(data.data.fullName))
           }
    }
    
    


  return (
    <div className='w-full h-full'>

        <div className='flex items-center -space-x-10 bg-cyan-600 text-white pt-16 px-10 pb-5 justify-between '>

            <BsArrowLeft className='cursor-pointer text-2xl font-bold' onClick={HandleCloseOpenProfile} />
            <p className='font-semibold cursor-pointer' > Profile </p>

        </div>

        <div className="flex flex-col justify-center items-center my-12">

            <label htmlFor='ImgInput'>
                <img className='rounded-full w-[15vw] h-[15vw] cursor-pointer' src={tempPicture ||  auth.reqUser?.profilePicture || tempPicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
            </label>
            <input onChange={(e)=>  uploadToCloudnary(e.target.files[0])} type="file" id='ImgInput' className='hidden' />

        </div>

        { /* this is sepdrate  */}

        <div className='bg-white'>

            <p className='px-3 py-3'></p>

            { !flag &&
            <div className='w-full flex justify-between items-center'>
                <p className=' px-3 py-3'>{ username ||  auth.reqUser?.fullName}</p>
                <BsPencil onClick={HandleFlag} className='cursor-pointer mr-3' />
            </div>
               }

               {
                flag && 
                <div className='w-full flex items-center justify-between py-2'> 
                    <input onKeyPress={handleUpdateUsername} onChange={HandleUsernameChange} className='ml-3 w-[80%] outline-none border-b-2 border-orange-700 p-2' type="text" placeholder='Enter your Name ' />
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