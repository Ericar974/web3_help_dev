import React from 'react';
import './App.css'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
// Import les différents components
import Chat from './components/Chat'
import AllChats from './components/AllChats'
import Home from './components/Home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      <nav>
        <Link to="/">Page accueil</Link>
        <Link to="/allchats">Lists des chats</Link>
      </nav>
      <Home />
    </div>
  },
  {
    path: "/chat",
    element: <div>
      <nav>
        <Link to="/">Page accueil</Link>
        <Link to="/allchats">Lists des chats</Link>
      </nav>
      <Chat
      />
    </div>
  },
  {
    path: "/allchats",
    element: <div>
      <nav>
        <Link to="/">Page accueil</Link>
        <Link to="/allchats">Lists des chats</Link>
      </nav>
      <AllChats
      />
    </div>
  }
])

function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
