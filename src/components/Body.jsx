import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userData = useSelector((store) => store.user);

  // Check if current route is landing page
  const isLandingPageRoute = location.pathname.includes("/landingPage");

  useEffect(() => {
    const fetchUser = async () => {
      // Skip API call if user already exists
      if (userData) return;

      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data.data));
      } catch (error) {
        
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUser();
  }, [dispatch, navigate, userData]);

  return (
    <>
      {/* Show NavBar and Footer only if not on landing page */}
      {!isLandingPageRoute && <NavBar />}
      <Outlet />
      {!isLandingPageRoute && <Footer />}
    </>
  );
};

export default Body;
