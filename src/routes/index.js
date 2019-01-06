const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/task');

router.get('/', tasksController.getTasks);

router.post('/add', tasksController.addTask);

router.get('/delete/:id', tasksController.deleteTask);

router.get('/toggle/:id', tasksController.changeStatusTask);

router.get('/edit/:id', tasksController.formEditTask);

router.post('/update/:id', tasksController.updateTask);

router.get('*', (req, res) => {
  res.render('nofound');
})

module.exports = router;