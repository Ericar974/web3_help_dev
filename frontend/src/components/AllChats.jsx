import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';


const AllChats = ({contractAddress, contractAbi}) => {
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState(null)
  const [chat1Content, setChat1Content] = useState('');

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

          // get chat 1
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
  }, [contractAddress, contractAbi]);

  return (
    <div>
      <h2>Page listant tous les chats</h2>
      <Link to="/chat">{chat1Content}</Link>
    </div>
  );
};

AllChats.propTypes = {
  contractAddress: PropTypes.string.isRequired,
  contractAbi: PropTypes.array.isRequired,
};

export default AllChats;
