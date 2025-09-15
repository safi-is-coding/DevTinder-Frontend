import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useEffect, useState } from 'react'
import { addConnections } from '../utils/connectionSlice'
import { useDispatch, useSelector } from 'react-redux'

const Connections = () => {

    const dispatch = useDispatch()

    const connections = useSelector((store)=> store.connections)
    
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL+ "/user/connections", {
                withCredentials: true
            })            
            // console.log(res?.data?.data);
            dispatch(addConnections(res?.data?.data))

        } catch (error) {
            console.error(err)
        }

    }

    useEffect(()=> {
        fetchConnections()
    }, [])

    if (!connections){
        return 
    }

    if(connections.length === 0){
        return (
        <>
            <div className="flex justify-center text-2xl">
                <h1 className="mt-20 bg-gray-700 p-5 rounded-full ">No Connections Found</h1>
            </div>
        </>)
    }


        return(
            <div className="overflow-x-auto">
            <table className="table"> 
                {/* head */}
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>About</th>
                </tr>
                </thead>
                <tbody>
                    {
                        connections.map((connection) => {

                            const {_id, firstName, lastName, photoUrl, age, gender, about} = connection

                            return(
                                
                                
                                <tr key={_id}>
                                <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                        src={photoUrl}
                                        alt="Avatar" />
                                    </div>
                                    </div>
                                    <div>
                                    <div className="font-bold">{firstName + " " + lastName}</div>
                                    {/* <div className="text-sm opacity-50">China</div> */}
                                    </div>
                                </div>
                                </td>
                                <td>
                                {age}
                                </td>
                                <td>{gender}</td>
                                <td>{about}</td>
                                
                            </tr>
                                
                            )
                        }   
                        )
                    }
       
                </tbody>
            </table>
            </div>
        )
}

export default Connections


// part 4  = 47.42