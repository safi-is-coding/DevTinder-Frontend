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

  return feed && (
    <>
      <UserCard user={feed[0]} />
    </>
  )
}

export default Feed