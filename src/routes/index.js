const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async (req, res) => {
  const tasks = await Task.find()
  res.status(200).render('index', {tasks});
});

router.post('/add', async (req, res) => {
  let task = new Task(req.body);
  await task.save();
  res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
  let { id } = req.params;
  await Task.remove({_id: id});
  res.redirect('/');
});

router.get('/toggle/:id', async (req, res) => {
  let { id } = req.params;
  const task = await Task.findById({_id: id});
  task.status = !task.status;
  await task.save();
  // await task.update({status: !task.status});
  res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
  let { id } = req.params;
  const task = await Task.findById({_id: id});
  res.render('edit', {task});
});

router.post('/update/:id', async (req, res) => {
  let { id } = req.params;
  // let { title, description } = req.body;
  // await Task.update({_id: id}, {$set: {title, description}});
  await Task.update({_id: id}, req.body);
  res.redirect('/');
});

router.get('*', (req, res) => {
  res.send('Page no found - 404');
})

module.exports = router;