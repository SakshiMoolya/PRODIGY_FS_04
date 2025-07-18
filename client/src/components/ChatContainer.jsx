import React, { useContext, useEffect, useRef, useState } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const ChatContainer = () => {
const {messages,selectedUser,setSelectedUser,sendMessage,getMessages}=useContext(ChatContext)
const {authUser,onlineUsers}=useContext(AuthContext)

  const scrollEnd=useRef()
  const [input,setInput]=useState('');

  const handleSendMessage=async(e)=>{
    e.preventDefault();
    if(input.trim()=== "") return null;
    await sendMessage({text: input.trim()});
    setInput("")
  }

  const handleSendImage=async(e)=>{
    const file=e.target.files[0];
    if(!file||!file.type.startsWith("image/"))
    {
      toast.error("Select an image file")
      return;
    }
    const reader=new FileReader();
    reader.onloadend=async()=>{
      await sendMessage({image:reader.result})
      e.target.value=""
    }
    reader.readAsDataURL(file)
  }

  useEffect(()=>{
    if(selectedUser)
    {
      getMessages(selectedUser._id)
    }
  },[selectedUser])

  useEffect(()=>{
    if(scrollEnd.current && messages){
      scrollEnd.current.scrollIntoView({behavior:"smooth"})
    }
  },[messages])

  return selectedUser?(
    <div className='h-full overflow-hidden relative bg-gradient-to-b from-slate-50/5 to-slate-100/10 dark:from-slate-800/20 dark:to-slate-900/30 backdrop-blur-xl border-l border-r border-slate-200/20 dark:border-slate-700/30'>
        {/* Header */}
        <div className='flex items-center gap-4 py-4 px-6 bg-white/10 dark:bg-slate-900/20 backdrop-blur-md border-b border-slate-200/20 dark:border-slate-700/30 shadow-sm'>
            <img src={selectedUser.profilePic||assets.avatar_icon || "/placeholder.svg"} alt="" className='w-10 h-10 rounded-full object-cover ring-2 ring-white/20 shadow-lg'/>
            <div className='flex-1 flex items-center gap-3'>
                <h3 className='text-lg font-semibold text-slate-800 dark:text-white'>{selectedUser.fullName}</h3>
                {onlineUsers.includes(selectedUser._id) && (
                    <div className='flex items-center gap-1'>
                        <span className='w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50'></span>
                        <span className='text-xs text-emerald-600 dark:text-emerald-400 font-medium'>Online</span>
                    </div>
                )}
            </div>
            <button onClick={()=> setSelectedUser(null)} className='md:hidden p-2 rounded-full hover:bg-white/10 transition-colors duration-200'>
                <img src={assets.arrow_icon || "/placeholder.svg"} alt="" className='w-5 h-5 opacity-70 pointer-events-none'/>
            </button>
            <button className='max-md:hidden p-2 rounded-full hover:bg-white/10 transition-colors duration-200'>
                <img src={assets.help_icon || "/placeholder.svg"} alt="" className='w-5 h-5 opacity-70 pointer-events-none'/>
            </button>
        </div>
        
        {/* Messages Area */}
        <div className='flex flex-col h-[calc(100%-140px)] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-300/50 scrollbar-track-transparent'>
          {messages.map((msg, index)=>(
            <div key={index} className={`flex items-end gap-3 ${msg.senderId===authUser._id ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-end gap-2 max-w-[75%] ${msg.senderId===authUser._id ? 'flex-row-reverse' : 'flex-row'}`}>
                { msg.image ? (
                  <div className='relative group'>
                    <img src={msg.image || "/placeholder.svg"} alt="" className='max-w-[280px] rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/50 hover:scale-[1.02] transition-transform duration-200'/>
                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition-colors duration-200'></div>
                  </div>
                ):(
                  <div className={`relative px-4 py-3 max-w-[280px] rounded-2xl shadow-lg backdrop-blur-sm border transition-all duration-200 hover:shadow-xl ${
                    msg.senderId===authUser._id 
                      ? 'bg-gradient-to-br from-blue-500/90 to-purple-600/90 text-white border-blue-400/30 rounded-br-md' 
                      : 'bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white border-slate-200/50 dark:border-slate-700/50 rounded-bl-md'
                  }`}>
                    <p className='text-sm leading-relaxed break-words'>{msg.text}</p>
                  </div>
                )}
                <div className='flex flex-col items-center gap-1 mb-1'>
                    <img src={msg.senderId===authUser._id?authUser?.profilePic||assets.avatar_icon:selectedUser?.profilePic||assets.avatar_icon || "/placeholder.svg"} alt="" className='w-6 h-6 rounded-full object-cover ring-1 ring-white/30 shadow-sm'/>
                    <p className='text-xs text-slate-500 dark:text-slate-400 font-medium'>{formatMessageTime(msg.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={scrollEnd}></div>
        </div>

        {/* Input Area */}
        <div className='absolute bottom-0 left-0 right-0 p-4 bg-white/10 dark:bg-slate-900/20 backdrop-blur-md border-t border-slate-200/20 dark:border-slate-700/30'>
          <div className='flex items-center gap-3'>
            <div className='flex-1 flex items-center bg-white/20 dark:bg-slate-800/30 backdrop-blur-sm border border-slate-200/30 dark:border-slate-700/40 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500/50'>
              <input 
                onChange={(e)=>setInput(e.target.value)} 
                value={input} 
                onKeyDown={(e)=>e.key==="Enter" ? handleSendMessage(e):null} 
                type='text' 
                placeholder='Type a message...' 
                className='flex-1 text-sm py-2 bg-transparent border-none outline-none text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400'
              />
              <input onChange={handleSendImage} type='file' id='image' accept='image/png,image/jpeg,image/jpg' hidden/>
              <label htmlFor='image' className='p-2 rounded-full hover:bg-white/20 dark:hover:bg-slate-700/50 transition-colors duration-200 cursor-pointer'>
                <img src={assets.gallery_icon || "/placeholder.svg"} alt='Upload image' className='w-5 h-5 opacity-70 hover:opacity-100 transition-opacity duration-200 pointer-events-none'/>
              </label>
            </div>
            <button 
              onClick={handleSendMessage} 
              type="button"
              className='p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
              disabled={!input.trim()}
            >
              {assets.send_button ? (
                <img src={assets.send_button || "/placeholder.svg"} alt='Send message' className='w-5 h-5 pointer-events-none'/>
              ) : (
                <svg className="w-5 h-5 text-white pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-6 h-full bg-gradient-to-br from-slate-50/10 to-slate-100/20 dark:from-slate-800/10 dark:to-slate-900/20 backdrop-blur-xl max-md:hidden'>
      <div className='relative'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-xl'></div>
        <img src={assets.logo_icon || "/placeholder.svg"} className='relative w-20 h-20 drop-shadow-2xl' alt='Logo'/>
      </div>
      <div className='text-center space-y-2'>
        <h2 className='text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-white dark:to-slate-300 bg-clip-text text-transparent'>Chat Anytime, Anywhere</h2>
        <p className='text-slate-600 dark:text-slate-400 font-medium'>Select a conversation to start messaging</p>
      </div>
    </div>
  )
}

export default ChatContainer