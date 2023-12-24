import React, { useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import SelectedMember from './SelectedMember';
import ChatCard from '../ChatCard/ChatCard';
import NewGroup from './NewGroup';
import { useNavigate } from 'react-router-dom';

const CreateGroup = () => {
    const [newGroup, setNewGroup] = useState(false);
    const [groupMember, setGroupMember] = useState(new Set());
    const [query, setQuery] = useState("");
    const navigate = useNavigate();


    const handleRemoveMember = (item) => {
        groupMember.delete(item);
        setGroupMember(groupMember);
    }

    const handleSearch = () =>{

    }


    return (
        <>
            <div className='w-full h-full '>
                {!newGroup && (

                    <div>
                        <div className='flex items-center space-x-10 bg-[#4790f6] text-white pt-16 px-10 pb-5'>
                            <BsArrowLeft className='cursor-pointer text-2xl font-bold' onClick={()=> navigate(-1)} />
                            <p className='font-semibold text-xl'> Add Your Friends to Group </p>
                        </div>


                        <div className='relative bg-white py-4 px-3 '>
                            <div className='flex space-x-2 flex-wrap space-y-1'>
                                {groupMember.size > 0 && Array.from(groupMember).map((item) => <SelectedMember handleRemoveMember={() => handleRemoveMember(item)} member={item} />)}
                            
                            
                            </div>
                            <input type="text" onChange={(e)=> {
                                handleSearch(e.target.value);
                                setQuery(e.target.value);
                            }} 
                            className='outline-none border-b border-[#8888] p-2 w-[93%]' placeholder='Search your contacts' value={query} />
                        </div >
                        <div className='bg-white overflow-y-auto h-[50.2vh]'>
                         {
                            query && [1,1,1,1,1,1,1,1,1,1 ].map((item)=> 
                            <div onClick={()=> {
                                groupMember.add(item);
                                setGroupMember(groupMember);
                                setQuery("");
                            }}
                            key={item?.id}
                            >
                                <hr />
                                <ChatCard />
                            </div>
                             )}
                        </div>

                        <div className='bottom-10 py-10 bg-slate-200 flex items-center justify-center '>
                           <div className='bg-blue-500 rounded-full p-4 cursor-pointer ' onClick={()=>{
                            setNewGroup(true);
                            
                           }}>
                            <BsArrowRight className='text-white font-bold text-6-xl'
                             onClick={()=>{
                            setNewGroup(true) }} />
                           </div>
                           
                        </div>
                    </div>

                )}

                 {
                    newGroup && <NewGroup />
                 }
            </div>
        </>
    )
}

export default CreateGroup