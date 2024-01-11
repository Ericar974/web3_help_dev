import React from 'react';
import './App.css'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
// Import les différents components
import Chat from './components/Chat'
import AllChats from './components/AllChats'
import Home from './components/Home'
import Conversation from './contracts/Conversation.json'

const contractAddress = "0x7329D7c384C9c5c1f4f520Ba4d3E9e86aF66B638"
const contractAbi = Conversation.abi

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      <nav className="nav">
        <div>
          
  <div className="header_logo">
    <img className="logo" src="../src/assets/logo.png"></img>
  </div>
          <Link to="/" className="nav-link" activeClassName="current">
            Page accueil
          </Link>
          <Link to="/allchats" className="nav-link" activeClassName="current">
            Lists des chats
          </Link>
        </div>
      </nav>

      <Home/>
      </div>
  },
  {
    path: "/chat",
    element: <div>

      <Chat contractAddress={contractAddress} contractAbi={contractAbi}
      />
    </div>
  },
  {
    path: "/allchats",
    element: <div>
      <nav className="nav">
        <div>
          
  <div className="header_logo">
    <img className="logo" src="../src/assets/logo.png"></img>
  </div>
          <Link to="/" className="nav-link" activeClassName="current">
            Page accueil
          </Link>
          <Link to="/allchats" className="nav-link" activeClassName="current">
            Lists des chats
          </Link>
        </div>
      </nav>

      <AllChats contractAddress={contractAddress} contractAbi={contractAbi}
      />
    </div>
  }
])

function App() {


  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
