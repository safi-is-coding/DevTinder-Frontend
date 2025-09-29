import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";

function ViewProfile() {
  const { userId } = useParams();
  const [showSkills, setShowSkills] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const fetchProfileData = async (userId) => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view/${userId}`);
      setProfileData(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProfileData(userId);
  }, [userId]);

  if (!profileData)
    return <div className="text-center mt-10">
        <Shimmer/>
    </div>;

  return (
    <div className="w-full flex justify-center mt-10 mb-30">
      <div className="card bg-amber-100 shadow-sm text-black rounded-2xl">
        <figure>
          <img
            src={profileData?.photoUrl}
            alt="profile-pic"
            className="w-60 h-60 rounded-full mt-5 object-cover"
          />
        </figure>
        <div className="card-body w-80 p-5">
          <div className="w-full flex items-center gap-2">
            <h2 className="card-title">
              {profileData?.firstName} {profileData?.lastName}
            </h2>
            <h2 className="text-gray-500">({profileData?.age})</h2>
            <p>{profileData?.gender === "male" ? "♂️" : "♀️"}</p>
          </div>
          <p className="mt-2">{profileData?.about}</p>

          <button
            className="btn btn-secondary mt-2 rounded-2xl"
            onClick={() => setShowSkills(prev => !prev)}
          >
            {showSkills ? "Hide Skills" : "Show Skills"}
          </button>

          {showSkills && (
            <div className="mt-2 flex flex-wrap gap-2 justify-center">
              {profileData?.skills?.length === 0
                ? "No Skills"
                : profileData.skills.map(skill => (
                    <span
                      key={skill}
                      className="bg-violet-400 text-white px-5 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
