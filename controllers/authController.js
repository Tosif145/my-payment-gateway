const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    console.log(`Registering JWT: ${process.env.JWT_SECRET}`); 
    const user = await User.create({ username, password_hash: hashedPassword });
    res.status(201).json({ id: user._id, username: user.username }); // Assuming Mongoose uses _id for ObjectId
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`Login attempt for username: ${username}`); // Debug statement

    const user = await User.findOne({ username });
    if (!user) {
      console.log(`User not found: ${username}`); // Debug statement
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      console.log(`Invalid password for username: ${username}`); // Debug statement
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error.message); // Debug statement
    res.status(400).json({ error: error.message });
  }
};