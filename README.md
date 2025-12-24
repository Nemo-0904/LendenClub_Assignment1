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
