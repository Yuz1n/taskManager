const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');  // Importando a biblioteca para gerar UUIDs
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'API for managing tasks',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./index.js'], // O caminho para o arquivo onde estão as anotações do Swagger
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rota para obter todas as tarefas
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieves all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of all tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Rota para criar uma nova tarefa
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Creates a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
app.post('/tasks', (req, res) => {
  const newTask = {
    ...req.body,
    id: uuidv4(),  // Usando UUID para gerar um ID único
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Rota para atualizar uma tarefa existente
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Updates an existing task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task not found
 */
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const updatedTask = { ...req.body, id };  // Mantendo o ID da tarefa

  // Verifica se a tarefa existe
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex] = updatedTask;
    res.status(200).json(updatedTask);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Rota para excluir uma tarefa existente
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Deletes a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the task to delete
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task not found
 */
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(204).send();  // Retorna 204 No Content
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Definindo o esquema de tarefa para o Swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - dueDate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the task
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: The description of the task
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The due date of the task
 *         completed:
 *           type: boolean
 *           description: The status of the task
 *       example:
 *         id: 1
 *         title: Task 1
 *         description: Description for task 1
 *         dueDate: 2024-05-23
 *         completed: false
 */

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
