import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import {BASE_URL} from "../utils/constants"
import { removeUserFromFeed } from "../utils/feedSlice"
import { useLocation } from 'react-router-dom';

function UserCard({user}) {

  const dispatch = useDispatch()
  const routeLocaton = useLocation()

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`,
        {},
        {withCredentials:true}
      )

      dispatch(removeUserFromFeed(user?._id))

    } catch (error) {
      console.log(error);
    }
  }

  const isProfilePage = routeLocaton.pathname.includes("/profile")

  return (
    <div>
      <div className="flex items-center justify-center mt-15">
        <div className="relative w-80 h-[28rem] rounded-2xl shadow-xl overflow-hidden ">
          {/* Image */}
          <img
            src={user?.photoUrl}
            alt="Shoes"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>


          {/* Card Content */}
          <div className="absolute bottom-0 w-full p-5 text-white">
            <h2 className="text-2xl font-bold">{user.firstName + " " + user.lastName}</h2>
            <h4>{user.age}, {user.gender}</h4>
            <p className="text-sm opacity-90">
              {user.about}
            </p>

            {/* Actions */}
            <div className="flex justify-center gap-5 mt-4">
              {/* Dislike Button */}
              <button 
                className="btn btn-circle bg-red-500 hover:bg-red-600 border-none text-white shadow-lg cursor-pointer"
                onClick={() => handleSendRequest("ignore", user._id)}
                disabled={isProfilePage}  
              >
                ✕
              </button>

              {/* Like Button */}
              <button 
                className="btn btn-circle bg-green-500 hover:bg-green-600 border-none text-white shadow-lg cursor-pointer"
                onClick={() => handleSendRequest("interested", user._id)}  
                disabled={isProfilePage}
              >
                ❤
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default UserCard