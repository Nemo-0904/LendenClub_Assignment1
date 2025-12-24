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

Response: {
  "message": "User registered successfully"
}

Login User

POST /api/auth/login

Authenticates a user and returns a JWT token.

Request Body:
{
  "email": "user@example.com",
  "password": "password123"
}
Response:
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}


Get User Profile (Protected)

GET /api/auth/profile

Fetches the authenticated user's profile details.

Headers:   Authorization: Bearer <JWT_TOKEN>
Response:{
  "id": 1,
  "name": "User Name",
  "email": "user@example.com",
  "aadhaar": "XXXX-XXXX-9012"
}

## 🤖 AI Tool Usage Log (Mandatory)

As required by the GET 2026 Full Stack Assignment, AI-based development tools were used during the implementation of this project to improve development efficiency and code quality.

### AI Tools Used
- ChatGPT

### AI-Assisted Tasks
- Generated initial backend boilerplate using Node.js and Express
- Assisted in designing JWT-based authentication flow
- Generated AES encryption and decryption utility for sensitive data
- Helped write Jest unit tests for encryption/decryption logic
- Assisted in implementing authentication middleware for token validation
- Refactored backend error handling for login and profile APIs
- Assisted in frontend routing and protected route logic
- Reviewed GitHub security practices including `.env`, `.gitignore`, and environment handling
- Helped improve frontend form handling and error messaging

### Effectiveness Score
**Score: 4 / 5**

**Justification:**  
The use of AI tools significantly reduced development time by generating boilerplate code, security utilities, and test cases, saving approximately 2–3 hours. Manual reasoning and debugging were still required for security decisions, Aadhaar masking logic, and backend–frontend integration.

## ✅ Submission Readiness & Final Notes

This project fulfills all the requirements specified for **Assignment 1: Secure User Profile & Access Control System** under the GET 2026 Full Stack Assignment.

### Completion Checklist
- ✔ Secure Login and Registration using JWT
- ✔ Encrypted storage of sensitive identifiers (Aadhaar) at rest
- ✔ Authenticated API for fetching user profile data
- ✔ Secure frontend dashboard for profile viewing
- ✔ Robust error handling on both client and server sides
- ✔ Unit tests for encryption and decryption logic
- ✔ AI Tool Usage Log included as mandated
- ✔ Clean project structure and documentation
- ✔ Public GitHub repository ready for evaluation

### Notes
- Sensitive credentials are managed using environment variables and excluded from version control.
- Aadhaar data is never exposed in plain text at any stage.
- The project demonstrates a security-first approach aligned with real-world engineering practices.

---

## 👤 Author

**Nithya Cherala**  
Final Year Engineering Student  
Electronics Engineering  
Veermata Jijabai Technological Institute (VJTI), Mumbai

---

## 🎥 Demo Video

Find the demo video here:  
👉 [Click to watch demo](./lenderclub.mp4)

