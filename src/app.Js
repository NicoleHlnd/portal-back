
import { openDb } from './configDB.js';
import { createTableEmployees, insertEmployees, updateEmployees, selectEmployees, selectEmployee, deleteEmployees, selectEmail } from './Services/EmployeesService.js';
import { createTableRequests, insertRequests, updateRequests, selectRequests, selectRequest, deleteRequests, answerRequest, finalizeRequest } from './Services/RequestsService.js';
import cors from 'cors'
import express from 'express';

const app = express();
app.use(cors())
app.use(express.json());

createTableEmployees();
createTableRequests();

app.get('/', function(req, res){
    res.send("ta funfando vai na fe");
});


//EMPLOYEES

app.get('/employees', async function(req, res){
    let employees = await selectEmployees();
    res.json(employees);
});

app.get('/employee', async function(req, res){
    let employee = await selectEmployee(req.body.id);
    res.json(employee);
});

app.post('/employees', async function(req, res){
    try {
        await insertEmployees(req.body)
        res.status(200).send()
    } catch{
        res.status(400).send()
    }
   
});


app.put('/employees', function(req, res){
    if(req.body && !req.body.id){
        res.json({
            "statusCode":"400",
            "msg":"Você precisa informar um id"
        })
    }else{
        updateEmployees(req.body)
        res.json({
            "statucCode":200
        })
    }
});

app.delete('/employees', async function(req, res){
    let employees = await deleteEmployees(req.body.id);
    res.json(employees);
});

//REQUESTS 

app.get('/requests', async function(req, res){
    let requests = await selectRequests();
    res.json(requests);
});

app.get('/request', async function(req, res){
    let request = await selectRequest(req.body.id);
    res.json(request);
});

app.post('/requests', function(req, res){
    try{
        insertRequests(req.body)
        res.status(200).send()
    }catch{
        res.status(400).send()
    }
});

app.put('/requests', function(req, res){
    if(req.body && !req.body.id){
        res.json({
            "statusCode":"400",
            "msg":"Você precisa informar um id"
        })
    }else{
        updateRequests(req.body)
        res.json({
            "statucCode":200
        })
    }
});

app.delete('/requests', async function(req, res){
    let requests = await deleteRequests(req.body.id);
    res.json(requests);
});

//LOGIN

app.post('/login', async function(req, res){
    let employees = await selectEmail(req.body.email);
    if(!employees){
        return res.status(404).json("employe not exist")
    }
    if(employees.password == req.body.password){
        res.status(202).json(employees)
    }else{
        res.status(403).json("INCORRECT PASSWORD")
    }

});

app.put('/answerRequest', async function(req, res){
    if(req.body && !req.body.id){
        res.json({
            "statusCode":"400",
            "msg":"Você precisa informar um id"
        })
    }else{
        answerRequest(req.body.id)
        res.json({
            "statucCode":200
        })
    }
})

app.put('/finalizeRequest', async function(req, res){
    if(req.body && !req.body.id){
        res.json({
            "statusCode":"400",
            "msg":"Você precisa informar um id"
        })
    }else{
        finalizeRequest(req.body.id)
        res.json({
            "statucCode":200
        })
    }
})
 
app.listen(3000, ()=>console.log("api funcionando"));