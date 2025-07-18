import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  const {authUser,updateProfile}=useContext(AuthContext)
    const [selectedImg,setSelectedImg]=useState(null)
    const navigate=useNavigate();
    const [name,setName]=useState(authUser.fullName)
    const [bio,setBio]=useState(authUser.bio)

    const handleSubmit=async(e)=>{
      e.preventDefault();
      if(!selectedImg)
      {
        await updateProfile({fullName:name,bio});
        navigate('/');
        return;
      }
      const reader=new FileReader();
      reader.readAsDataURL(selectedImg);
      reader.onload=async()=>
      {
        const base64Image=reader.result;
        await updateProfile({profilePic:base64Image,fullName:name,bio})
         navigate('/');
      }
    }
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4'>
      <div className='w-full max-w-4xl backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-slate-900/10 dark:shadow-slate-900/50 rounded-3xl overflow-hidden'>
        
        <div className='flex items-center max-lg:flex-col-reverse'>
          {/* Form Section */}
          <div className='flex-1 p-8 lg:p-12'>
            <div className='mb-8'>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Edit Profile</h1>
              <p className="text-slate-600 dark:text-slate-400">Update your profile information and settings</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Image Upload */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3'>Profile Picture</label>
                <label htmlFor="avatar" className='group flex items-center gap-4 p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-200'>
                  <input onChange={(e)=>setSelectedImg(e.target.files[0])} type="file" id='avatar' accept='.png,.jpg,.jpeg' hidden/>
                  <div className='relative'>
                    <img 
                      src={selectedImg ? URL.createObjectURL(selectedImg) : authUser?.profilePic || assets.avatar_icon || "/placeholder.svg"} 
                      alt="" 
                      className='w-16 h-16 rounded-full object-cover ring-4 ring-white dark:ring-slate-700 shadow-lg group-hover:scale-105 transition-transform duration-200'
                    />
                    <div className='absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center'>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                  </div>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200'>
                      {selectedImg ? 'Change profile picture' : 'Upload profile picture'}
                    </p>
                    <p className='text-xs text-slate-500 dark:text-slate-400 mt-1'>PNG, JPG or JPEG (max 5MB)</p>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                </label>
              </div>

              {/* Name Input */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-700 dark:text-slate-300'>Full Name</label>
                <input 
                  onChange={(e)=>setName(e.target.value)} 
                  value={name} 
                  type='text' 
                  required 
                  placeholder='Enter your full name' 
                  className='w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md'
                />
              </div>

              {/* Bio Textarea */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-700 dark:text-slate-300'>Bio</label>
                <textarea 
                  onChange={(e)=>setBio(e.target.value)} 
                  value={bio} 
                  placeholder='Tell us about yourself...' 
                  required 
                  className='w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md resize-none' 
                  rows={4}
                ></textarea>
                <p className='text-xs text-slate-500 dark:text-slate-400'>Write a brief description about yourself</p>
              </div>

              {/* Action Buttons */}
              <div className='flex gap-3 pt-4'>
                <button 
                  type='button'
                  onClick={() => navigate('/')}
                  className='flex-1 px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 shadow-sm hover:shadow-md'
                >
                  Cancel
                </button>
                <button 
                  type='submit' 
                  className='flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2'
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className='lg:w-80 bg-gradient-to-br from-slate-100/50 to-slate-200/50 dark:from-slate-800/50 dark:to-slate-700/50 p-8 lg:p-12 flex flex-col items-center justify-center text-center border-l border-slate-200/50 dark:border-slate-700/50 max-lg:border-l-0 max-lg:border-b max-lg:w-full'>
            <div className='space-y-6'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-2xl'></div>
                <img  
                  className='relative w-32 h-32 rounded-full object-cover ring-4 ring-white dark:ring-slate-700 shadow-2xl' 
                  src={selectedImg ? URL.createObjectURL(selectedImg) : authUser?.profilePic || assets.logo_icon || "/placeholder.svg"} 
                  alt="" 
                />
              </div>
              
              <div className='space-y-3'>
                <h2 className='text-xl font-bold text-slate-800 dark:text-white'>
                  {name || 'Your Name'}
                </h2>
                <p className='text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs'>
                  {bio || 'Your bio will appear here...'}
                </p>
              </div>

              <div className='pt-4'>
                <div className='inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium'>
                  <div className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'></div>
                  Preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage