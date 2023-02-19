const express=require("express");
const {connection}=require("./db");
const {userRouter}=require("./routes/user.route");
const {noteRouter}=require("./routes/note.route");
const {authenticate}=require("./middleware/authenticate.middleware")
require('dotenv').config()
const cors=require("cors");

const app=express();

app.use(express.json());
app.use(cors({origin:"*"}));

app.get("/",(req,res)=>{
    res.send("Home page")
})

app.use("/users",userRouter);
app.use(authenticate)
app.use("/notes",noteRouter);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB!!");
    } catch (error) {
        console.log(error.message);
    }
    console.log(`server is running at port ${process.env.port}`);
})