import React, { useState, useEffect } from 'react';
import './QAPlatform.css';

const QAPlatform = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "How to implement authentication in React?",
      description: "I need help setting up JWT authentication in my React application.",
      price: 10,
      status: "open",
      author: "John Doe",
      timestamp: "2024-03-20 14:30",
      answers: []
    },
    {
      id: 2,
      title: "Best practices for MongoDB schema design",
      description: "Looking for advice on designing a scalable MongoDB schema for an e-commerce app.",
      price: 15,
      status: "open",
      author: "Jane Smith",
      timestamp: "2024-03-20 15:45",
      answers: []
    }
  ]);

  const [newQuestion, setNewQuestion] = useState({
    title: '',
    description: '',
    price: '',
    image: null
  });

  const [answeringQuestion, setAnsweringQuestion] = useState(null);
  const [answerText, setAnswerText] = useState('');

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    const question = {
      id: questions.length + 1,
      ...newQuestion,
      price: parseFloat(newQuestion.price),
      status: "open",
      author: "Current User",
      timestamp: new Date().toLocaleString(),
      answers: []
    };
    setQuestions([...questions, question]);
    setNewQuestion({ title: '', description: '', price: '', image: null });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewQuestion({ ...newQuestion, image: URL.createObjectURL(file) });
    }
  };

  const handleAnswerClick = (questionId) => {
    setAnsweringQuestion(questionId);
    setAnswerText('');
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (!answerText.trim()) return;

    const updatedQuestions = questions.map(question => {
      if (question.id === answeringQuestion) {
        // Add the answer to the question
        const newAnswer = {
          id: Date.now(),
          text: answerText,
          author: "Current User",
          timestamp: new Date().toLocaleString()
        };
        
        // Update question status and add answer
        return {
          ...question,
          status: 'solved',
          answers: [...question.answers, newAnswer]
        };
      }
      return question;
    });

    // Save to localStorage for persistence
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));

    // Update earnings in localStorage
    const answeredQuestion = questions.find(q => q.id === answeringQuestion);
    const currentEarnings = JSON.parse(localStorage.getItem('userEarnings')) || [];
    const newEarning = {
      question_id: answeringQuestion,
      amount: answeredQuestion.price,
      earned_at: new Date().toISOString(),
      question_title: answeredQuestion.title
    };
    localStorage.setItem('userEarnings', JSON.stringify([...currentEarnings, newEarning]));

    // Update state
    setQuestions(updatedQuestions);
    setAnsweringQuestion(null);
    setAnswerText('');
    alert('Answer submitted successfully! You earned $' + answeredQuestion.price);
  };

  // Load questions from localStorage on component mount
  useEffect(() => {
    const savedQuestions = localStorage.getItem('questions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  return (
    <div className="qa-platform">
      <div className="qa-header">
        <h1>Q&A Platform</h1>
        <p>Ask questions and earn money by providing answers</p>
      </div>

      <div className="qa-content">
        <div className="ask-question-section">
          <h2>Ask a Question</h2>
          <form onSubmit={handleSubmitQuestion} className="question-form">
            <div className="form-group">
              <label>Question Title</label>
              <input
                type="text"
                value={newQuestion.title}
                onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                placeholder="Enter your question title"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newQuestion.description}
                onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
                placeholder="Provide detailed description of your question"
                required
              />
            </div>
            <div className="form-group">
              <label>Price (in $)</label>
              <input
                type="number"
                value={newQuestion.price}
                onChange={(e) => setNewQuestion({ ...newQuestion, price: e.target.value })}
                placeholder="Set price for the answer"
                required
                min="1"
              />
            </div>
            <div className="form-group">
              <label>Upload Image (Optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            {newQuestion.image && (
              <div className="image-preview">
                <img src={newQuestion.image} alt="Question preview" />
              </div>
            )}
            <button type="submit" className="submit-btn">Post Question</button>
          </form>
        </div>

        <div className="questions-list">
          <h2>Open Questions</h2>
          {questions.map(question => (
            <div key={question.id} className="question-card">
              <div className="question-header">
                <h3>{question.title}</h3>
                <span className="price-tag">${question.price}</span>
              </div>
              <p className="question-description">{question.description}</p>
              {question.image && (
                <div className="question-image">
                  <img src={question.image} alt="Question" />
                </div>
              )}
              <div className="question-footer">
                <span className="author">Posted by: {question.author}</span>
                <span className="timestamp">{question.timestamp}</span>
                {question.status === 'open' && (
                  <button 
                    className="answer-btn"
                    onClick={() => handleAnswerClick(question.id)}
                  >
                    Answer Question
                  </button>
                )}
              </div>

              {answeringQuestion === question.id && (
                <div className="answer-form-container">
                  <form onSubmit={handleSubmitAnswer} className="answer-form">
                    <div className="form-group">
                      <label>Your Answer</label>
                      <textarea
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        placeholder="Write your answer here..."
                        required
                        className="answer-textarea"
                      />
                    </div>
                    <div className="answer-form-buttons">
                      <button type="submit" className="submit-answer-btn">
                        Submit Answer
                      </button>
                      <button 
                        type="button" 
                        className="cancel-answer-btn"
                        onClick={() => setAnsweringQuestion(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {question.answers.length > 0 && (
                <div className="answers-section">
                  <h4>Answers</h4>
                  {question.answers.map(answer => (
                    <div key={answer.id} className="answer-card">
                      <p className="answer-text">{answer.text}</p>
                      <div className="answer-footer">
                        <span className="answer-author">By: {answer.author}</span>
                        <span className="answer-timestamp">{answer.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QAPlatform; 