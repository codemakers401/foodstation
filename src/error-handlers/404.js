'use strict'

module.exports=function handle404(req,res,next)
{
    const errorObject={
        status:404,
        message:'path not found'
    }
    res.status(404).json(errorObject)
}