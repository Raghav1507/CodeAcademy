import React, { useState, useEffect } from 'react';
import './ChatBot.css';
import { Link } from 'react-router-dom';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking'); // 'checking', 'working', 'failed'
  const [errorMessage, setErrorMessage] = useState('');

  // Fallback responses for common coding questions
  const fallbackResponses = {
    "how do i debug javascript code?": "To debug JavaScript code, you can use console.log() to print values, use the browser's developer tools (F12), set breakpoints, and use the debugger statement. The Chrome DevTools are particularly helpful for debugging.",
    "explain react hooks": "React Hooks are functions that let you use state and other React features in functional components. Common hooks include useState (for state management), useEffect (for side effects), useContext (for context), and useRef (for refs). They were introduced in React 16.8.",
    "what is async/await?": "Async/await is a JavaScript feature that makes working with Promises easier. The 'async' keyword is used to define an asynchronous function, and 'await' is used to pause execution until a Promise resolves. It makes asynchronous code look and behave more like synchronous code.",
    "default": "I'm having trouble connecting to the AI service. Here's a general tip: When coding, it's important to break down complex problems into smaller, manageable parts. Start with a clear plan, write clean code with good comments, and test your code frequently."
  };

  // Check API status on component mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: "Hello"
          })
        });
        
        const data = await response.json();
        console.log('API Status Check Response:', data);
        
        if (data.status === 'success') {
          setApiStatus('working');
        } else {
          setApiStatus('failed');
          setErrorMessage(data.error || 'API response format is unexpected');
        }
      } catch (error) {
        console.error('API Status Check Error:', error);
        setApiStatus('failed');
        setErrorMessage(error.message || 'Failed to connect to the API');
      }
    };
    
    checkApiStatus();
  }, []);

  const getFallbackResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    // Check if we have a specific response for this question
    for (const key in fallbackResponses) {
      if (lowerQuestion.includes(key)) {
        return fallbackResponses[key];
      }
    }
    
    // Return default response if no match
    return fallbackResponses.default;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // If API is not working, use fallback immediately
    if (apiStatus !== 'working') {
      const fallbackResponse = getFallbackResponse(inputMessage);
      const botMessage = {
        text: fallbackResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      return;
    }

    try {
      // Using our Flask backend service
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage
        })
      });

      const data = await response.json();
      console.log('API Response:', data);
      
      // Check if the response has the expected structure
      if (data.status !== 'success') {
        throw new Error(data.error || 'Unexpected response format from API');
      }
      
      // Extract the response text
      const botResponse = data.response;
      
      // Add bot response to chat
      const botMessage = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error details:', error);
      
      // Switch to fallback mode
      setApiStatus('failed');
      setErrorMessage(error.message || 'Unknown error');
      
      const fallbackResponse = getFallbackResponse(inputMessage);
      const botMessage = {
        text: fallbackResponse + "\n\n(Note: Using fallback responses due to API issues)",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="chatbot-header-left">
          <div className="chatbot-logo">
            <img src="/Final Logo.jpg" alt="Logo" />
          </div>
          <div>
            <h2>CodeBot Assistant</h2>
            <p>Your AI coding companion {apiStatus === 'working' ? 'powered by Gemini' : '(Fallback Mode)'}</p>
            {apiStatus === 'failed' && (
              <p className="error-message">API Error: {errorMessage}</p>
            )}
          </div>
        </div>
        <Link to="/" className="home-link">
          <button className="home-button">Back to Home</button>
        </Link>
      </div>
      
      <div className="chatbot-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <h3>Welcome to CodeBot!</h3>
            <p>I'm your AI coding assistant. Ask me anything about programming, debugging, or coding concepts.</p>
            <div className="suggestion-chips">
              <button onClick={() => setInputMessage("How do I debug JavaScript code?")}>Debugging tips</button>
              <button onClick={() => setInputMessage("Explain React hooks")}>React hooks</button>
              <button onClick={() => setInputMessage("What is async/await?")}>Async/Await</button>
            </div>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <div className="message-content">
              <p>{message.text}</p>
              <span className="timestamp">{message.timestamp}</span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="chatbot-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask me anything about coding..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBot; 