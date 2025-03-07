// ChatBot.js
import React, { useState, useEffect, useRef } from 'react';
import '../styles/ChatBot.css'; // Corrected import path

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Knowledge base for the chatbot
  const knowledgeBase = {
    "greeting": {
      "response": "👋 Hello! I'm your FillGuard assistant. How can I help you today?",
      "quickReplies": ["How to install", "Troubleshooting", "Battery issues", "Connectivity problems", "Warranty info"]
    },
    // ... (rest of the knowledge base)
  };

  // Find the best match for user input
  const findBestMatch = (userInput) => {
    userInput = userInput.toLowerCase();
    // Check for exact matches first
    for (const key in knowledgeBase) {
      if (userInput.includes(key)) {
        return knowledgeBase[key];
      }
    }
    // Check for partial matches
    for (const key in knowledgeBase) {
      const words = key.split(' ');
      for (const word of words) {
        if (word.length > 3 && userInput.includes(word)) {
          return knowledgeBase[key];
        }
      }
    }
    // Default response if no match found
    return knowledgeBase.default;
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat with greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(knowledgeBase.greeting.response, knowledgeBase.greeting.quickReplies);
      }, 500);
    }
  }, [isOpen]);

  // Add a bot message to the chat
  const addBotMessage = (text, quickReplies = []) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { type: 'bot', text, quickReplies }
    ]);
  };

  // Add a user message to the chat
  const addUserMessage = (text) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { type: 'user', text }
    ]);
  };

  // Handle user message
  const handleUserMessage = (text) => {
    addUserMessage(text);
    setInputValue('');
    // Find best response
    const response = findBestMatch(text);
    // Add bot response after a short delay
    setTimeout(() => {
      addBotMessage(response.response, response.quickReplies);
    }, 500);
  };

  // Handle input submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputValue.trim();
    if (userMessage) {
      handleUserMessage(userMessage);
    }
  };

  // Handle quick reply click
  const handleQuickReply = (reply) => {
    handleUserMessage(reply);
  };

  // Toggle chat open/closed
  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  // Toggle chat collapsed/expanded
  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <>
      {!isOpen && (
        <button 
          className="chat-button" 
          onClick={toggleChat}
          aria-label="Open chat support"
        >
          💬
        </button>
      )}
      
      {isOpen && (
        <div className={`chat-container ${isCollapsed ? 'collapsed' : ''}`}>
          <div className="chat-header">
            <span>FillGuard Support</span>
            <div>
              <button 
                className="toggle-chat-button" 
                onClick={toggleCollapse}
                aria-label={isCollapsed ? "Expand chat" : "Collapse chat"}
              >
                {isCollapsed ? '+' : '−'}
              </button>
              <button 
                className="close-chat-button" 
                onClick={toggleChat}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index}>
                <div className={`message ${message.type}-message`}>
                  {message.text.split('\n').map((text, i) => (
                    <React.Fragment key={i}>
                      {text}
                      {i !== message.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
                
                {message.quickReplies && message.quickReplies.length > 0 && (
                  <div className="quick-replies">
                    {message.quickReplies.map((reply, replyIndex) => (
                      <span 
                        key={replyIndex} 
                        className="quick-reply"
                        onClick={() => handleQuickReply(reply)}
                      >
                        {reply}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chat-input-container" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your question here..."
              aria-label="Type your message"
            />
            <button type="submit" aria-label="Send message">Send</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
