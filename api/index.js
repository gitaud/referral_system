const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

// const v1Router = require("v1/routes");
const AuthRouter = require("./v1/routes/AuthRoutes");
const LevelRouter = require("./v1/routes/LevelRoutes");
const TransactionRouter = require("./v1/routes/TransactionRoutes");
const UserRouter = require("./v1/routes/UserRoutes");

// Load .env
dotenv.config();

// Set up the app
const app = express();

app.use(cors());
app.use(express.json());

// Set up Routes
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/levels", LevelRouter);
app.use("/api/v1/transactions", TransactionRouter);
app.use("/api/v1/users", UserRouter);

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