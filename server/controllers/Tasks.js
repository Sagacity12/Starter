const Task = require('../model/Tasks.model.js')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom.error.js')

const getAllTasks = asyncWrapper(async (req, res) => {
  
    const Task = await Task.find({});
    // res.status(200).json({ Task })
    // res.status(200).json({ Task, amount: Tasks,lenght })
    res
       .status(200)
       .json({ status: "success", data: { Task, nbHits: Task.lenght} })
});

const createTasks = asyncWrapper(async (req, res) => {
 
   const Task = await Task.create(req.body)
   res.status(201).json({ Task }) 

 
});

const getTasks = asyncWrapper(async (req, res, next ) => { 
  
    const { id:TaskID} = req.params
    const Task = await Task.findone({_id:TaskID});
    if(!Task){
      const error = new Error('Not Found');
      error.status = 404;
      return next()
      return res.status(400).json({msg:`No task with id : ${TaskID}`})
    
   res.status(200).json({ Task })
 
}
});

const deleteTasks = asyncWrapper(async (req, res) => {
  
    const {id:TaskID} = req.params;
    const Task = await Task.findOneAndDelete({__id:TaskID});
    if(!Task){
      return res.status(400).json({msg:`No task with id : ${TaskID}`});
    }
    res.status(200).json({ Task })
  
});
const updateTasks = asyncWrapper(async (req, res) => {
 
  const {id:TaskID} = req.params;
const Task = await Task.findOneAndUpdate({__id:TaskID}, req.body,{
  new: true,
  runValidator: true,
  overWite: true,
})
 if (!Task) {
   return res.status(400).json({ msg: `No task with id : ${TaskID}` });
 }
  res.status(200).json({ Task })
 
});

module.exports = {
  getAllTasks,
  createTasks,
  updateTasks,
  deleteTasks,
  getTasks,
};



 