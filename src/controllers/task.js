'use strict'
const Task = require('../models/task');

async function getTasks(req, res) {
  const tasks = await Task.find()
  res.status(200).render('index', {tasks});
}

async function addTask(req, res) {
  let task = new Task(req.body);
  await task.save();
  res.redirect('/');
}

async function deleteTask (req, res) {
  let { id } = req.params;
  await Task.remove({_id: id});
  res.redirect('/');
}

async function changeStatusTask(req, res) {
  let { id } = req.params;
  const task = await Task.findById({_id: id});
  task.status = !task.status;
  await task.save();
  // await task.update({status: !task.status});
  res.redirect('/');
}

async function formEditTask(req, res) {
  let { id } = req.params;
  const task = await Task.findById({_id: id});
  res.render('edit', {task});
}

async function updateTask(req, res) {
  let { id } = req.params;
  // let { title, description } = req.body;
  // await Task.update({_id: id}, {$set: {title, description}});
  await Task.update({_id: id}, req.body);
  res.redirect('/');
}

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  changeStatusTask,
  formEditTask,
  updateTask
}