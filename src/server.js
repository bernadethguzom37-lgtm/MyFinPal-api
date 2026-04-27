import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "production") job.start();

app.use(rateLimiter);
app.use(express.json());
/*app.use((req,res,next) => {
    console.log("Hey we hit a req, the method is",req.method);
    next();
});*/

const PORT = process.env.PORT || 8080;

//connectDB(process.env.DATABASE_URL);

/*app.get("/health",(req,res) => {
    res.send("It's working");
});*/

app.use("/api/transactions", transactionsRoute);



/*app.get("/",(req, res) =>{
    res.send("It's Working");
});*/

//console.log("my port:", process.env.PORT);

initDB().then(() => {
    app.listen(PORT,() => {
    console.log("Server is up and running on PORT:", PORT);
});
});
