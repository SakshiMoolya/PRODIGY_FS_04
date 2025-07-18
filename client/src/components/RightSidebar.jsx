import React, { useContext, useEffect, useState } from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSidebar = () => {
  const {selectedUser,messages}=useContext(ChatContext)
  const {logout,onlineUsers}=useContext(AuthContext)
  const[msgImages,setMsgImages]=useState([])

  useEffect(()=>{
    setMsgImages(
      messages.filter(msg=>msg.image).map(msg=>msg.image)
    )
  },[messages])

  return selectedUser && (
    <div className={`bg-gradient-to-b from-slate-50/10 to-slate-100/20 dark:from-slate-800/20 dark:to-slate-900/30 backdrop-blur-xl border-l border-slate-200/20 dark:border-slate-700/30 text-slate-800 dark:text-white w-full relative overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300/50 scrollbar-track-transparent ${selectedUser?"max-md:hidden":""}`}>
      
      {/* Profile Section */}
      <div className='pt-8 pb-6 flex flex-col items-center gap-4 text-center px-6'>
        <div className='relative'>
          <img src={selectedUser?.profilePic || assets.avatar_icon || "/placeholder.svg"} alt="" className='w-24 h-24 rounded-full object-cover ring-4 ring-white/20 dark:ring-slate-700/50 shadow-xl'/>
          {onlineUsers.includes(selectedUser._id) && (
            <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-3 border-white dark:border-slate-800 shadow-lg flex items-center justify-center'>
              <div className='w-2 h-2 bg-white rounded-full animate-pulse'></div>
            </div>
          )}
        </div>
        
        <div className='space-y-2'>
          <h1 className='text-xl font-bold text-slate-800 dark:text-white flex items-center justify-center gap-2'>
            {selectedUser.fullName}
          </h1>
          {onlineUsers.includes(selectedUser._id) && (
            <div className='flex items-center justify-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse'></span>
              <span className='text-sm text-emerald-600 dark:text-emerald-400 font-medium'>Online now</span>
            </div>
          )}
          <p className='text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-[200px]'>{selectedUser.bio}</p>
        </div>
      </div>

      {/* Divider */}
      <div className='mx-6 h-px bg-gradient-to-r from-transparent via-slate-300/50 dark:via-slate-600/50 to-transparent'></div>
      
      {/* Media Section */}
      <div className='p-6 flex-1'>
        <div className='mb-4'>
          <h3 className='text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2'>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
            </svg>
            Shared Media
            <span className='ml-auto text-xs bg-slate-200/50 dark:bg-slate-700/50 px-2 py-1 rounded-full'>
              {msgImages.length}
            </span>
          </h3>
          
          {msgImages.length > 0 ? (
            <div className='max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300/50 scrollbar-track-transparent grid grid-cols-2 gap-3'>
              {msgImages.map((url,index)=>(
                <div key={index} onClick={()=>window.open(url)} className='group cursor-pointer rounded-xl overflow-hidden bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-lg'>
                  <img src={url || "/placeholder.svg"} alt="" className='w-full h-20 object-cover group-hover:scale-105 transition-transform duration-200'/>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center py-8 text-center'>
              <div className='w-12 h-12 bg-slate-200/50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-3'>
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <p className='text-sm text-slate-500 dark:text-slate-400'>No shared media yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className='p-6 pt-0'>
        <button 
          onClick={()=>logout()} 
          className='w-full bg-gradient-to-r from-red-500/90 to-pink-600/90 hover:from-red-600 hover:to-pink-700 text-white border-none text-sm font-medium py-3 px-6 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg'
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Logout
        </button>
      </div>
    </div>
  )
}

export default RightSidebar