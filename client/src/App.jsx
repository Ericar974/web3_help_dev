import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Conversation from './contracts/Conversation.json';

function App() {
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState(null);
  const [messages, setMessages] = useState([]);

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
      setContract(contract)
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

  return (
    <div>
      <h1>Conversation Contract Interaction</h1>
      {contract ? (
        <>
          <p>Contract connected: {contract.target}</p>
          <p>Accounts connected: {accounts[0]}</p>
          {messages.length > 0 && (
            <div>
              <h2>Last 10 Messages:</h2>
              <ul>
                {messages.map((message, index) => (
                  <li key={index}>{`User: ${message.user}, Content: ${message.content}, Timestamp: ${message.timestamp}`}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <p>Connecting to the contract...</p>
      )}
    </div>
  );
}

export default App;