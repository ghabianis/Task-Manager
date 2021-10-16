const connectDB=require('./db/connect')
const Mongoose= require('mongoose');
const express = require('express');
const app = express()
const tasks =require('./routes/tasks')
require('dotenv').config()
//middleware
app.use(express.static('./public'))
app.use(express.json())


//routes

app.use('/api/v1/tasks', tasks)

 

//get all the tasks
//app.get('/api/v1/tasks')
//create a new task
//app.post('/api/v1/tasks')
//get single task
//app.get('/api/v1/tasks/:id')
//update task
//app.patch('/api/v1/tasks/:id')
//delete task
// app.delete('/apiv1/tasks/:id')



const port = 3000

const start = async () => {
    try{
      await connectDB(process.env.MONGO_URI)
      app.listen(port,console.log(`Server is lestning on port ${port}...`))
    }catch(error){
      console.log(error);
    }
}
start()
