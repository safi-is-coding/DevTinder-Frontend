import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from "../utils/constants";
import { addUser } from '../utils/userSlice'
import UserCard from './UserCard';

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user?.firstName)
    const [lastName, setLastName] = useState(user?.lastName)
    const [age, setAge] = useState(user?.age)
    const [gender, setGender] = useState(user?.gender)
    const [about, setAbout] = useState(user?.about)
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl)
    const [error, setError] = useState("")
    const [showToast, setShowToast] = useState(false)
    const dispatch = useDispatch()

    const saveProfile = async () => {
        setError("")
        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                { firstName, lastName, photoUrl, age, gender, about },
                { withCredentials: true }
            )
            if (res.status === 200) {
                dispatch(addUser(res?.data?.data))
                setShowToast(true)
                setTimeout(()=> {
                    setShowToast(false)
                }, 3000)
            }
        } catch (err) {
            setError("Failed to update profile. Please try again.")
            console.error("Error updating profile:", err)
        }
    }

    return (
        <>
            <div className='flex justify-center mt-10 mb-20 px-4 gap-5'>
            <div className="card bg-base-300 w-full max-w-4xl shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-3xl mb-5">Edit Profile</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">First Name</legend>
                            <input type="text" value={firstName} className="input w-full" onChange={(e) => setFirstName(e.target.value)} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Last Name</legend>
                            <input type="text" value={lastName} className="input w-full" onChange={(e) => setLastName(e.target.value)} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Photo URL</legend>
                            <input type="text" value={photoUrl} className="input w-full" onChange={(e) => setPhotoUrl(e.target.value)} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Age</legend>
                            <input type="number" value={age} className="input w-full" onChange={(e) => setAge(parseInt(e.target.value))} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Gender</legend>
                            <select value={gender} className="input w-full" onChange={(e) => setGender(e.target.value)}>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">About</legend>
                            <textarea value={about} className="input w-full" rows={3} onChange={(e) => setAbout(e.target.value)} />
                        </fieldset>

                    </div>

                    <p className="text-red-500 mt-2">{error}</p>
                    <div className="card-actions justify-center mt-5">
                        <button className="btn btn-primary w-full md:w-1/3" onClick={saveProfile}>Update</button>
                    </div>
                </div>
            </div>
            <UserCard user={{firstName, lastName, about, photoUrl, age, gender}}/>
        </div>

        {
            showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <div>
                            <span>Profile updated successfully!</span>
                        </div>
                    </div>
                </div>
            )
        }
        </>
        
    )
}

export default EditProfile
