const express  = require('express');            //Imports express frameworks
const bodyParser = require('body-parser');      //Helps us read JSON from frontend
const fs = require('fs');                       //Node's built in file system module
const app = express();                          //Create an express app
const PORT = 3000;                              //Set the port where the server will run

const TODOS_FILE = './todos.json'               //Pathe to the file storage

app.use(bodyParser.json())
app.use(express.static('public'));


function getTodos(){
    const data = fs.readFileSync(TODOS_FILE, 'utf8');
    return JSON.parse(data);
}

function saveTodos(todos){
    fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2))
}

//----------------

//GET
app.get('/todos', (req, res) => {
    const todos = getTodos()
    res.json(todos)
})

//POST(Add)
app.post('/todos', (req, res) => {
    const todos = getTodos();

    const newTodo = {
        id: Date.now(),
        title: req.body.title,
        completed: false
    };

    todos.push(newTodo)
    saveTodos(todos);
    res.status(201).json(newTodo);
})

//PUT(Update)
app.put('/todos/:id', (req, res) => {
    const todos = getTodos()
    const id = parseInt(req.params.id)

    const todo = todos.find(t => t.id === id);
    if(!todo){
        return res.status(404).json({error: 'Todo not found' })
    }

    //Update fields
    if (req.body.title !== undefined) todo.title = req.body.title;
    if (req.body.completed !== undefined) todo.completed = req.body.completed;

    saveTodos(todos)
    res.json(todo)
})

//DELETE(remove)
app.delete('/todos/:id', (req, res) => {
    const todos = getTodos();
    const id = parseInt(req.params.id) 

    const newTodos = todos.filter(t => t.id !== id)
    if(newTodos.length === todos.length){
        return res.status(404).json({ error: 'Todo not found' })
    }

    saveTodos(newTodos)
    res.json({ message: 'Todo deleted'})
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})