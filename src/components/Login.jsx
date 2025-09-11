import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {
  const location = useLocation()
  const defaultMode = location?.state?.mode || "login"

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [photo, setPhoto] = useState(null) // file instead of string
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false) 

  const [isLoginForm, setIsLoginForm] = useState(defaultMode === "login")

  const navigate = useNavigate()
  const dispatch = useDispatch()


const handleLogin = async () => {
  setLoading(true)   // start loading
  setError("")
  try {
    const res = await axios.post(
      BASE_URL + "/login",
      { emailId, password },
      { withCredentials: true }
    )

    dispatch(addUser(res.data.user))
    navigate("/feed")
  } catch (err) {
    const errorMessage = err?.response?.data?.message || "Login Failed !!"
    setError(errorMessage)
  } finally {
    setLoading(false)   // stop loading
  }
}

// 🔹 Signup API (multipart/form-data)
const handleSignUp = async () => {
  setLoading(true)   // start loading
  setError("")
  try {
    const formData = new FormData()
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("emailId", emailId)
    formData.append("password", password)
    if (photo) formData.append("photo", photo)

    const res = await axios.post(BASE_URL + "/signup", formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    })

    dispatch(addUser(res?.data?.data))
    navigate("/profile")
  } catch (err) {
    const errorMessage = err?.response?.data?.message || "Signup Failed !!"
    setError(errorMessage)
  } finally {
    setLoading(false)   // stop loading
  }
}


  return (
    <div className="flex justify-center mt-12 px-4 mb-30">
      <div className="card bg-base-300 backdrop-blur-md w-full max-w-md shadow-2xl rounded-2xl border border-base-300">
        <div className="card-body p-6 sm:p-8">
          {/* Title */}
          <h2 className="card-title text-3xl font-bold text-center text-primary mb-4">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <p className="text-base font-semibold transition-colors text-secondary">
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
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-sm font-medium text-gray-600">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full rounded-xl"
                    placeholder="Enter last name"
                    onChange={(e) => setLastName(e.target.value)}
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
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-medium text-gray-600">Password</legend>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full rounded-xl"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>

            {!isLoginForm && (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Pick a file</legend>
                <input
                  type="file"
                  className="file-input"
                  onChange={(e) => setPhoto(e.target.files[0])} // store file in state
                />
                <label className="label">Max size 2MB</label>
              </fieldset>
            )}
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

          {/* Action */}
          <div className="card-actions mt-6">
            <button
              className="btn btn-primary w-full rounded-xl shadow-md hover:scale-[1.02] transition-transform flex justify-center items-center gap-2"
              onClick={isLoginForm ? handleLogin : handleSignUp}
              disabled={loading} // disable while loading
            >
              {loading && <span className="loading loading-spinner loading-sm"></span>}
              {loading ? (isLoginForm ? "Logging in..." : "Signing up...") : (isLoginForm ? "Login" : "Sign Up")}
            </button>
          </div>


          
        </div>
      </div>
    </div>
  )
}

export default Login
