import React from 'react'
import { useSelector } from 'react-redux'

const NavBar = () => {

  const user = useSelector((store)=> store.user)
  // console.log(user);

  return (
    <>
        <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">🤖 DevTinder</a>
        </div>
        <div className="flex gap-2">
        
        {user && (<div className="dropdown dropdown-end mx-5 flex gap-2 items-center">
            <p>Welcome, <b>{user.firstName} {user.lastName}</b></p>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full flex">
                <img
                  alt="Profile"
                  src={user.photoUrl} />
              </div>
            </div>
          
          </div>)}
        </div>
      </div>

    </>
  )
}

export default NavBar