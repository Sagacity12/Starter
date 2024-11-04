const express = require("express");
const route = require("./routes/routes.js");
const connectDB = require("./dbConnect/mongodb.js");
require("dotenv").config();
const notFound = require("./middleware/not.found.js");
const errorHandlerMiddleware = require("./middleware/errorhandle.js");


const helmet = require('helmet');
const cors = require('cors');
//const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const app = express();

// middleware
app.set('trust proxy', 1)
app.use(
  rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. 
  }));
app.use(express.static("./client"));
app.use(express.json());
app.use(helmet());
app.use(cors());
//app.use(xss());

//routes 
app.get('/',(req,res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/Tasks">Tasks route</a>')})
app.use("/api/v1/routes", route);

// routes; texting of routes
//app.get("/", (req, res) => { res.send("Sagacity App")});

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT   || 8000;

//
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
