import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Conversation from './contracts/Conversation.json';
import './App.css';

function App() {
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState(null);
  const [messages, setMessages] = useState([]);
  const [date, setDate] = useState([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    initWeb3();
  }, []);

  useEffect(() => {
    if (contract){
      getMessages();
    }
  }, [contract])

  async function initWeb3() {
    const contractAddress = '0xA483ae4B1ecf8A725fB04a40BeF10207f49e851E'
    const contractABI = Conversation.abi

    try {
      const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
      setAccounts(accounts)
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer)
      console.log("Contract Interface:", contract.interface.fragments);
      setContract(contract);
    } catch (error) {
      console.error('Error initializing web3:', error);
    }
  }

  async function getMessages() {
    try {
      const messages = await contract.getLast10MessagesFromAllUsers();
      setMessages(messages);
      console.log("Messages:", messages);
    } catch (error) {
      console.error('Error getting messages from contract:', error);
    }
  }

  async function handleSubmit() {
    try {
      await contract.postMessage(content)
      setError('')
    } catch (error) {
      setError(error.reason)
    }
  }

  return (
    <div className='cvrst-chat'>
      <div className='cvrst-title'>
        <h1>Conversation</h1>
      </div>
      {contract ? (
        <>{/*
            <div>
              <p><b>Vous êtes connecté au contrat:</b> {contract.target}</p>
              <p><b>Compte connecté:</b> {accounts[0]}</p>
            </div>
          */}
          {messages.length > 0 && (
            <div>
              <h2>Last 10 Messages:</h2>
              <ul>
                {messages.map((message, index) => (
                  <li key={index}>
                    {message.user !== "0x0000000000000000000000000000000000000000" ? (
                      <>
                        {`User: ${message.user}`} <br />
                        {`Content: ${message.content}`} <br />
                        {`Date d'envoie: ${message.timestamp}`} <br /><br />
                      </>
                    ) : (
                      "Utilisateur Non valide"
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <input type="text" placeholder="Your message" value={content} onChange={(e) => setContent(e.target.value)}/>
          <button onClick={handleSubmit}>Submit</button>
        </>
      ) : (
        <p>Connecting to the contract...</p>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;