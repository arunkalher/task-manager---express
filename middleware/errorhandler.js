const {customAPIError}=require("../errors/custom-error")

const errorHandler=(err,req,res,next)=>{
    if(err instanceof customAPIError)
    return res.status(err.statusCode).json({status:0,error:err.message})
    return res.status(200).json({status:0,error:err.message})
}
// passing 200 instead of 500 as I didn't included try catch in frontend
// Although this error will be never be thrown based on current frontend
// setup

module.exports=errorHandler