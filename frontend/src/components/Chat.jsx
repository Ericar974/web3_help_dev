import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import './ChatStyle.css';
import { useParams } from 'react-router-dom';

const Chat = ({ contractAddress, contractAbi }) => {
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [password, setPassword] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { id: chatId } = useParams();  // Utilisez le paramètre d'URL chatId directement

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          setAccounts(accounts);
          await window.ethereum.enable();
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          setContract(contract);

          // Access to the chat?
          let hasAccess = false;
          if(chatId == 1){
            hasAccess = await contract.accessChat1(accounts[0]);
          }else if( chatId == 2){
            hasAccess = await contract.accessChat2(accounts[0]);
          }else if( chatId == 3){
            hasAccess = await contract.accessChat3(accounts[0]);
          }else{
            hasAccess = false;
          }
          setHasAccess(hasAccess);

          // If it's, show 10 last messages
          if (hasAccess) {
            var latestMessages;
            if(chatId == 1){
              latestMessages = await contract.getChat1Last10Messages();
    
            }else if( chatId == 2){
              latestMessages = await contract.getChat2Last10Messages();
    
            }else if( chatId == 3){
              latestMessages = await contract.getChat3Last10Messages();
            }else{
              console.error('chatId introuvable');
            }
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
  }, [contractAddress, contractAbi, chatId]);

  // Password form
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      if(chatId == 1){
        await contract.EnterChat1(password);

      }else if( chatId == 2){
        await contract.EnterChat2(password);

      }else if( chatId == 3){
        await contract.EnterChat3(password);
      }else{
        console.error('chatId introuvable');
      }

      // Show if has access to the chat now
      let hasAccess = hasAccess;
      if(chatId == 1){
        hasAccess = await contract.accessChat1(accounts[0]);
      }else if( chatId == 2){
        hasAccess = await contract.accessChat2(accounts[0]);
      }else if( chatId == 3){
        hasAccess = await contract.accessChat3(accounts[0]);
      }else{
        hasAccess = false;
      }
      setHasAccess(hasAccess);

      if (hasAccess) {
        var latestMessages;
        if(chatId == 1){
          latestMessages = await contract.getChat1Last10Messages();

        }else if( chatId == 2){
          latestMessages = await contract.getChat2Last10Messages();

        }else if( chatId == 3){
          latestMessages = await contract.getChat3Last10Messages();
        }else{
          console.error('chatId introuvable');
        }
        setMessages(latestMessages);
      }
    } catch (error) {
      console.error('Erreur lors de la tentative d\'entrée dans le chat :', error);
    }
  };

  // New message
  const handleNewMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      
      if(chatId == 1){
        await contract.chat1PostMessage(newMessage);
      }else if( chatId == 2){
        await contract.chat2PostMessage(newMessage);
      }else if( chatId == 3){
        await contract.chat3PostMessage(newMessage);
      }else{
        console.error('chatId introuvable');
      }

      var latestMessages;
        if(chatId == 1){
          latestMessages = await contract.getChat1Last10Messages();

        }else if( chatId == 2){
          latestMessages = await contract.getChat2Last10Messages();

        }else if( chatId == 3){
          latestMessages = await contract.getChat3Last10Messages();
        }else{
          console.error('chatId introuvable');
        }
      setMessages(latestMessages);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du nouveau message :', error);
    }
  };

  return (
    <div>
      <div className="cvrst-chatpagediv">
        <h2>Chat Page</h2>
      </div>
      {!hasAccess ? (
      <div className="chat_page_front">
        <form onSubmit={handlePasswordSubmit}>
          <label>
            Mot de passe :
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Se connecter</button>
        </form>
        <div className="image_side">
      </div>
        </div>
      ) : (
        <>
          <div className="cvrst-chatpagemessages">
            <div className="cvrst-chatborder"></div>
            <div className="cvrst-chatpagecontent">
            {messages.map((message, index) => ( message.user !== "0x0000000000000000000000000000000000000000" ? (
                <div className={`${message.user.toLowerCase() === accounts[0] ? "cvrst-messageContainerUser" : "cvrst-messageContainer"}`} key={index}>
                  <div className={`${message.user.toLowerCase() === accounts[0] ? "cvrst-messageUser" : "cvrst-message"}`}>
                    {message.user.toLowerCase()} <br />
                    {message.content} <br />
                    {message.timestamp}
                  </div>
                </div>
                ) : null
              ))}
            </div>
            <div className="cvrst-chatborder"></div>
          </div>
          <form onSubmit={handleNewMessageSubmit}>
            <div className='cvrst-chatInteractions'>
              <input className="cvrst-messsageInput" type="text" placeholder="Votre message" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
              <button className="cvrst-submitInput" type="submit">Envoyer</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

Chat.propTypes = {
  contractAddress: PropTypes.string.isRequired,
  contractAbi: PropTypes.array.isRequired,
};

export default Chat;