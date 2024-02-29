const Task=require("../models/task")
const asyncWrapper=require("../middleware/asyncwrapper")
const {createCustomError, CustomAPIError}=require("../errors/custom-error")
const getAllTasks=asyncWrapper(async (req,res)=>{
    
        

        const tasks=await Task.find({},{"name":1, "completed":1})
      
        res.status(200).json({status:1,result:tasks})
    
    
    // catch(err)
    // {
    //     res.status(500).send({status:0,error:err})
    // }
})
const createTask=asyncWrapper(async (req,res)=>{
    
    const task=await Task.create(req.body)
  
    res.status(201).json({status:1,result:task})
    
    // catch(err){
    //     res.status(500).send({status:0,error:err})
    // }
})

const getTask=asyncWrapper(async (req,res,next)=>{
    
        const {id:taskId}=req.params
        
        const task=await Task.findOne({_id:taskId})
        if(!task)
        {   
            // const error=new Error("`no task for id : ${taskId}")
            // error.status=200 //404
            // return next(error)
            return next(CustomAPIError(`no task for id : ${taskId}`,200))
            // return res.status(404).json({status:0,error:`no task for id : ${taskId}`})
        }
      
        res.status(200).json({status:1,result:task})
    
    // catch(err)
    // {
    //     res.status(500).send({status:0,error:err})
    // }
} )
const updateTask=asyncWrapper(async (req,res,next)=>{
    
        const {id:taskId}=req.params
        
        const task=await Task.findOneAndUpdate({_id:taskId},req.body,{new:true,runValidators:true})
        if(!task)
        {
            // const error=new Error("`no task for id : ${taskId}")
            // error.status=200 //404
            // return next(error)
            return next(CustomAPIError(`no task for id : ${taskId}`,200))
        }
      
        res.status(200).json({status:1,result:task})
    
    // catch(err)
    // {
    //     res.status(500).send({status:0,error:err})
    // }
})
const deleteTask=asyncWrapper(async (req,res,next)=>{
    
        const {id:taskId}=req.params
        
        const task=await Task.findOneAndDelete({_id:taskId})
        if(!task)
        {
            // const error=new Error("`no task for id : ${taskId}")
            // error.status=200 //404
            return next(CustomAPIError(`no task for id : ${taskId}`,200))
        }
      
        res.status(200).json({status:1,result:task})
       
    
    // catch(err)
    // {
    //     res.status(500).send({status:0,error:err})
    // }
    
})
module.exports={
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask  
}
