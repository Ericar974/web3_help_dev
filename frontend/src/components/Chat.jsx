import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Conversation from '../contracts/Conversation.json'

const contractAddress = "0x7e58b4aCeE425A468C875f5e431E7728FD6e23b7"
const contractAbi = Conversation.abi

const Chat = () => {
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState(null)
  const [password, setPassword] = useState('');
  const [hasAccess, setHasAccess] = useState(false);  // Nouvel état pour hasAccess
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
          setAccounts(accounts)

          const provider = new ethers.BrowserProvider(window.ethereum)
          const signer = await provider.getSigner();

          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          setContract(contract)

          // Appeler la fonction du contrat pour vérifier l'accès au chat
          const hasAccess = await contract.accessChat1();
          setHasAccess(hasAccess);

          // Si l'accès est autorisé, récupérer les 10 derniers messages
          if (hasAccess) {
            const latestMessages = await contract.Chat1GetLast10MessagesFromAllUsers();
            setMessages(latestMessages);
          }
        } catch (error) {
          console.error('Erreur lors de la connexion à MetaMask :', error);
        }
      } else {
        console.error("MetaMask n'est pas installé !");
      }
    };

    init();
  }, [contractAddress, contractAbi]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await contract.EnterChat1(password);
      // Vérifier à nouveau l'accès au chat après la tentative d'entrée
      const hasAccess = await contract.accessChat1();
      setHasAccess(hasAccess);

      // Si l'accès est autorisé, récupérer les 10 derniers messages
      if (hasAccess) {
        const latestMessages = await contract.Chat1GetLast10MessagesFromAllUsers();
        setMessages(latestMessages);
      }
    } catch (error) {
      console.error('Erreur lors de la tentative d\'entrée dans le chat :', error);
    }
  };

  const handleNewMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      await contract.chat1PostMessage(newMessage);

      // Rafraîchir les messages après l'envoi d'un nouveau message
      const latestMessages = await contract.Chat1GetLast10MessagesFromAllUsers();
      setMessages(latestMessages);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du nouveau message :', error);
    }
  };

  return (
    <div>
      <h2>Chat Page</h2>
      {!hasAccess ? (
        <form onSubmit={handlePasswordSubmit}>
          <label>
            Mot de passe :
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Se connecter</button>
        </form>
      ) : (
        <div>
          <h3>Messages</h3>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{`${msg.user}: ${msg.content}`}</li>
            ))}
          </ul>
          <form onSubmit={handleNewMessageSubmit}>
            <label>
              Nouveau message :
              <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            </label>
            <button type="submit">Envoyer</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;