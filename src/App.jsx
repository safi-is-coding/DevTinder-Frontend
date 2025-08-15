import { BrowserRouter, Route, Routes } from "react-router-dom"

import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Feed from "./components/Feed"

function App() {
  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>} >
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/feed" element={<Feed/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
