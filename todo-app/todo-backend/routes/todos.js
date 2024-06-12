const express = require('express');
const router = express.Router();
const { isValidObjectId } = require('mongoose');
const { Todo } = require('../mongo'); 
const { setAsync, getAsync } = require('../redis');

router.get('/statistics', async (req, res) => {
  const addedTodos = await getAsync('added_todos');
  res.send({ added_todos: addedTodos || 0 });
});

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  });

  let todoCounter = await getAsync('added_todos');
  todoCounter = todoCounter ? parseInt(todoCounter) : 0;
  todoCounter++;
  await setAsync('added_todos', todoCounter);

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    console.error(`Invalid Todo ID: ${id}`);
    return res.status(400).json({ error: 'Invalid Todo ID' }); 
  }

  req.todo = await Todo.findById(id)
  if (!req.todo) return next();

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  await req.todo;
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  if (!req.todo) {
    return res.status(404).json({ error: 'Todo not found' }); 
  }
  
  const body = req.body;
  const updates = {};

  if (body.text !== undefined) {
    updates.text = body.text;
  }

  if (body.done !== undefined) {
    updates.done = body.done;
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.todo._id,
    { $set: updates },
    { new: true }
  );

  res.send(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;