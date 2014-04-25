var express = require('express'),
    employees = require('./routes/employee');
 
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.bodyParser());
app.use(app.router);

app.get('/employees/:id/reports', employees.findByManager);
app.get('/employees/:id/manager', employees.findManager);
app.get('/employees', employees.findAll);

app.post('/employees', employees.addEmployee);
app.put('/employees/:id', employees.updateEmployee);
app.delete('/employees/:id', employees.deleteEmployee);
app.get('/employees/:id', employees.findById);

app.get("/", function(request, response){
    response.send("hello!");
});

app.listen(3000);
console.log('Listening on port 3000...');