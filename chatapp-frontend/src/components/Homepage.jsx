import React, { useCallback, useEffect, useState } from 'react';
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from 'react-icons/ai';
import { BsEmojiSmile, BsFilter, BsMicFill, BsThreeDotsVertical } from 'react-icons/bs';
import ChatCard from './ChatCard/ChatCard';
import MessageCard from './MessageCard/MessageCard';
import { ImAttachment } from "react-icons/im"
import { useNavigate } from 'react-router-dom';
import Profile from './Profile/Profile';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CreateGroup from './Group/CreateGroup';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, logoutUser, searchUser } from '../Redux/Auth/Action';
import { createChat, getUserChat } from '../Redux/Chat/Action';
import { createMessage, getAllMessages } from '../Redux/Message/Action';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';


const Homepage = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [currentChat, setcurrentChat] = useState('');
    const [content, setcontent] = useState('');
    const [isprofile, setisprofile] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isGroup, setIsGroup] = useState(false);
    const dispatch = useDispatch();
    const { auth, chat, message } = useSelector(store => store);
    const token = localStorage.getItem("token");
    const [stompClient, setStompClient] = useState();
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);

    const connect = () => {
        const socket = new SockJS("http://localhost:8080/ws");
        const temp = over(socket);
        setStompClient(temp);

        const headers = {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": getcookies("XSRF-TOKEN")
        }

        temp.connect(headers, onConnect, onError)

        
    }

    function getcookies(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(` ; ${name}=`);

        if (parts.length === 2) {
            return parts.pop.split(";").shift();
        }
    }

    const onError = (error) => {
        console.log("On Error : ", error)
    }

    const onConnect = () => {
        console.log("WebSocket Connected :: ");
        setIsConnected(true);
    }

    useEffect(() => {

        if (message.newMessage && stompClient) {
            setMessages([...messages, message.newMessage]);
            stompClient?.send("/app/message", {}, JSON.stringify(message.newMessage));
        }
    }, [message.newMessage]);




    const onMessageReceiver = (payload) => {
        console.log("Received Messages::::::::::::", JSON.parse(payload.body));

        const receivedMessage = JSON.parse(payload.body);
        setMessages([...messages, receivedMessage])
    }

    useEffect(() => {
    if (isConnected && stompClient && auth.reqUser && currentChat) {
        const subscription = stompClient.subscribe(
            "/group" + currentChat.id.toString(), onMessageReceiver
        );

        return () => {
            subscription.unsubscribe();
        };
    }
}, []);

    

    useEffect(() => {
        connect();
    }, [])

    useEffect(() => {
       setMessages(message.messages)
    }, [message.messages]);
    

    





    const handleSearch = (keyword) => {

        dispatch(searchUser({ keyword, token }));
    }

    const HandleClickOnChat = (userId) => {
        // setcurrentChat(true);
        dispatch(createChat({ token, data: { userId } }));
        setQuery("");
    }



    const handleCreateNewMessage = () => {
        dispatch(createMessage({ token, data: { chatId: currentChat.id, content: content } }));
      //  console.log("message created..", content);

    }



    const HandleNavigate = () => {
        //  navigate('/profile');
        setisprofile(true);
    }

    const HandleCloseOpenProfile = () => {
        setisprofile(false);
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCreateGroup = () => {
        setIsGroup(true);
    };

    const handleLogOut = () => {
        dispatch(logoutUser());
        navigate("/signin")

    };

    const HandleCurrentChat = (item) => {
        setcurrentChat(item);
    }

    useEffect(() => {
       // console.log('getting your chats');
        dispatch(getUserChat({ token }))
    }, [chat.createdChat, dispatch, token, chat.createdGroup, message.newMessage]);

    useEffect(() => {
       // console.log("getting your All groups & Chat ", currentChat);
        if (currentChat?.id) {
            dispatch(getAllMessages({ chatId: currentChat.id, token }));
        }
    }, [currentChat, dispatch, token, message.newMessage]);


    useEffect(() => {
        if (token && !auth.reqUser) {
           // console.log("Getting your Profile.....", auth);
            dispatch(currentUser(token));
        }

    }, [token, dispatch, auth, auth.reqUser]);

    useEffect(() => {
        if (auth.reqUser === null) {
            navigate("/signin");
        }
        if (auth.reqUser?.fullName) {
            navigate("/");
        }
    }, [auth.reqUser, navigate]);

    console.log("Messages ",messages);

   // console.log("UI Refreshed :: ", auth, chat, message);

    /*  console.log("users chat log", chat.chats);
  
      function logChatInformation() {
          if (chat.chats.length > 0 && !query && chat.chats) {
              chat.chats.forEach((item) => {
                  console.log("items", item);
              });
          }
      }
  
      useEffect(() => {
          logChatInformation();
      }, []);  */










    return (
        <>
            <div className='relative'>

                <div className='w-full py-14 bg-[#63b8f9]'></div>

                <div className='flex bg-[#f0f2f5] h-[90vh] absolute top-[5vh] left-[2vw] w-[96vw]'>

                    <div className='left w-[30%] h-full bg-[#e8e9ec]'>
                        {/* profile added here  */}
                        {isGroup && <CreateGroup setIsGroup={setIsGroup} />}

                        {isprofile &&
                            <div className='w-full h-full'>
                                <  Profile HandleCloseOpenProfile={HandleCloseOpenProfile} />
                            </div>

                        }

                        {/* Home */}
                        {!isprofile && !isGroup &&
                            <div className='w-full'>






                                < div className='flex justify-between items-center p-3'>

                                    <div onClick={HandleNavigate} className='flex items-center space-x-3'>
                                        <img
                                            className='rounded-full w-10 h-10 cursor-pointer'
                                            src={auth.reqUser?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                            alt="profile"
                                        />
                                        <p>{auth.reqUser?.fullName}</p>

                                    </div>

                                    <div className='space-x-3 text-2xl flex items-center'>
                                        <TbCircleDashed className='cursor-pointer' onClick={() => navigate("/status")} />
                                        <BiCommentDetail />
                                        <div>


                                            <BsThreeDotsVertical id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick} />



                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem onClick={HandleNavigate}>Profile</MenuItem>
                                                <MenuItem onClick={handleCreateGroup}>Create Group</MenuItem>
                                                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                                            </Menu>

                                        </div>

                                    </div>
                                </div>



                                <div className='relative flex justify-center items-center bg-white py-4 px-3'>
                                    <input
                                        className='border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-2'
                                        type='text'
                                        placeholder='Search your chats'
                                        onChange={(e) => {
                                            handleSearch(e.target.value)
                                            setQuery(e.target.value)
                                        }}
                                        value={query}
                                    />
                                    <AiOutlineSearch className='left-5 top-7 absolute' />

                                    <div>
                                        <BsFilter className='ml-4 text-3xl' />
                                    </div>

                                </div>

                                <div className='bg-white overflow-y-auto h-[70vh] px-3'>

                                    {query && auth.searchUser.map((item) => (
                                        <div onClick={() => HandleClickOnChat(item.id)}>
                                            <hr />
                                            <ChatCard name={item.fullName} userImg={item.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />
                                        </div>
                                    ))}

                                    {chat.chats.length > 0 && !query && chat.chats?.map((item) => (
                                        <div onClick={() => HandleCurrentChat(item)} key={item.id}>
                                            <hr />
                                            {item.group ? (

                                                <ChatCard
                                                    name={item.chatName}
                                                    userImg={item.chatImg || "https://cdn.pixabay.com/photo/2017/11/10/05/46/group-2935521_1280.png"}
                                                />
                                            ) : (
                                                <ChatCard
                                                    name={auth.reqUser.id !== item.users[0].id
                                                        ? item.users[0].fullName
                                                        : item.users[1].fullName
                                                    }
                                                    userImg={
                                                        auth.reqUser.id !== item.users[0].id
                                                            ? item.users[0].profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                                            : item.users[1].profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                                    }
                                                />
                                            )}
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
                                        <img src="https://www.pngall.com/wp-content/uploads/10/Message-Silhouette-Background-PNG-Image.png" alt="profilepic main chat" class='h-[20rem] w-[20rem]' />
                                        <h1 class='text-4xl mt-5'>Welcome, {auth.reqUser?.fullName?.split(' ')[0]}</h1>

                                        <p class='text-gray-500 text-sm mt-5 '>Designed & Developed by Swapnil Take © 2023. All Rights Reserved.</p>

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

                                            <img className='w-10 h-10 rounded-full'
                                                src={currentChat.group ? currentChat.chatImg ||
                                                    "https://cdn.pixabay.com/photo/2017/11/10/05/46/group-2935521_1280.png"
                                                    : (auth.reqUser.id !== currentChat.users[0].id
                                                        ? currentChat.users[0].profilePicture ||
                                                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                                        : currentChat.users[1].profilePicture ||
                                                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")} alt="card chat img" />
                                            <p>
                                                {currentChat.group ? currentChat.chatName : (auth.reqUser?.id === currentChat.users[0].id ? currentChat.users[1].fullName : currentChat.users[0].fullName)}
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
                                        { messages?.map((item) => (
                                            <MessageCard
                                                content={item.content}
                                                isReqUserMessage={item.user.id !== auth.reqUser.id} />
                                        ))}
                                    </div>
                                </div>

                                {/* Footer for sending semmsages  */}

                                <div className='footer h-7 bg-[#f0f2f5] absolute bottom-0 w-full py-2'>
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