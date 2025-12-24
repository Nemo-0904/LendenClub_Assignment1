## 📌 Project Overview

This project implements a **Secure User Profile & Access Control System** as part of the GET 2026 Full Stack Assignment. The objective is to design a secure identity management service that supports user authentication, encrypted storage of sensitive identifiers, and protected access to user profile data.

The system uses **JWT-based stateless authentication** and **AES encryption** to ensure that sensitive information such as Aadhaar is securely stored and accessed. A React-based frontend interacts with the backend APIs to provide login, registration, and profile management functionality with proper error handling and access control.
<br>
## 🛠️ Technology Stack

### Backend
- Node.js
- Express.js
- MySQL
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- Node.js `crypto` module for AES encryption
- dotenv for environment variable management

### Frontend
- React (Vite)
- React Router
- CSS for styling

### Testing
- Jest for unit testing

<br>

## 🏗️ Architecture & Features

The application follows a **client–server architecture** with a clear separation between frontend and backend responsibilities.

### Backend – User Profile Service
- User registration and login APIs using JWT-based authentication
- Secure password hashing with bcrypt
- AES encryption for sensitive fields (Aadhaar) stored in the database
- Authentication middleware to protect profile access
- Centralized error handling for authentication and data access

### Frontend – Profile Management Dashboard
- Login and registration interfaces
- Protected profile page accessible only to authenticated users
- Secure display of user details with masked Aadhaar number
- Client-side error handling and session management


<br>

## 🔐 Security & Encryption Design

Security was a primary design consideration throughout the application.

### Authentication
- Stateless authentication is implemented using JSON Web Tokens (JWT).
- Tokens are issued during login and validated via middleware for protected routes.
- Unauthorized access to profile data is prevented at the API level.

### Password Security
- User passwords are never stored in plain text.
- Passwords are securely hashed using bcrypt with salting before storage.

### Aadhaar / ID Number Handling
- Aadhaar numbers are encrypted at rest using AES encryption.
- Encryption and decryption logic is handled exclusively on the backend.
- The decrypted Aadhaar is masked before being sent in API responses.
- The frontend only displays masked Aadhaar values and never exposes the full identifier.

This approach minimizes sensitive data exposure and aligns with secure data handling practices.
<br>
## 🗄️ Database Schema

The application uses a relational database (MySQL) to store user profile information.

### `users` Table

| Column Name          | Type        | Description |
|----------------------|-------------|-------------|
| id                   | INT (PK)    | Unique user identifier |
| name                 | VARCHAR     | User’s full name |
| email                | VARCHAR     | User’s email address (unique) |
| password_hash        | VARCHAR     | Hashed user password |
| aadhaar_encrypted    | TEXT        | AES-encrypted Aadhaar number |

Sensitive fields such as Aadhaar are stored only in encrypted form to ensure data security at rest.

## Setup / Run Instructions: 
### Frontend
cd frontend
npm install
npm run dev

The frontend will start on: http://localhost:5173

Backend:  
cd backend
npm install
npm start

The backend server will start on: http://localhost:5000

Database: Create a MySQL database.
Configure database credentials in a .env file inside the backend folder
(Refer to .env.example for required variables).
Ensure MySQL service is running before starting the backend.

Environment Variables: 

All sensitive configuration values are managed using environment variables.
A sample file .env.example is provided.
The actual .env file must not be committed to version control.

## 📄 API Documentation

The backend exposes RESTful APIs for authentication and secure profile access.

### Register User
**POST** `/api/auth/register`
Registers a new user.

**Request Body:**: 
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123",
  "aadhaar": "123456789012"
}

