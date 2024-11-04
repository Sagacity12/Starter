const express = require('express');
const router = express.Router();

const { getAllTasks,
     createTasks, 
     getTasks, 
     updateTasks, 
     deleteTasks,  } = require('../controllers/Tasks')

const { register, login, dashboard } = require('../controllers/main.js')

router.route('/')
.get(getAllTasks)
.post(createTasks)

router.route('/:id')
.get(getTasks)
.patch(updateTasks)
.delete(deleteTasks)


const authMiddleware = require('../middleware/auth.js')
router.route('/dashboard')
.get(authMiddleware, dashboard)
router.route('/register').post(register)
router.route('/login').post(login)

module.exports = router
