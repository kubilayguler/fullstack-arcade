import express from "express"
import dotenv from "dotenv"
import conn from "./db.js"
import pageRoute from "./routes/pageRoute.js"
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser"
import { checkUser } from "./middlewares/authMiddleware.js"

dotenv.config();

//connection to the DB
conn();

const app = express();
const port = process.env.PORT;

//ejs template engine
app.set("view engine", "ejs");

//static files middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.get("*", checkUser);
app.use('/', pageRoute);
app.use('/users', userRoute);

app.listen(port, ()=> {
    console.log(`Server hosting on  ${port}`);
});