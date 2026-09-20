const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ status: 'success', message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, bio: user.bio },
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio },
      { new: true }
    ).select('-password');

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};