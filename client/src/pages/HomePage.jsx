import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { ChatContext } from '../../context/ChatContext'

const HomePage = () => {
const {selectedUser}=useContext(ChatContext)

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-2 sm:p-4 lg:px-[8%] lg:py-[3%]'>
       <div className={`backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-700/50 rounded-3xl shadow-2xl shadow-slate-900/10 dark:shadow-slate-900/50
       overflow-hidden h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)] lg:h-[calc(100vh-6rem)] grid transition-all duration-300 ease-in-out ${selectedUser ? 
       'grid-cols-1 md:grid-cols-[280px_1fr_320px] lg:grid-cols-[300px_1fr_350px] xl:grid-cols-[320px_1fr_380px]':'grid-cols-1 md:grid-cols-[300px_1fr]'}`}>
        <Sidebar/>
        <ChatContainer/>
        <RightSidebar />
       </div>
    </div>
  )
}

export default HomePage