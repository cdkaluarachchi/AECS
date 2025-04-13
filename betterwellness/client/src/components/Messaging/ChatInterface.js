import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../hooks/AuthContext';
import { useParams } from 'react-router-dom';
import bookingService from '../../services/bookingService';
import MessageInput from './MessageInput';

function ChatInterface() {
  const { counsellorId } = useParams();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await bookingService.getMessages(counsellorId);
        setMessages(data);
      } catch (err) {
        setError('Failed to fetch messages');
        console.error(err);
      }
    };

    fetchMessages();

  
  }, [counsellorId]);

  const handleSendMessage = async (text) => {
    try {
      const newMessage = await bookingService.sendMessage(counsellorId, text);
      setMessages([...messages, newMessage]);
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Chat with Counsellor</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="message-list">
        {messages.map((msg) => (
          <div key={msg._id} className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
            {msg.senderId === user.id ? <b>{msg.text}</b> : <>{msg.text}</>}
          </div>
        ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatInterface;