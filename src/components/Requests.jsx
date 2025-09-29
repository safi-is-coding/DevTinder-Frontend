import { Check, X } from "lucide-react"; // ✅ icon imports
import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addtRequest } from '../utils/requestSlice'
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const requests = useSelector((store) => store.requests)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      })
      dispatch(addtRequest(res?.data?.data))
    } catch (error) {
      console.log(error)
    }
  } 

  const reviewRequest = async (requestId, status) => {
    const res = await axios.post(`${BASE_URL}/request/review/${status}/${requestId}`,
      {},
      { withCredentials: true}
    ).then(() => {
      fetchRequests()
    })
  }

 

  useEffect(() => {
    fetchRequests()
  }, [])

  if (!requests) return;

  if (requests.length === 0) {
    return (
      <div className="flex justify-center text-2xl">
        <h1 className="mt-20 bg-gray-700 p-5 rounded-full ">No Requests Found</h1>
      </div>
    )
  }


return (
  <div className="overflow-x-auto">
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>User</th>
          {/* <th>Age</th> */}
          <th>Actions</th>
          {/* <th>Gender</th> */}
          {/* <th>About</th> */}
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
          } = request.fromUserId;

          return (
            <tr key={_id}>
              <td>
                <div className="flex items-center gap-5">
                  <div className="avatar">
                    <div className="mask mask-squircle h-20 w-20">
                      <img src={photoUrl} className="w-20 h-20" alt="Avatar" onClick={()=> navigate(`/profile/view/${_id}`)} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{firstName + " " + lastName}</div>
                  </div>
                </div>
              </td>
              {/* <td>{age}</td> */}
              {/* <td>{gender}</td> */}
              {/* <td>{about}</td> */}
              <td>
                <div className="flex gap-2">
                  {/* Accept button */}
                  <button
                    className="btn btn-success btn-circle btn-sm"
                    onClick={() => reviewRequest(request._id, "accepted")}
                  >
                    <Check className="w-4 h-4" />
                  </button>

                  {/* Reject button */}
                  <button
                    className="btn btn-error btn-circle btn-sm"
                    onClick={() => reviewRequest(request._id, "rejected")}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

}

export default Requests

// 49.28