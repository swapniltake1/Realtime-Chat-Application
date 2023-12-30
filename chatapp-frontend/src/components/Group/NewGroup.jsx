import { Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { BsArrowLeft, BsCheck2 } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createGroupChat } from '../../Redux/Chat/Action';

const NewGroup = ({groupMember, setIsGroup}) => {
    const [isImgUploading, setIsImgUploading] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [groupImg, setGroupImg] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    


    const HandleNavigate =()=>{
        navigate(-1);
    };


    const uploadToCloudnary = (pics) => {
        setIsImgUploading(true);
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
                console.log("Uploading to cloudnery :: ",data);
                setGroupImg(data.url.toString());
                setIsImgUploading(false);
            } else {
                console.error("Error: URL not found in response data");
                setIsImgUploading(false);
            }
        })
        .catch((error) => {
            console.error("Error uploading to Cloudinary:", error);
            setIsImgUploading(false);
        });
    };


    const handleCreateGroup = () =>{
        
        let userIds =[];

        for(let user of groupMember){
            userIds.push(user.id);
        }

        const group ={
            userIds,
            chatName: groupName,
            chatImage: groupImg,
        };

        const data={
            group, 
            token,
        }

        console.log("req for create grp",group);
        dispatch(createGroupChat(data));
         setIsGroup(false);
        console.log("grp created");

        navigate("/");
    }

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
                        <img className='w-full h-full object-cover'
                         src={ groupImg || "https://media.istockphoto.com/id/1158561473/vector/three-persons-icon-black-vector.webp?s=2048x2048&w=is&k=20&c=q8IXcz8hnaQ3ICQHTB489rEOZMfvJxMWnZUJfSDEjZQ="} alt="" />
                        {isImgUploading && <CircularProgress className='absolute top-[4rem] left-[4rem]' />}
                    </div>
                    <input type="file" id='imgInput' className='hidden' onChange={(e) => uploadToCloudnary(e.target.files[0])} />
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
                    <Button style={{ borderRadius: '50%' }} onClick={handleCreateGroup}>
                        <div className='bg-[#4fc7fa] rounded-full p-4'>
                            <BsCheck2 className='text-white font-bold text-3xl' />
                        </div>
                    </Button>
                </div>
            }
        </div>
    );
};

export default NewGroup;
