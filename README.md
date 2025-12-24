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

