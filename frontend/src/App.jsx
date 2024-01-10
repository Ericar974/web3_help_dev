import React from 'react';
import { useEffect, useState } from 'react'
import './App.css'
import {ethers} from 'ethers'
import JavaScriptQuiz2 from './contracts/JavaScriptQuiz2.json'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
// Import les différents components
import Chat from './components/Chat'
import AllChats from './components/AllChats'
import Home from './components/Home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
        <Home/>
        <nav>
        <Link to="/">Page accueil</Link>
        <Link to="/allchats">Lists des chats</Link>
        <Link to="/chat">Chat</Link>
      </nav>
      </div>
  },
  {
    path: "/chat",
    element: <div>
      <Chat/>
      <nav>
        <Link to="/">Page accueil</Link>
        <Link to="/allchats">Lists des chats</Link>
        <Link to="/chat">Chat</Link>
      </nav>
    </div>
  },
  {
    path: "/allchats",
    element: <div>
      <AllChats/>
      <nav>
        <Link to="/">Page accueil</Link>
        <Link to="/allchats">Lists des chats</Link>
        <Link to="/chat">Chat</Link>
      </nav>
    </div>
  }
])

function App() {
  const [account, setAccount] = useState([])
  const [contract, setContract] = useState(null)
  const [question, setQuestion] = useState('')
  const [answers, setAnswers] = useState([])
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  useEffect(()=>{
    initWeb3()
  }, [])

  useEffect(() => {
    if (contract){
      // On écoute les événements émis par le smart contract
      contract.on("CorrectAnswer", (details) => {
        alert("Bonne réponse : " + details);
        console.log("Bonne réponse : ", details);
      });

      contract.on("WrongAnswer", (details) => {
        alert("Mauvaise réponse : " + details);
        console.log("Mauvaise réponse : ", details);
      });
    }
  }, [contract])

  async function initWeb3() {
    //const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    const contractAddress = "0x404A751C911C97b8C8b11484A9e931c81f82972d"
    const contractABI = JavaScriptQuiz2.abi

    try {
      // On se connecte au wallet de l'utilisateur
      const account = await window.ethereum.request({method: "eth_requestAccounts"})
      setAccount(account)
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer)
      setContract(contract)

      // On récupère les données du smart contract (Question et réponses)
      const question = await contract.question()
      let contractAnswers = []
      for (let i = 0; i < 4; i++) {
        contractAnswers.push(await contract.choices(i))
      }
      setAnswers(contractAnswers)
      setQuestion(question)
    }catch (error){
      console.error(error)
    }
  }

  async function handleSubmit() {
    try {
      // On soumet la réponse de l'utilisateur au contrat
      await contract.answerQuiz(input)
      setError('')
    } catch (error) {
      setError(error.reason)
    }
  }

  return (
    <>

<header>
  <div className="header_logo">
    <img className="logo" src="../src/assets/logo.png"></img>

    <h2>Current account : {account[0]}</h2>  
  </div>
  </header>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
 