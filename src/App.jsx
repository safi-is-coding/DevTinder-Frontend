import { BrowserRouter, Route, Routes } from "react-router-dom"

import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Feed from "./components/Feed"
import Connections from "./components/Connections"
import Requests from "./components/Requests"
import ChangePassword from "./components/ChangePassword"
import Error from "./components/Error"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import LandingPage from "./components/LandingPage"

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes wrapped with Body */}
          <Route element={<Body />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/error" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
