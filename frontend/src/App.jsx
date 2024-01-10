import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import JavaScriptQuiz2 from './contracts/JavaScriptQuiz2.json';

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
<div className="homepage">
  <header>
    <h1>ChatCrypt</h1>
    <p>Une messagerie sécurisée basée sur la technologie Web3.</p>
  </header>
  <main>
    <div className='bg_hp_header'> </div>
    <div className="main">
      <section className="instructions">
        <h2>Comment utiliser l'application :</h2>
        <div class="steps">
          <div class="container_number_steps">
            <div class="numbers_steps">1</div>
            <div class="numbers_content">Connectez-vous de maniére sécurisée.</div>
          </div>
          <div class="container_number_steps">
            <div class="numbers_steps">2</div>
          <div class="numbers_content">Commencez à chatter de manière confidentielle.</div>
          </div>
          <div class="container_number_steps">
            <div class="numbers_steps">3</div>
          <div class="numbers_content">Explorez les fonctionnalités de sécurité avancées.</div>
          </div>
        </div>
      </section>

      <section className="visuals">
      <h2>Nos valeurs :</h2>
      <div class="container_values">
        <div className='values'>
          <div className="confiance">
            <div>La confiance</div>
          </div>
        </div>
        <div className='values'>
          <div className="securite">
            <div>La sécurité</div>
          </div>
        </div>
        <div className='values'>
          <div className="discretion">
            <div>La discrétion</div>
          </div>
        </div>
      </div>
    </section>


    <section className="testimonials">
      <h2>Ce que nos utilisateurs disent :</h2>
      <div className="testimonial">
        <p>"Une expérience de messagerie vraiment sécurisée. J'adore!"</p>
        <p>- Alice</p>
      </div>
    </section>

    <section className="web3-presentation">
      <h2>Explorez le Web3 avec ChatCrypt :</h2>
      <p>Découvrez comment nous utilisons la technologie Web3 pour garantir la confidentialité de vos messages.</p>
    </section>

    <section className="about-us">
      <h2>À propos de ChatCrypt :</h2>
      <p>Notre mission est de fournir une plateforme de messagerie sécurisée qui respecte votre vie privée.</p>
    </section>

    <footer className="social-media">
      <h2>Rejoignez-nous sur les réseaux sociaux :</h2>
      <div className="social-icons">
        <a href="lien-vers-votre-page-facebook"><img src="icone-facebook.png" alt="Facebook" /></a>
        <a href="lien-vers-votre-page-twitter"><img src="icone-twitter.png" alt="Twitter" /></a>
      </div>
    </footer>
  </div>
</main>
</div>


  </>
  )
}

export default App
 