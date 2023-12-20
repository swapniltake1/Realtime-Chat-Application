import React, { useState } from 'react';
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from 'react-icons/ai';
import { BsEmojiSmile, BsFilter, BsMicFill, BsThreeDotsVertical } from 'react-icons/bs';
import ChatCard from './ChatCard/ChatCard';
import MessageCard from './MessageCard/MessageCard';
import { ImAttachment } from "react-icons/im"
import { useNavigate } from 'react-router-dom';
import Profile from './Profile/Profile';

const Homepage = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [currentChat, setcurrentChat] = useState('');
    const [content, setcontent] = useState('');
    const [isprofile, setisprofile] = useState('false');

    const handleSearch = (value) => {
        setQuery(value);
    }

    const HandleClickOnChat = () => {
        setcurrentChat(true);
    }

    const handleCreateNewMessage = () => {

    }

    const HandleNavigate = () => {
        //  navigate('/profile');
        setisprofile(true);
    }

    return (
        <>
            <div className='relative'>

                <div className='w-full py-14 bg-[#63b8f9]'></div>

                <div className='flex bg-[#f0f2f5] h-[90vh] absolute top-[5vh] left-[2vw] w-[96vw]'>

                    <div className='left w-[30%] h-full bg-[#e8e9ec]'>
                        {/* profile added here  */}

                        {isprofile && 
                            <div className='w-full h-full'>
                                <  Profile />
                                </div>

                            }

                            {/* Home */}
                            {!isprofile &&
                             <div className='w-full'>

                            



                            
                                < div className='flex justify-between items-center p-3'>

                                    <div onClick={HandleNavigate} className='flex items-center space-x-3'>
                                        <img
                                            className='rounded-full w-10 h-10 cursor-pointer'
                                            src="https://cdn.pixabay.com/photo/2018/03/27/21/43/startup-3267505_640.jpg"
                                            alt="profile"
                                        />
                                        <p>Username</p>
                                    </div>

                                    <div className='space-x-3 text-2xl flex items-center'>
                                        <TbCircleDashed />
                                        <BiCommentDetail />
                                    </div>
                                </div>
                            


                            <div className='relative flex justify-center items-center bg-white py-4 px-3'>
                                <input
                                    className='border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-2'
                                    type='text'
                                    placeholder='Search your chats'
                                    onChange={(e) => handleSearch(e.target.value)}
                                    value={query}
                                />
                                <AiOutlineSearch className='left-5 top-7 absolute' />

                                <div>
                                    <BsFilter className='ml-4 text-3xl' />
                                </div>

                            </div>

                            <div className='bg-white overflow-y-auto h-[70vh] px-3'>
                                {/* Dummy Array*/}
                                {query && [1, 2, 3, 4, 5, 6, 7, 9, 10].map((item) => (
                                    <div key={item} onClick={HandleClickOnChat}>
                                        <hr />
                                        <ChatCard />
                                    </div>
                                ))}
                            </div>
                        </div>
                         }
                    </div>

                    <div className='w-[70%]'>
                        {!currentChat &&
                            <div class='right flex items-center justify-center h-full'>
                                <div class='w-[70%] flex flex-col items-center justify-center h-full'>
                                    <div class='max-w-[70%] text-center'>
                                        <img src="https://cdn.pixabay.com/photo/2023/02/01/19/42/man-7761156_1280.jpg" alt="profilepic main chat" class='mx-auto' />
                                        <h1 class='text-4xl'>Welcome to realtime chat application</h1>
                                        <p class='my-9'>Created by swapnil take @2023 all rights reserved</p>
                                    </div>
                                </div>
                            </div>
                        }

                        { /* Show this part when am click on the card impl */}

                        {currentChat &&
                            <div className='w-full relative'>

                                <div className='right header absolute top-0 w-full bg-[#f0f2f5]'>

                                    <div className='flex justify-between'>

                                        <div className='py-3 space-x-4 flex items-center px-3'>
                                            <img className='w-10 h-10 rounded-full' src="https://cdn.pixabay.com/photo/2023/12/09/10/10/woman-8439003_1280.png" alt="card chat img" />
                                            <p>
                                                Username
                                            </p>
                                        </div>

                                        <div className='py-3 flex space-x-4  items-center px-3'>
                                            <AiOutlineSearch />
                                            <BsThreeDotsVertical />
                                        </div>

                                    </div>
                                </div>
                                {/* Message Section code  */}

                                <div className='px-10 h-[85vh] overflow-y-auto bg-gray-100'>
                                    <div className='space-y-1 flex flex-col justify-center border-none mt-20 py-2'>
                                        {[1, 2, 3, 4, 5, 6, 5, 6, 9, 8, 7, 22, 33].map((item, i) => (
                                            <MessageCard key={i} content={"hi there message"} isReqUserMessage={i % 2 === 0} />
                                        ))}
                                    </div>
                                </div>

                                {/* Footer for sending semmsages  */}

                                <div className='footer h-7 bg-[#f0f2f5] absolute bottom-0 w-full py-2 text-2xl'>
                                    <div className='flex justify-between items-center px-5'>
                                        <BsEmojiSmile className='cursor-pointer' />
                                        <ImAttachment className='cursor-pointer' />

                                        <input className='py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]'
                                            type='text' onChange={(e) => setcontent(e.target.value)}
                                            placeholder='Enter your message to send ' value={content} onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    handleCreateNewMessage();
                                                    setcontent('');
                                                }
                                            }} />
                                        <BsMicFill />
                                    </div>
                                </div>

                            </div>
                        }


                    </div>

                </div>
            </div>
        </>

    )
}

export default Homepage