import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import './AllChatsStyle.css';


const AllChats = ({contractAddress, contractAbi}) => {
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState(null)
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          // access to account
          const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
          setAccounts(accounts)
          await window.ethereum.enable();
          const provider = new ethers.BrowserProvider(window.ethereum)
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          setContract(contract)

          const chat1Content = await contract.chat1();
          const chat2Content = await contract.chat2();
          const chat3Content = await contract.chat3();
          setChats([
            { id: 1, name: chat1Content },
            { id: 2, name: chat2Content },
            { id: 3, name: chat3Content },
          ]);
        } catch (error) {
          console.error('Erreur lors de la connexion à MetaMask :', error);
        }
      } else {
        console.error("MetaMask n'est pas installé !");
      }
    };
    init();
  }, [contractAddress, contractAbi]);

  return (
    <>
      <div className="allcvrst-chatpagediv">
        <h2>Liste des chats</h2>
      </div>
      <div className="allcvrst-chatlistnontainer">
        {chats.map((chat) => (
          <Link key={chat.id} to={`/chat/${chat.id}`} className="allcvrst-chatcard">
            <h3>{chat.name}</h3>
            <p>Nombre de participants: -</p>
          </Link>
        ))}
      </div>
    </>
  );
};

AllChats.propTypes = {
  contractAddress: PropTypes.string.isRequired,
  contractAbi: PropTypes.array.isRequired,
};

export default AllChats;
