const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendOTPEmail } = require('../utils/mailer');

function signToken(user){
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}

exports.signup = async (req, res) => {
  try{
    const { fullName, email, password, phone } = req.body;
    if(!fullName || !email || !password) return res.status(400).json({ message: 'Missing required fields' });
    const existing = await User.findOne({ email });
    if(existing) return res.status(409).json({ message: 'User already exists' });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ fullName, email, passwordHash: hash, phone });
    const token = signToken(user);
    res.json({ token, user: { id: user._id, email: user.email, fullName: user.fullName } });
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req,res) => {
  try{
    const { emailOrPhone, password } = req.body;
    const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
    if(!user) return res.status(404).json({ message: 'User not found' });
    if(!user.passwordHash) return res.status(400).json({ message: 'Use social login or reset password' });
    const match = await bcrypt.compare(password, user.passwordHash);
    if(!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = signToken(user);
    res.json({ token, user: { id: user._id, email: user.email, fullName: user.fullName } });
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.requestOTP = async (req,res) => {
  try{
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(404).json({ message: 'User not found' });
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10*60*1000); // 10 minutes
    user.otp = { code, expiresAt };
    await user.save();
    // Send OTP by email (nodemailer)
    await sendOTPEmail(user.email, code);
    res.json({ message: 'OTP sent' });
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyOTPAndReset = async (req,res) => {
  try{
    const { email, code, newPassword } = req.body;
    const user = await User.findOne({ email });
    if(!user || !user.otp || user.otp.code !== code) return res.status(400).json({ message: 'Invalid OTP' });
    if(new Date() > new Date(user.otp.expiresAt)) return res.status(400).json({ message: 'OTP expired' });
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    user.otp = undefined;
    await user.save();
    res.json({ message: 'Password reset successful' });
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.changePassword = async (req,res) => {
  try{
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({ message: 'User not found' });
    const match = await bcrypt.compare(currentPassword, user.passwordHash || '');
    if(!match) return res.status(401).json({ message: 'Current password is incorrect' });
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.json({ message: 'Password changed' });
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
