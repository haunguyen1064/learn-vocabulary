# Learn Vocabulary App

An interactive web application for learning English vocabulary with flashcards, quizzes, and spaced repetition.

## Features

- Displays vocabulary words as flash cards with word, meaning, and example sentences
- Allows selecting specific flash cards for study
- Quiz mode with multiple-choice questions
- Spaced repetition system that tracks word mastery
- Collections for organizing words by status (new, learning, mastered)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- NPM or Yarn
- Firebase project (for authentication and database)

### Environment Setup

1. Clone the repository
2. Copy `.env.example` to `.env`
3. Fill in your Firebase project credentials in the `.env` file:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password
3. Create a Firestore database
4. Set appropriate security rules for your database
 