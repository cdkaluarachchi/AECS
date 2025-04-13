import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../hooks/AuthContext';
import { useParams } from 'react-router-dom';
import bookingService from '../../services/bookingService';
import MessageInput from './MessageInput';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Chat with Counsellor</h5>
        </div>
        <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="d-flex flex-column gap-2">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`d-flex ${msg.senderId === user.id ? 'justify-content-end' : 'justify-content-start'}`}
              >
                <div
                  className={`p-2 rounded ${
                    msg.senderId === user.id ? 'bg-success text-white fw-bold' : 'bg-light text-dark'
                  }`}
                  style={{ maxWidth: '70%' }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-footer">
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
