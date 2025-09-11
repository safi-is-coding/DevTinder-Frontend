import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from "../utils/constants"
import { addUser } from '../utils/userSlice'
import UserCard from './UserCard'

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const [age, setAge] = useState(user?.age)
  const [gender, setGender] = useState(user?.gender)
  const [about, setAbout] = useState(user?.about)
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl) // preview image
  const [photo, setPhoto] = useState(null) // new file
  const [error, setError] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [loading, setLoading] = useState(false) 

  const dispatch = useDispatch()

  const saveProfile = async () => {
    setError("")
    setLoading(true) // start loading

    try {
      const formData = new FormData()
      formData.append("firstName", firstName)
      formData.append("lastName", lastName)
      formData.append("age", age)
      formData.append("gender", gender)
      formData.append("about", about)

      if (photo) {
        formData.append("photo", photo) // only append if user picked a new file
      }

      const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })

      if (res.status === 200) {
        dispatch(addUser(res?.data?.data))
        setPhotoUrl(res?.data?.data?.photoUrl) // update preview with new Cloudinary URL
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
      }
    } catch (err) {
      setError("Failed to update profile. Please try again.")
      console.error("Error updating profile:", err)
    } finally {
      setLoading(false) // stop loading
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setPhoto(file)
    if (file) {
      setPhotoUrl(URL.createObjectURL(file)) // local preview before upload
    }
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center mt-6 mb-20 px-4 gap-6">
        
        {/* Preview Card Section */}
        <div className="w-full lg:w-1/3">
          <UserCard user={{ firstName, lastName, about, photoUrl, age, gender }} />
        </div>

        {/* Form Section */}
        <div className="card bg-base-300 w-full lg:w-2/3 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl md:text-3xl mb-5">Edit Profile</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input 
                  type="text" 
                  value={firstName} 
                  className="input input-bordered w-full text-sm md:text-base" 
                  onChange={(e) => setFirstName(e.target.value)} 
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input 
                  type="text" 
                  value={lastName} 
                  className="input input-bordered w-full text-sm md:text-base" 
                  onChange={(e) => setLastName(e.target.value)} 
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Profile Photo</legend>
                <input
                  type="file"
                  className="file-input"
                  onChange={handleFileChange}
                />
                <label className="label">Max size 2MB</label>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input 
                  type="number" 
                  value={age} 
                  className="input input-bordered w-full text-sm md:text-base" 
                  onChange={(e) => setAge(parseInt(e.target.value))} 
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <select 
                  value={gender} 
                  className="select select-bordered w-full text-sm md:text-base"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </fieldset>

              <fieldset className="fieldset md:col-span-2">
                <legend className="fieldset-legend">About</legend>
                <textarea 
                  value={about} 
                  className="textarea textarea-bordered w-full text-sm md:text-base" 
                  rows={3} 
                  onChange={(e) => setAbout(e.target.value)} 
                />
              </fieldset>
            </div>

            <p className="text-red-500 mt-2">{error}</p>
            <div className="card-actions justify-center mt-5">
              <button 
                className="btn btn-primary w-full md:w-1/3 flex justify-center items-center gap-2" 
                onClick={saveProfile}
                disabled={loading}
              >
                {loading && <span className="loading loading-spinner loading-sm"></span>}
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <div>
              <span>Profile updated successfully!</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EditProfile
