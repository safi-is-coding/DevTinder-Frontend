import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addFeed} from "../utils/feedSlice"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {BASE_URL} from "../utils/constants"
import UserCard from './UserCard'

const Feed = () => {
  
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getFeed = async () => {

    if(feed) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {withCredentials: true})
      dispatch(addFeed(res?.data?.data))
    } catch (error) {
      console.log(error);
      navigate("/error")
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  if(!feed) return

  if(feed.length === 0){
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <h2 className="text-2xl font-bold mb-4">No more users to show</h2>
        <p className="text-gray-600">Check back later for more profiles!</p>
      </div>
    )
  }

  return feed && (
    <>
      <UserCard user={feed[0]} />
    </>
  )
}

export default Feed