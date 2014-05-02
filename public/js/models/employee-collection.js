directory.EmployeeCollection = directory.SearchableCollection.extend({

    model: directory.Employee,

    url: "http://localhost:3000/employees",

	findNewest: function(limit) {
		// Ajax call to get newest employeess
		var self = this;

	    $.ajax({
	        type: "GET",
	        url: this.url + "/newest",
	        data: '{"limit": 5}',
	        dataType: "json",
	        success: function(data){
	        	var newEmployees = new directory.EmployeeCollection(data);
	            return newEmployees;
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            console.log("FETCH FAILED: " + errorThrown);
	        }
	    });
	}
    
});