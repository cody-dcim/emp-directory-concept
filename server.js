var express = require('express'),
    employees = require('./routes/employee');
 
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(app.router);

app.get('/employees/:id/reports', employees.findByManager);
app.get('/employees/:id', employees.findById);
app.get('/employees', employees.findAll);

app.get("/", function(request, response){
    response.send("hello!");
});

app.listen(3000);
console.log('Listening on port 3000...');