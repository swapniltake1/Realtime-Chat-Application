import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const SelectedMember = (handleRemoveMember, member) => {

    return (
        <div className='flex items-center bg-slate-300 rounded-full '>
            <img className='w-7 h-7 rounded-full' src="https://cdn.pixabay.com/photo/2023/12/13/13/37/robin-8446944_1280.jpg" alt="" />
            <p className='px-2'>username</p>
            <AiOutlineClose onClick={handleRemoveMember} className='pr-1 cursor-pointer' />
        </div>
    )
}

export default SelectedMember