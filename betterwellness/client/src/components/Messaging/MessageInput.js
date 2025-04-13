import React, { useState } from 'react';

function MessageInput({ onSendMessage }) {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageInput;