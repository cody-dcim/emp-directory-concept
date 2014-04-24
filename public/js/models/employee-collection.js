directory.EmployeeCollection = directory.SearchableCollection.extend({

    model: directory.Employee,

    url: "http://localhost:3000/employees"
    
});