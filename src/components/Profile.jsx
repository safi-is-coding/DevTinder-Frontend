import React, { useState } from "react";
import { Mail, User, Calendar, Info, Star, Edit2, X } from "lucide-react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {

  const user = useSelector((store)=> store.user)
  return (
    user && (
      <EditProfile user={user}/>
    )
  )
};

export default Profile;


// time: 01:07:32