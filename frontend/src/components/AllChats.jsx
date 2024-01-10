import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Conversation from '../contracts/Backup.json'
import { Link } from 'react-router-dom'

const contractAddress = "0x7e58b4aCeE425A468C875f5e431E7728FD6e23b7"
const contractAbi = Conversation.abi

const AllChats = () => {
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState(null)
  const [chat1Content, setChat1Content] = useState('');
  

  useEffect(() => {
    const init = async () => {
      
      if (window.ethereum) {
        try {
          // Demander l'autorisation à l'utilisateur pour accéder à son compte Ethereum
          const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
          setAccounts(accounts)
          await window.ethereum.enable();

          const provider = new ethers.BrowserProvider(window.ethereum)
          const signer = await provider.getSigner();


          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          setContract(contract)

          // Appeler la fonction du contrat pour obtenir le contenu du chat1
          const chat1 = await contract.chat1();
          setChat1Content(chat1);
        } catch (error) {
          console.error('Erreur lors de la connexion à MetaMask :', error);
        }
      } else {
        console.error("MetaMask n'est pas installé !");
      }
    };

    init();
  }, []);

  return (
    <div>
      <h2>Page listant tous les chats</h2>
      <Link to="/chat">{chat1Content}</Link>
    </div>
  );
};

export default AllChats;
