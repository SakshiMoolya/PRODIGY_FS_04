import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {
  const[currState,setCurrState]=useState("Sign Up")
  const[fullName,setFullName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[bio,setBio]=useState("")
  const[isDataSubmitted,setIsDataSubmitted]=useState(false);

  const {login}=useContext(AuthContext)

  const onSubmitHandler = (event)=>{
    event.preventDefault();
    if(currState==="Sign Up" && !isDataSubmitted)
    {
      setIsDataSubmitted(true)
      return;
    }
    login(currState==="Sign Up"?'signup':'login',{fullName,email,password,bio})

  }
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 flex items-center justify-center gap-12 sm:justify-evenly max-sm:flex-col p-4'>
        
        {/* Logo Section */}
        <div className='flex flex-col items-center space-y-6'>
          <div className='relative'>
            <div className='absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-full blur-3xl'></div>
            <img src={assets.logo_big || "/placeholder.svg"} alt="Logo" className='relative w-[min(35vw,300px)] drop-shadow-2xl' />
          </div>
          <div className='text-center space-y-2 max-sm:hidden'>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-white dark:to-slate-300 bg-clip-text text-transparent'>
              Welcome Back
            </h1>
            <p className='text-slate-600 dark:text-slate-400 font-medium'>
              Connect with friends and family instantly
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className='w-full max-w-md'>
          <form onSubmit={onSubmitHandler} className='backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/50 dark:border-slate-700/50 p-8 flex flex-col gap-6 rounded-3xl shadow-2xl shadow-slate-900/10 dark:shadow-slate-900/50'>
            
            {/* Header */}
            <div className='flex justify-between items-center mb-2'>
              <h2 className='text-2xl font-bold text-slate-800 dark:text-white'>
                {currState}
              </h2>
              {isDataSubmitted && (
                <button 
                  type="button"
                  onClick={()=> setIsDataSubmitted(false)} 
                  className='p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200'
                >
                  <img src={assets.arrow_icon || "/placeholder.svg"} alt="Back" className='w-5 h-5 opacity-70 pointer-events-none' />
                </button>
              )}
            </div>

            {/* Progress Indicator for Sign Up */}
            {currState === "Sign Up" && (
              <div className='flex items-center gap-2 mb-4'>
                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${!isDataSubmitted ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${isDataSubmitted ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
              </div>
            )}

            {/* Step 1: Basic Info */}
            {currState === "Sign Up" && !isDataSubmitted && (
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-slate-700 dark:text-slate-300'>Full Name</label>
                  <input  
                    onChange={(e)=>setFullName(e.target.value)}  
                    value={fullName} 
                    type="text" 
                    className='w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md' 
                    placeholder='Enter your full name' 
                    required
                  />
                </div>
              </div>
            )}

            {/* Email and Password Fields */}
            {!isDataSubmitted && (
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-slate-700 dark:text-slate-300'>Email Address</label>
                  <input 
                    onChange={(e)=>setEmail(e.target.value)} 
                    value={email} 
                    type="email" 
                    placeholder='Enter your email' 
                    required 
                    className='w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md' 
                  />
                </div>
                
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-slate-700 dark:text-slate-300'>Password</label>
                  <input 
                    onChange={(e)=>setPassword(e.target.value)} 
                    value={password} 
                    type="password" 
                    placeholder='Enter your password' 
                    required 
                    className='w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md' 
                  />
                </div>
              </div>
            )}

            {/* Step 2: Bio */}
            {currState === "Sign Up" && isDataSubmitted && (
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-700 dark:text-slate-300'>Tell us about yourself</label>
                <textarea 
                  onChange={(e)=>setBio(e.target.value)} 
                  value={bio}
                  rows={4} 
                  className='w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md resize-none' 
                  placeholder='Write a brief bio about yourself...' 
                  required
                ></textarea>
                <p className='text-xs text-slate-500 dark:text-slate-400'>This will be visible to other users</p>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type='submit' 
              className='w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2'
            >
              {currState === "Sign Up" ? (
                isDataSubmitted ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                    </svg>
                    Create Account
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                    Continue
                  </>
                )
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                  Sign In
                </>
              )}
            </button>

            {/* Terms Checkbox */}
            <div className='flex items-center gap-3'>
              <input 
                type="checkbox" 
                id="terms"
                className='w-4 h-4 text-blue-600 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded focus:ring-blue-500 focus:ring-2'
              />
              <label htmlFor="terms" className='text-sm text-slate-600 dark:text-slate-400 cursor-pointer'>
                I agree to the <span className='text-blue-600 dark:text-blue-400 hover:underline'>Terms of Service</span> and <span className='text-blue-600 dark:text-blue-400 hover:underline'>Privacy Policy</span>
              </label>
            </div>

            {/* Toggle Auth Mode */}
            <div className='text-center pt-4 border-t border-slate-200/50 dark:border-slate-700/50'>
              {currState === "Sign Up" ? (
                <p className='text-sm text-slate-600 dark:text-slate-400'>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={()=>{setCurrState("Login"); setIsDataSubmitted(false)}} 
                    className='font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 hover:underline'
                  >
                    Sign in here
                  </button>
                </p>
              ) : (
                <p className='text-sm text-slate-600 dark:text-slate-400'>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={()=>{setCurrState("Sign Up")}} 
                    className='font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 hover:underline'
                  >
                    Create one here
                  </button>
                </p>
              )}
            </div>
          </form>
        </div>
    </div>
  )
}

export default LoginPage