# CodeBot Assistant

A chatbot application that uses Google's Gemini AI to provide coding assistance.

## Project Structure

- `src/components/ChatBot/` - React frontend components
- `server.py` - Flask backend server
- `requirements.txt` - Python dependencies

## Setup Instructions

### Backend Setup

1. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Start the Flask server:
   ```
   python server.py
   ```
   The server will run on http://localhost:5000

### Frontend Setup

1. Install Node.js dependencies:
   ```
   npm install
   ```

2. Start the React development server:
   ```
   npm start
   ```
   The application will run on http://localhost:3000

## How It Works

1. The React frontend provides a user interface for interacting with the chatbot
2. User messages are sent to the Flask backend
3. The Flask backend uses the Google Generative AI (Gemini) API to generate responses
4. Responses are sent back to the frontend and displayed in the chat interface

## Features

- Modern, responsive UI
- Real-time chat interface
- Fallback responses when the API is unavailable
- Error handling and status indicators
- Suggestion chips for common coding questions

## Troubleshooting

If you encounter issues:

1. Make sure both the Flask backend and React frontend are running
2. Check the browser console for any error messages
3. Verify that the Gemini API key is valid and has sufficient quota
4. Ensure CORS is properly configured if accessing from a different domain
