const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

// const v1Router = require("v1/routes");
const authRouter = require("./v1/routes/authRoutes");
const levelRouter = require("./v1/routes/levelRoutes");
const transactionRouter = require("./v1/routes/transactionRoutes");
const userRouter = require("./v1/routes/userRoutes");

// Load .env
dotenv.config();

// Set up the app
const app = express();

app.use(cors());
app.use(express.json());

// Set up Routes
app.use("api/v1/auth", authRouter);
app.use("/api/v1/levels", levelRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/users", userRouter);

// Connect to database
mongoose.connect(process.env.MONGO_URI, { 
	useNewUrlParser: true,
	useUnifiedTopology: true }
).then(() => {
	console.log("DB connected successfully");
}).catch((error) => {
	console.log(error)
})

app.listen(process.env.PORT || 5000, () => {
	console.log("Backend server is running")
})