 // res.json(req.body) testin the midlleware
const Task= require('../models/Task')

//get all request 
const getAllTasks = async(req,res)=>{
try{
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
}catch(error){
    res.status(500).json({msg: error})
}
}

//post request
const createTask = async(req,res)=>{
    try{
        const task = await Task.create(req.body)
        res.status(201).json({task})

    }catch(error){
        res.status(500).json({msg: error})
    }     
}
//get by id request
const getTask = async (req,res)=>{
    try{
        const { id:taskID } = req.params
        const task = await Task.findOne({ _id: taskID })
        if(!task){
            return res.status(404).json({msg:`No Task with id : ${taskID}`})
        }
        res.status(200).json({task})
    }catch(error){
        res.status(500).json({msg: error})
    }
}


//delete request
const deleteTask = async(req,res)=>{
    try{
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});
        if (!task){
            return res.status(404).json({msg:`No Task with id : ${taskID}`})
     }
     //res.status(200).json({task})
     //res.status(200).send()
     res.status(200).json({task: null, status: 'DELETED SUCCESSFULLY'})
     }catch (error){
         res.status(500).json({msg: error})
     }
}
//update request 
const updateTask = async(req,res)=>{
   try{
        const {id:taskID}= req.params;
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true,
        }) 
        if(!task){
            return res.status(404).json({msg:`No Task with id : ${taskID}`})
        }
        res.status(200).json({task})
   }catch(error){
        res.status(500).json({msg: error})
   }
}

// import model
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}