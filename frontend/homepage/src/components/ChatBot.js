// ChatBot.js
import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Form, Card, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ChatBot.css'; // Keep your custom styling

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Knowledge base for fallback responses
  const fallbackResponses = {
    "default": {
      "response": "I'm not sure I understand. Could you rephrase that?",
      "quickReplies": ["How to install", "Troubleshooting", "Contact support"]
    },
    "greeting": {
      "response": "👋 Hello! I'm your FillGuard assistant. How can I help you today?",
      "quickReplies": ["How to install", "Troubleshooting", "Battery issues", "Connectivity problems", "Warranty info"]
    }
  };

  const knowledgeBase = {
    "install": {
      "response": "To install your FillGuard device, follow these steps: 1) Unbox the device, 2) Charge fully, 3) Download our app, 4) Follow in-app instructions to connect.",
      "quickReplies": ["Installation issues", "App download", "Device not connecting"]
    },
    "battery": {
      "response": "FillGuard batteries typically last 2-3 days on a full charge. Charging takes about 2 hours from empty to full.",
      "quickReplies": ["Battery issues", "Charging problems", "Power saving tips"]
    },
    // Add more entries for common questions
  };
  
  const checkLocalKnowledge = (userInput) => {
    const input = userInput.toLowerCase();
    
    for (const key in knowledgeBase) {
      if (input.includes(key)) {
        return knowledgeBase[key];
      }
    }
    
    return null; // No local match found
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
        addBotMessage(fallbackResponses.greeting.response, fallbackResponses.greeting.quickReplies);
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

  // Fetch response from OpenAI API
  const fetchOpenAIResponse = async (userMessage) => {
    setIsLoading(true);
    try {
      // Only send the last 3 messages to save tokens
      const recentMessages = messages.slice(-3).map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // Make sure to use a model available in free tier
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant for FillGuard devices. Keep responses very brief.'
            },
            ...recentMessages,
            { role: 'user', content: userMessage }
          ],
          max_tokens: 60, // Reduced for free tier
          temperature: 0.7
        })
      });
  
      // Handle potential rate limiting
      if (response.status === 429) {
        console.log('Rate limit reached');
        return "I'm processing too many requests right now. Please try again in a moment.";
      }
  
      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content;
      } else {
        return fallbackResponses.default.response;
      }
    } catch (error) {
      console.error('Error fetching from OpenAI:', error);
      // Improved error handling for free tier issues
      if (error.message.includes('429')) {
        return "I've reached my request limit. Please try again later.";
      }
      return fallbackResponses.default.response;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user message
  const handleUserMessage = async (text) => {
    addUserMessage(text);
    setInputValue('');
    
    // First check if we can answer locally
    const localAnswer = checkLocalKnowledge(text);
    
    if (localAnswer) {
      // Use local knowledge base to save API calls
      addBotMessage(localAnswer.response, localAnswer.quickReplies);
    } else {
      // Fall back to OpenAI
      const aiResponse = await fetchOpenAIResponse(text);
      
      // Generate quick replies as before
      let quickReplies = ['Tell me more', 'Troubleshooting', 'Contact support'];
      
      // Add bot response
      addBotMessage(aiResponse, quickReplies);
    }
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
        <Button 
          className="chat-button" 
          onClick={toggleChat}
          aria-label="Open chat support"
          variant="warning"
        >
          💬
        </Button>
      )}
      
      {isOpen && (
        <Card className={`chat-container ${isCollapsed ? 'collapsed' : ''}`}>
          <Card.Header className="chat-header">
            <span>FillGuard Support</span>
            <div>
              <Button 
                variant="link"
                className="toggle-chat-button" 
                onClick={toggleCollapse}
                aria-label={isCollapsed ? "Expand chat" : "Collapse chat"}
              >
                {isCollapsed ? '+' : '−'}
              </Button>
              <Button 
                variant="link"
                className="close-chat-button" 
                onClick={toggleChat}
                aria-label="Close chat"
              >
                ✕
              </Button>
            </div>
          </Card.Header>
          
          <Card.Body className="chat-messages p-3">
            {messages.map((message, index) => (
              <div key={index} className="mb-3">
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
                      <Button 
                        key={replyIndex} 
                        variant="outline-success"
                        size="sm"
                        className="quick-reply me-2 mt-2"
                        onClick={() => handleQuickReply(reply)}
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="text-center my-2">
                <Spinner animation="border" variant="warning" size="sm" />
                <span className="ms-2">Thinking...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </Card.Body>
          
          <Card.Footer className="p-2">
            <Form onSubmit={handleSubmit} className="d-flex">
              <Form.Control
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question here..."
                aria-label="Type your message"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                variant="warning" 
                className="ms-2"
                disabled={isLoading}
              >
                Send
              </Button>
            </Form>
          </Card.Footer>
        </Card>
      )}
    </>
  );
};

export default ChatBot;