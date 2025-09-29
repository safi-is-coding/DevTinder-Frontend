import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Shimmer from "./components/Shimmer";

import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
// import Feed from "./components/Feed"
// import Connections from "./components/Connections"
// import Requests from "./components/Requests"
import ChangePassword from "./components/ChangePassword";
import Error from "./components/Error";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import LandingPage from "./components/LandingPage";
import ConnectionShimmer from "./components/ConnectionShimmer";
import ViewProfile from "./components/ViewProfile";

const Feed = lazy(() => import("./components/Feed"));
const Connections = lazy(() => import("./components/Connections"));
const Requests = lazy(() => import("./components/Requests"));

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={<LandingPage />}
          />
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Protected Routes wrapped with Body */}
          <Route element={<Body />}>
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="/profile/view/:userId"
              element={<ViewProfile />}
            />
            <Route
              path="/feed"
              element={
                <Suspense fallback={<Shimmer />}>
                  {" "}
                  <Feed />{" "}
                </Suspense>
              }
            />
            <Route
              path="/connections"
              element={
                <Suspense fallback={<ConnectionShimmer />}>          
                  <Connections />
                </Suspense>
              }
            />
            <Route
              path="/requests"
              element={
                <Suspense fallback={<ConnectionShimmer />}>
                  {" "}
                  <Requests />{" "}
                </Suspense>
              }
            />
            
            <Route
              path="/changePassword"
              element={<ChangePassword />}
            />
            <Route
              path="/error"
              element={<Error />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
