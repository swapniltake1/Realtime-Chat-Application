import React, { useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import SelectedMember from './SelectedMember';
import ChatCard from '../ChatCard/ChatCard';
import NewGroup from './NewGroup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../Redux/Auth/Action';

const CreateGroup = ({ setIsGroup }) => {
    const [newGroup, setNewGroup] = useState(false);
    const [groupMember, setGroupMember] = useState(new Set());
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const { auth, chat } = useSelector(store => store);


    const handleRemoveMember = (item) => {
        const updatedMembers = new Set(groupMember);
        updatedMembers.delete(item);
        setGroupMember(updatedMembers);
        console.log("item", item);
    }

    const handleSearch = () => {
        dispatch(searchUser({ keyword: query, token }));
    }


    return (
        <>
            <div className='w-full h-full '>
                {!newGroup && (

                    <div>
                        <div className='flex items-center space-x-10 bg-[#4790f6] text-white pt-16 px-10 pb-5'>
                            <BsArrowLeft className='cursor-pointer text-2xl font-bold' onClick={() => navigate(-1)} />
                            <p className='font-semibold text-xl'> Add Your Friends to Group </p>
                        </div>


                        <div className='relative bg-white py-4 px-3 '>
                            <div className='flex space-x-2 flex-wrap space-y-1'>
                                {groupMember.size > 0 && Array.from(groupMember)
                                    .map((item) => <SelectedMember handleRemoveMember={() => handleRemoveMember(item)} member={item} />)}


                            </div>
                            <input type="text" onChange={(e) => {
                                handleSearch(e.target.value)
                                setQuery(e.target.value)
                            }}
                                value={query}
                                className='outline-none border-b border-[#8888] p-2 w-[93%]' placeholder='Search your contacts' />
                        </div >
                        <div className='bg-white overflow-y-auto h-[38vh]'>
                            {
                                query && auth.searchUser?.map((item) =>
                                    <div onClick={() => {
                                        groupMember.add(item);
                                        setGroupMember(groupMember);
                                        setQuery("");
                                    }}
                                        key={item?.id}
                                    >
                                        <hr />
                                        <ChatCard userImg={item.profilePicture} name={item.fullName} />
                                    </div>
                                )}
                        </div>

                        <div className='bottom-10 py-10 bg-slate-200 flex items-center justify-center '>
    <div className='bg-blue-500 rounded-full cursor-pointer overflow-hidden '>
        <BsArrowRight className='text-white font-bold text-6xl'
            onClick={() => {
                setNewGroup(true);
            }} />
    </div>
</div>

                    </div>

                )}

                {newGroup && (
                    <NewGroup groupMember={groupMember} setIsGroup={setIsGroup} />
                )}
            </div>
        </>
    )
}

export default CreateGroup