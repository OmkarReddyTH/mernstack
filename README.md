# MERN Auth Starter

A full-stack **Authentication Starter Project** built with the **MERN stack (MongoDB, Express, React, Node.js)**. This project includes JWT-based authentication, protected routes, password reset, and social login support. It is designed as a starter template for building secure MERN applications.

---

## 🚀 Features

- **User Authentication (Signup/Login/Logout)**
- **JWT-based Authentication** with HttpOnly cookies
- **Protected API routes**
- **Password Reset via Email**
- **Social Login Support (Google, GitHub, etc.)**
- **Frontend (React)** with routing & context
- **Backend (Node + Express)** REST API
- **MongoDB Database** with Mongoose ODM

---

## 📂 Project Structure

```
mern-auth-starter/
├── backend/               # Express + MongoDB server
│   ├── server.js          # Main server entry
│   ├── controllers/       # Route controllers (auth)
│   ├── models/            # Mongoose models
│   ├── utils/             # Utility functions (tokens, email)
│   └── package.json       # Backend dependencies
│
├── frontend/              # React client app
│   ├── public/            # Static files
│   ├── src/               # React source code
│   │   ├── pages/         # Auth-related pages
│   │   └── index.js       # App entry
│   └── package.json       # Frontend dependencies
│
└── README.md              # Project documentation
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/mern-auth-starter.git
cd mern-auth-starter
```

### 2. Backend Setup
```bash
cd backend
npm install
```

#### Create `.env` file
Copy `.env.example` to `.env` and update values:

```ini
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-auth
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:3000
```

Start backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Start frontend React app:
```bash
npm start
```

---

## 🔑 Authentication Flow

1. **Signup/Login** → User credentials are sent to backend.
2. **JWT Token** → Backend generates JWT & stores in HttpOnly cookie.
3. **Protected Routes** → React frontend checks authentication via API.
4. **Password Reset** → Token-based email link is sent to user.
5. **Social Login** → OAuth redirect handled by backend & frontend.

---

## 🛠️ Tech Stack

**Frontend:**
- React (CRA)
- React Router
- Context API / Hooks

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Nodemailer (for email)

---

## 📜 Available Scripts

### Backend
```bash
npm run dev   # Start backend in dev mode
npm start     # Start backend in production mode
```

### Frontend
```bash
npm start     # Run React app
npm run build # Build production-ready React app
```

---

## 🔒 Security Notes
- Use **environment variables** for secrets.
- Set **secure cookies** in production (`secure: true`).
- Always validate user input.
- Consider using **helmet & rate-limiter** middleware.

---

## 📧 Password Reset Setup
- Configure `EMAIL_USER` and `EMAIL_PASS` in `.env`.
- The backend will send a password reset link to user’s email.

---

## 🌍 Deployment

1. **Frontend:** Build React app using `npm run build`, then serve with Nginx/Netlify/Vercel.
2. **Backend:** Deploy to services like Render, Railway, or Heroku.
3. **Database:** Use MongoDB Atlas for production.

---

## 🤝 Contributing
Pull requests are welcome! Please open an issue first to discuss any major changes.

---

## 📄 License
This project is licensed under the MIT License.

