/*
    If you are using the sample RESTFul services I published on GitHub, use the following URLs...

      - For the Node.js sample backend (available in https://github.com/ccoenraets/directory-rest-nodejs)
        Use: http://localhost:3000/employees

        If you are using this Node.js endpoint, the pages of the application must be served from the same domain/port (http://localhost:3000).
        If you want to serve the pages and the data from different domains/ports, use the JSONP adapter instead.

      - For the PHP sample backend (available in https://github.com/ccoenraets/directory-rest-php)
        Use: /directory-rest-php/employees

 */

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

    sync: function(method, model, options) {
        console.log('Syncing Employee Collection...');
        if (method === "read") {
            directory.store.fullSearch(options.data.q, function (data) {
                options.success(data);
            });
        }
    }

});

directory.MemoryStore = function (successCallback, errorCallback) {

    this.findByName = function (searchKey, callback) {
        var employees = this.employees.filter(function (element) {
            var fullName = element.firstName + " " + element.lastName;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLater(callback, employees);
    };

    this.findByManager = function (managerId, callback) {
        var employees = this.employees.filter(function (element) {
            return managerId === element.managerId;
        });
        callLater(callback, employees);
    };

    this.fullSearch = function(searchKey, callback) {
        this.employees = new directory.EmployeeCollection();
        console.log('Searching the Employee Collection for: ' + searchKey + '\n' + this.employees);
        var employees = this.employees.filter(function (element) {
            var fullName = element.firstName + " " + element.lastName;
            return (fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 || element.title.toLowerCase().indexOf(searchKey.toLowerCase()) > -1);
        });
        callLater(callback, employees);
    };

    this.findById = function (id, callback) {
        var employees = this.employees;
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

}
directory.store = new directory.MemoryStore();
