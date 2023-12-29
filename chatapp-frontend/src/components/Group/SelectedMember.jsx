import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'


const SelectedMember = ({handleRemoveMember, member} ) => {
    
    return (
      <div className='flex items-center bg-slate-300 rounded-full '>
        <img className='w-7 h-7 rounded-full' src={ member.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
        <p className='px-2'>{member.fullName}</p>
        <AiOutlineClose onClick={() => handleRemoveMember(member)} className='pr-1 cursor-pointer' />
      </div>
    );
  };
  
  export default SelectedMember;
  