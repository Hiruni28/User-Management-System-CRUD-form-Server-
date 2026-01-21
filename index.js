const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(
"mongodb+srv://hiruni:1234@cluster0.vxqk3mr.mongodb.net/?appName=Cluster0"
).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


const UserSchema = new mongoose.Schema({
name: String,
age: Number
});


const User = mongoose.model("User", UserSchema);


// CREATE
app.post("/users", async (req, res) => {
const user = new User(req.body);
await user.save();
res.send(user);
});


// READ
app.get("/users", async (req, res) => {
const users = await User.find();
res.send(users);
});


// UPDATE
app.put("/users/:id", async (req, res) => {
const updatedUser = await User.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true }
);
res.json(updatedUser);
});


// DELETE
app.delete("/users/:id", async (req, res) => {
await User.findByIdAndDelete(req.params.id);
res.json({ message: "Deleted" });
});


app.listen(5000, () => console.log("Server running on port 5000"));