import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { removeUser } from '../utils/userSlice'

const NavBar = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true })
      dispatch(removeUser())
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="navbar bg-base-300 shadow-sm px-4 sm:px-6 lg:px-10 flex flex-wrap">
      {/* Left Logo */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-lg sm:text-xl">
          🤖 DevTinder
        </Link>
      </div>

      {/* Right Section */}
      {user && (
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Welcome message (wraps nicely on mobile) */}
          <p className="text-sm sm:text-base text-center sm:text-left">
            Welcome, <b>{user.firstName}</b>
          </p>

          {/* Dropdown Avatar */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User avatar" src={user.photoUrl} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] w-52 p-2 shadow bg-base-100 rounded-box"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/feed">Feed</Link></li>
              <li><Link to="/connections">Connections</Link></li>
              <li><Link to="/requests">Requests</Link></li>
              <li><Link to="/changePassword">Change Password</Link></li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavBar
