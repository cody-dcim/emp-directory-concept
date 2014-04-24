/*
    If you are using the sample RESTFul services I published on GitHub, use the following URLs...

      - For the Node.js sample backend (available in https://github.com/ccoenraets/directory-rest-nodejs)
        Use: http://localhost:3000/employees

        If you are using this Node.js endpoint, the pages of the application must be served from the same domain/port (http://localhost:3000).
        If you want to serve the pages and the data from different domains/ports, use the JSONP adapter instead.

      - For the PHP sample backend (available in https://github.com/ccoenraets/directory-rest-php)
        Use: /directory-rest-php/employees

 */

directory.Employee = Backbone.Model.extend({

//    urlRoot:"/directory-rest-php/employees",
    urlRoot:"http://localhost:3000/employees",

    initialize:function () {
        this.reports = new directory.EmployeeCollection();
        this.reports.url = this.urlRoot + "/" + this.id + "/reports";
    }

});



directory.EmployeeCollection = Backbone.Collection.extend({

    model: directory.Employee,

//    url:"/directory-rest-php/employees"
    url: "http://localhost:3000/employees",

    intialize: function() {
        console.log("Employee Collection created");
    },

    search: function(searchTerm){
    var results = new directory.EmployeeCollection();
    results.fetch({
      success: function(data){
        console.log('Searching the Employee Collection for: ' + searchTerm + '\n' + data.toJSON());
        console.log('Ajax URL: ' + "http://localhost:3000/employees");
        // store reference for this collection
        var collection = data;
        $.ajax({
            type : 'GET',
            url : "http://localhost:3000/employees",
            dataType : 'json',
            success : function(data) {
                console.log(data);
                // set collection data (assuming you have retrieved a json object)
                collection.reset(data)
                var employees = collection.filter(function (element) {
                    var fullName = element.get('firstName') + " " + element.get('lastName');
                    var fullName1 = element.get('fullName');
                    return (fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || element.get('title').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
                });
                collection = employees;
                
                return collection;
            }
        });
/*
        var employees = data.filter(function (element) {
            var fullName = element.get('firstName') + " " + element.get('lastName');
            var fullName1 = element.get('fullName');
            return (fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || element.get('title').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        });
*/
        //console.log(employees);
      },
      error: function(data){
        console.log("error occurred during search");
      }
    }); 
  }

});

/*
    directory.Employee = Backbone.Model.extend({

      //  urlRoot:"/directory-rest-php/employees",
        urlRoot:"http://localhost:3000/employees",

        initialize:function () {
            this.reports = new directory.EmployeeCollection();
            this.reports.url = this.urlRoot + "/" + this.id + "/reports";
        }

    });

    directory.EmployeeCollection = Backbone.Collection.extend({

        model: directory.Employee,

     //   url:"/directory-rest-php/employees"
        url:"http://localhost:3000/employees"

    });
*/
/*

directory.Employee = Backbone.Model.extend({

    urlRoot:"http://localhost:3000/employees",

    initialize: function () {
        this.reports = new directory.EmployeeCollection();
        this.reports.url = this.urlRoot + "/" + this.id + "/reports";
    },

    sync: function(method, model, options) {
        if (method === "read") {
            directory.store.findById(parseInt(this.id), function (data) {
                options.success(data);
            });
        }
    }

});


directory.EmployeeCollection = Backbone.Collection.extend({

    model: directory.Employee,

    url:"http://localhost:3000/employees",

    search: function(searchKey, options) {
        console.log("Searching for employees");
        directory.store.fullSearch(searchKey, function (data) {
            options.success(data);
        });
    }

});

directory.MemoryStore = function (successCallback, errorCallback) {

    this.findByName = function (searchKey, callback) {
        var employees = employeesList.filter(function (element) {
            var fullName = element.firstName + " " + element.lastName;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLater(callback, employees);
    };

    this.findByManager = function (managerId, callback) {
        var employees = employeesList.filter(function (element) {
            return managerId === element.managerId;
        });
        callLater(callback, employees);
    };

    this.fullSearch = function(searchKey, callback) {
        console.log('Searching the Employee Collection for: ' + searchKey + '\n' + employeesList.toJSON());
        var employees = employeesList.filter(function (element) {
            var fullName = element.get('firstName') + " " + element.get('lastName');
            var fullName1 = element.get('fullName');
            return (fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 || element.get('title').toLowerCase().indexOf(searchKey.toLowerCase()) > -1);
        });
        console.log("Results found: " + employeesList.toJSON());
        callLater(callback, employees);
    };

    this.findById = function (id, callback) {
        var employees = employeesList;
        var employee = null;
        var l = employees.length;
        for (var i = 0; i < l; i++) {
            if (employees[i].id === id) {
                employee = employees[i];
                break;
            }
        }
        callLater(callback, employee);
    };

    // Used to simulate async calls. This is done to provide a consistent interface with stores that use async data access APIs
    var callLater = function (callback, data) {
        if (callback) {
            setTimeout(function () {
                callback(data);
            });
        }
    };

    callLater(successCallback);

};
*/

//directory.store = new directory.MemoryStore();
//var employeesList = new directory.EmployeeCollection();
//employeesList.fetch();