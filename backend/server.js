require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Passport (social strategies will be configured in routes/auth)
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_auth_db', {useNewUrlParser:true, useUnifiedTopology:true})
  .then(()=>{
    console.log('MongoDB connected');
    app.listen(PORT, ()=> console.log('Server listening on port', PORT));
  })
  .catch(err=>{
    console.error('Mongo connect error', err.message);
    app.listen(PORT, ()=> console.log('Server listening (mongo not connected) on port', PORT));
  });
