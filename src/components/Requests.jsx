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
      dispatch(addtRequest(res?.data?.data.reverse()))
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
    <h2 className="text-1xl font-bold mb-5 text-gray-300 m-5 text-center border-amber-200 border-2 p-2 rounded-full">Total Requests: {requests.length}</h2>
    <table className="table mb-30">
      {/* head */}
      <thead>
        <tr className="text-center">
          <th>User</th>
          <th>Request Received On</th>
          <th>Actions</th>
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
            <tr key={_id} className="text-center">
              <td>
                <div className="flex items-center gap-5 flex-col">
                  <div className="avatar">
                    <div className="mask mask-squircle h-20 w-20 ">
                      <img src={photoUrl} className="w-20 h-20" alt="Avatar" onClick={()=> navigate(`/profile/view/${_id}`)} />
                    </div>
                  </div>
                  <div>
                      <h2 className="font-bold">{firstName + " " + lastName}</h2>
                  </div>
                </div>
              </td>
              <td>
                {isNaN(new Date(request.requestTime).getTime()) 
                  ? "Not Recorded" 
                  : new Date(request.requestTime).toLocaleDateString()}
              </td>

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