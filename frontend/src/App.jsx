import React from 'react';
import './App.css'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
// Import les différents components
import Chat from './components/Chat'
import AllChats from './components/AllChats'
import Home from './components/Home'
import ChatContract from './contracts/Chat.json'

const contractAddress = "0xc7Cc02e8cBfEfc28461C2657C3F86C1944316469"
const contractAbi = ChatContract.abi

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

      <Home />
    </div>
  },
  {
    path: "/chat/:id",
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
      <RouterProvider router={router} />
    </>
  )
}

export default App
