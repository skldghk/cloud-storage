// backend/controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 회원가입
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    const user = await User.create({ username, email, password });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  };

// 로그인
exports.authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// JWT 토큰 생성 함수
const generateToken = (id) => {
    console.log('Generating token with secret:', process.env.JWT_SECRET); // 이 줄을 추가해서 확인
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
