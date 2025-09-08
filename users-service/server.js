const express = require("express");
const mongoose = require("mongoose");


const app = express();
app.use(express.json());


const mongoUri = process.env.MONGO_URI || "mongodb://mongo:27017/usersdb";
mongoose.connect(mongoUri, {
useNewUrlParser: true,
useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error', err));


const userSchema = new mongoose.Schema({ name: String });
const User = mongoose.model("User", userSchema);


// Seed default users if empty
async function seedUsers() {
const count = await User.countDocuments();
if (count === 0) {
await User.insertMany([{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }]);
console.log("Seeded Users Collection ✅");
}
}
seedUsers().catch(console.error);


app.get("/api/users", async (req, res) => {
const users = await User.find();
res.json(users);
});


app.post("/api/users", async (req, res) => {
const { name } = req.body;
if (!name) return res.status(400).json({ error: 'name required' });
const user = new User({ name });
await user.save();
res.json(user);
});


const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Users Service running on port ${port}`));
