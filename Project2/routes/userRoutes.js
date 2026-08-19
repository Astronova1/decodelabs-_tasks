const express = require('express');
const router = express.Router();
const User = require('../models/User');

//Add a new user
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ success: true, message: 'User created successfully', data: newUser });
    } catch (error) {
        // 🔒 CATCH DUPLICATE EMAIL ERROR
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Validation Error: This email is already registered.' });
        }
        res.status(400).json({ success: false, message: error.message });
    }
});

//Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

//Get a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid User ID format' });
    }
});

// Update user details
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // Returns updated doc & runs schema validation
        );
        
        if (!updatedUser) return res.status(404).json({ success: false, message: 'User not found' });
        
        res.status(200).json({ success: true, message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Validation Error: Email already exists.' });
        }
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE: Remove a user
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ success: false, message: 'User not found' });
        
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid User ID format' });
    }
});

module.exports = router;