import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {
    const{getUsers,users,selectedUser,setSelectedUser,unseenMessages,setUnseenMessages}=useContext(ChatContext);
    const {logout,onlineUsers}=useContext(AuthContext)
    const[input,setInput]=useState(false)

    const navigate=useNavigate();

    const filteredUsers=input ? users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase())):users;
    useEffect(()=>{
        getUsers();
    },[onlineUsers])

  return (
    <div className={`bg-gradient-to-b from-slate-50/10 to-slate-100/20 dark:from-slate-800/20 dark:to-slate-900/30 backdrop-blur-xl border-r border-slate-200/20 dark:border-slate-700/30 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300/50 scrollbar-track-transparent text-slate-800 dark:text-white ${selectedUser?"max-md:hidden":''}`}>
        
        {/* Header Section */}
        <div className='p-6 border-b border-slate-200/20 dark:border-slate-700/30'>
            <div className='flex justify-between items-center mb-6'>
                <img src={assets.logo || "/placeholder.svg"} alt="logo" className='h-8 object-contain'/>
                <div className="relative group">
                    <button className='p-2 rounded-full hover:bg-white/10 dark:hover:bg-slate-700/30 transition-colors duration-200'>
                        <img src={assets.menu_icon || "/placeholder.svg"} alt="Menu" className='w-5 h-5 opacity-70 pointer-events-none'/>
                    </button>
                    <div className='absolute top-full right-0 z-20 w-40 mt-2 p-2 rounded-xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0'>
                        <button onClick={()=>navigate('/profile')} className='w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-200 flex items-center gap-2'>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                            Edit Profile
                        </button>
                        <div className="h-px bg-slate-200/50 dark:bg-slate-600/50 my-1" />
                        <button onClick={()=>logout()} className='w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 flex items-center gap-2'>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Search Bar */}
            <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                    <img src={assets.search_icon || "/placeholder.svg"} alt="Search" className='w-4 h-4 opacity-50'/>
                </div>
                <input 
                    onChange={(e)=>setInput(e.target.value)} 
                    type="text" 
                    className='w-full bg-white/20 dark:bg-slate-800/30 backdrop-blur-sm border border-slate-200/30 dark:border-slate-700/40 rounded-full py-3 pl-12 pr-4 text-sm text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200' 
                    placeholder='Search conversations...'
                />
            </div>
        </div>

        {/* Users List */}
        <div className='flex-1 p-3'>
            <div className='space-y-1'>
                {filteredUsers.map((user, index)=>(
                    <div 
                        onClick={()=>{setSelectedUser(user);setUnseenMessages(prev=>
                        ({...prev,[user._id]:0})
                        )}}
                        key={index} 
                        className={`relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/10 dark:hover:bg-slate-700/30 group ${selectedUser?._id===user._id ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 shadow-lg' : ''}`}
                    >
                        <div className='relative'>
                            <img src={user?.profilePic||assets.avatar_icon || "/placeholder.svg"} alt="" className='w-12 h-12 rounded-full object-cover ring-2 ring-white/20 dark:ring-slate-700/50 shadow-sm' />
                            {onlineUsers.includes(user._id) && (
                                <div className='absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 shadow-sm'>
                                    <div className='w-full h-full bg-emerald-500 rounded-full animate-pulse'></div>
                                </div>
                            )}
                        </div>
                        
                        <div className='flex-1 min-w-0'>
                            <div className='flex items-center justify-between mb-1'>
                                <h3 className='font-medium text-slate-800 dark:text-white truncate text-sm'>{user.fullName}</h3>
                                {unseenMessages[user._id] > 0 && (
                                    <div className='flex-shrink-0 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse'>
                                        {unseenMessages[user._id] > 9 ? '9+' : unseenMessages[user._id]}
                                    </div>
                                )}
                            </div>
                            <div className='flex items-center gap-2'>
                                {
                                    onlineUsers.includes(user._id)
                                    ? <span className='text-emerald-500 dark:text-emerald-400 text-xs font-medium'>Online</span>
                                    : <span className='text-slate-500 dark:text-slate-400 text-xs'>Offline</span>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredUsers.length === 0 && (
                <div className='flex flex-col items-center justify-center py-12 text-center'>
                    <div className='w-16 h-16 bg-slate-200/50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-4'>
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </div>
                    <p className='text-slate-500 dark:text-slate-400 text-sm'>No users found</p>
                    <p className='text-slate-400 dark:text-slate-500 text-xs mt-1'>Try a different search term</p>
                </div>
            )}
        </div>
    </div>
  )
}

export default Sidebar