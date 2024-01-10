import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';

const Chat = ({contractAddress, contractAbi}) => {
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState(null)
  const [password, setPassword] = useState('');
  const [hasAccess, setHasAccess] = useState(false); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          //connect to account
          const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
          setAccounts(accounts)
          const provider = new ethers.BrowserProvider(window.ethereum)
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          setContract(contract)

          // Access to the chat ?
          const hasAccess = await contract.accessChat1(accounts[0]);
          setHasAccess(hasAccess);

          // if it's, show 10last message
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

  // password form
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await contract.EnterChat1(password);
      // show if has access to the chat now
      const hasAccess = await contract.accessChat1(accounts[0]);
      setHasAccess(hasAccess);

      if (hasAccess) {
        const latestMessages = await contract.Chat1GetLast10MessagesFromAllUsers();
        setMessages(latestMessages);
      }
    } catch (error) {
      console.error('Erreur lors de la tentative d\'entrée dans le chat :', error);
    }
  };

  // new message
  const handleNewMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      await contract.chat1PostMessage(newMessage);

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

Chat.propTypes = {
  contractAddress: PropTypes.string.isRequired,
  contractAbi: PropTypes.array.isRequired,
};

export default Chat;