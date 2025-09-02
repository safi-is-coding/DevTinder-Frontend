import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoginForm, setIsLoginForm] = useState(true)


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId: emailId,
        password: password
      },
      {
        withCredentials: true
      })

      // console.log(res.data.user);
      dispatch(addUser(res.data.user))
      navigate("/feed")
    } catch (err) {
      // console.error("Login failed:", err);
      const errorMessage = err?.response?.data?.message || "Login Failed !!"
      setError(errorMessage)
    }
  }

  const handleSignUp = async() => {
    try {
      const res = await axios.post(BASE_URL+"/signup", 
      {
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
        password: password
      },
      {
        withCredentials: true
      })
      // console.log(res.data.user);
      dispatch(addUser(res?.data?.data))
      navigate("/profile")

      
    } catch (error) {
      console.error("Signup failed:", error);
      const errorMessage = error?.response?.data?.message || "Signup Failed !!"
      setError(errorMessage)
    }
  }



  return (
    <div className="flex justify-center mt-12 px-4 mb-20">
  <div className="card bg-base-200/70 backdrop-blur-md w-full max-w-md shadow-2xl rounded-2xl border border-base-300">
    <div className="card-body p-6 sm:p-8">
      
      {/* Title */}
      <h2 className="card-title text-3xl font-bold text-center text-primary mb-4">
        {isLoginForm ? "Login" : "Sign Up"}
      </h2>

      {/* Toggle */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <p className='text-base font-semibold transition-colors text-secondary'>
        {isLoginForm ? "Toggle to Sign Up" : "Toggle to Login"}
        </p>
        <input 
          type="checkbox"  
          className="toggle toggle-secondary scale-110 shadow-md" 
          checked={isLoginForm}
          onChange={() => setIsLoginForm(!isLoginForm)} 
        />
        
      </div>

      {/* Form */}
      <div className="space-y-4">
        {!isLoginForm && (
          <>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-medium text-gray-600">First Name</legend>
              <input 
                type="text"
                value={firstName} 
                className="input input-bordered w-full rounded-xl" 
                placeholder="Enter first name" 
                onChange={(e)=>setFirstName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-medium text-gray-600">Last Name</legend>
              <input 
                type="text"
                value={lastName} 
                className="input input-bordered w-full rounded-xl" 
                placeholder="Enter last name"
                onChange={(e)=> setLastName(e.target.value)} 
              />
            </fieldset>
          </>
        )}

        <fieldset className="fieldset">
          <legend className="fieldset-legend text-sm font-medium text-gray-600">Email</legend>
          <input 
            type="text"
            value={emailId} 
            className="input input-bordered w-full rounded-xl" 
            placeholder="Enter your email" 
            onChange={(e)=>setEmailId(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend text-sm font-medium text-gray-600">Password</legend>
          <input 
            type="password"
            value={password} 
            className="input input-bordered w-full rounded-xl" 
            placeholder="Enter your password"
            onChange={(e)=> setPassword(e.target.value)} 
          />
        </fieldset>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

      {/* Action */}
      <div className="card-actions mt-6">
        <button 
          className="btn btn-primary w-full rounded-xl shadow-md hover:scale-[1.02] transition-transform"
          onClick={isLoginForm ? handleLogin : handleSignUp}
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

export default Login