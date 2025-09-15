import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useNavigate } from 'react-router-dom'

function ChangePassword() {

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isButtonActive, setIsButtonActive] = useState(false)
  const [error, setError] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const changePassword = async () => {
    setLoading(true)
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/password",
        { oldPassword, newPassword },
        { withCredentials: true }
      );
      // console.log(res.response);
    
      if (res.status === 200) {
        // alert("Password Changed Successfully");
        setOldPassword("");
        setNewPassword("");
        setError("");
        setShowToast(true)
        setTimeout(()=> setShowToast(false), 3000)
      }
    
    } catch (error) {
      // console.log(error.code);
      setError(error.response?.data?.message || "Something went wrong");

      if(error.response?.data?.message.includes("Please Login First !!") ){
        navigate("/login")
      }
    } finally{
      setLoading(false)
    }
  };



  return (
    <>
    <div className="flex justify-center px-4 mt-20">
  <div className="flex flex-col justify-center w-full max-w-md bg-base-300 p-6 sm:p-10 rounded-2xl shadow-md">
    <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Change Password</h2>
    
    {/* Old Password */}
    <fieldset className="fieldset mb-4">
      <legend className="fieldset-legend text-sm sm:text-base">Old Password</legend>
      <input 
        type="password" 
        className="input w-full" 
        placeholder="Old Password"
        value={oldPassword} 
        onChange={(e)=> setOldPassword(e.target.value)}
      />
    </fieldset>

    {/* New Password */}
    <fieldset className="fieldset mb-4">
      <legend className="fieldset-legend text-sm sm:text-base">New Password</legend>
      <input 
        type="password" 
        className="input w-full" 
        placeholder="New Password" 
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
    </fieldset>

    {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

    {/* Button */}
    <button 
      className="btn btn-soft btn-secondary w-full mt-3"
      onClick={changePassword}
      disabled={!oldPassword || !newPassword}
    >
      {loading ? (
              <>
                <span className="loading loading-spinner loading-sm mr-2"></span>
                Updating...
              </>
            ) : (
              "Change Password"
            )}
    </button>
  </div>
</div>

{/* Success Toast */}
{showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <div>
              <span>Password updated successfully!</span>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default ChangePassword