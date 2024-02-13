/*
  npm i react-router-dom
*/

import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import Home from "./components/pages/Home"
import Lang from "./components/pages/Lang"
import Profile from "./components/pages/Profile"


function App() {

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/lang" element={<Lang />}/>
          <Route path="/profile/:id" element={<Profile />}/>

        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
