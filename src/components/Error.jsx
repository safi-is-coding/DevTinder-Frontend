import React from "react";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Error = ({ message = "Something went wrong. Please try again later." }) => {

  const navigate = useNavigate()

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-red-100">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Oops!
          </h1>
          <p className="text-gray-600">{message}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 w-full rounded-xl bg-red-500 px-4 py-2 text-white font-medium shadow-md hover:bg-red-600 transition duration-200"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
