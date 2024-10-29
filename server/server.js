const express = require("express");
const route = require("./routes/routes.js");
const connectDB = require("./dbConnect/mongodb.js");
require("dotenv").config();
const notFound = require("./middleware/not.found.js");
const errorHandlerMiddleware = require("./middleware/errorhandle.js");


const app = express();

// middleware
app.use(express.static("./client"));
app.use(express.json());

//routes 
app.get('/',(req,res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/Tasks">Tasks route</a>')
})
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
