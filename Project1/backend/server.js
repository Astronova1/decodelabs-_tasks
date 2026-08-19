const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
    { id: 1, name: "Astro", role: "Backend Developer" },
    { id: 2, name: "Kim", role: "Frontend Developer" }
];

app.get('/api/users', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "500 Internal Server Error: Could not fetch users"
        });
    }
});

app.post('/api/users', (req, res) => {
    try {
        const { name, role } = req.body;

        if (!name || !role) {
            return res.status(400).json({
                success: false,
                message: "Bad Request: 'name' and 'role' are required."
            });
        }

        const newUser = {
            id: users.length + 1,
            name: name,
            role: role
        };

        users.push(newUser);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "500 Internal Server Error: Could not create user"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});