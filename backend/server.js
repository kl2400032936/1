import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); // Enable cross-origin requests
app.use(express.json()); // Enable JSON parsing

const PORT = 5001;

// Temporary in-memory user list
let users = [];

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Test route
app.get("/", (req, res) => {
  res.status(200).json("Hello World from Express JS");
});

// SIGNUP route
app.post("/signup", (req, res) => {
  const { email, password, name } = req.body;

  // Check if email already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(200).json("Email ID already exists");
  }

  // Add user
  users.push({ email, password, name });
  res.status(200).json("Registered Successfully");
});

// LOGIN route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(200).json("301::Invalid Credentials!");
  }

  res.status(200).json("300::Login Success");
});
