const express=require("express")
const app=express()
const tasks=require("./routes/tasks")
const connectDB=require("./db/connect")
require("dotenv").config()
const notFound=require("./middleware/notFound")
const errorHandler = require("./middleware/errorhandler")

const port= process.env.PORT || 3000
//middleware
app.use(express.static("./public"))
app.use(express.json())

//routes
app.get("/hello",(req,res)=>{
    
    res.end("<h1>Hello from Arun Kalher</h1>")
})
app.use("/api/v1/tasks",tasks)
app.use(notFound)
app.use(errorHandler)
// our routes wll be
// app.get("/api/v1/tasks")        -   get all the tasks
// app.post("/api/v1/tasks")       -   create a new tasks
// app.get("/api/v1/tasks:id")     -   get single task
// app.patch("/api/v1/tasks:id")   -   update task
// app.delete("/api/v1/tasks:id")  -   delete task

const start=async()=>
{   
    try{
    await connectDB(process.env.MONGO_URI)
    console.log("Connected to database....")
    app.listen(port,()=>console.log(`Server is listening on port ${port}...`))
    }
    catch(err){
        console.log(err)
    }
 
}
start()


