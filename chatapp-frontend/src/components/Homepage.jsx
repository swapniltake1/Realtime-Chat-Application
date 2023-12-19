import React, { useState } from 'react';
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFilter } from 'react-icons/bs';
import ChatCard from './ChatCard/ChatCard';

const Homepage = () => {
    const [query, setQuery] = useState('');

    const handleSearch = (value)=>{
        setQuery(value);
    }

    return (
        <>
            <div className='relative'>

                <div className='absolute w-full py-14 bg-[#00a884]'></div>

                <div className='flex bg-[#f0f2f5] h-[94vh] absolute top-6 left-6 w-full'>

                    <div className='left w-[30%] h-full bg-[#e8e9ec]'>
                        <div className='w-full'>

                            <div className='flex justify-between items-center p-3'>

                                <div className='flex items-center space-x-3'>
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

                            <div className='bg-white overflow-y-scroll h-[76.8vh] px-3'>
                                {/* Dummy Array*/}
                                {query && [1, 2, 3, 4, 5, 6, 7].map((item) => (
                                      <div key={item}>
                                        <hr />
                                          <ChatCard />
                                       </div>
                                        ))}
                                
                            </div>
                              {/*  Default chat*/ }
                            <div>

                            </div>
                            

                        </div>

                    </div>
                    <div className='right'>
                         <div className='w-[70%] flex flex-col items-center justify-center h-full'>

                          <div className='max-w-[70%] text-center'>
                          <img src="https://cdn.pixabay.com/photo/2023/02/01/19/42/man-7761156_1280.jpg" alt="profilepic main chat" />
                          <h1 className='text-4xl '> Welcome to realtime chat application</h1>
                          <p className='my-9'> Created by swapnil take @2023 all rights reserved</p>
                          </div>
                         </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Homepage