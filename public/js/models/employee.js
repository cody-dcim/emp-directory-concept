directory.Employee = Backbone.Model.extend({

    urlRoot:"/employees",

    initialize:function () {
        this.reports = new directory.EmployeeCollection();
        this.reports.url = this.urlRoot + "/" + this.id + "/reports";
        this.manager = new directory.EmployeeCollection();
        this.manager.url = this.urlRoot + "/" + this.id + "/manager";
    }
/*
    validate: function(attrs) {
		if (!attrs.firstName) {
            return 'You must enter a real first name.';
        }
        if (!attrs.lastName) {
            return 'You must enter a real last name.';
        }
        // TODO: Add email regex
        if (attrs.email.length < 5) {
            return 'You must enter a real email.';
        }
        if (attrs.cellPhone.length < 10 && attrs.phone === int) {
            return 'You must enter a real phone number, if you did please remove the dashes and spaces.';
        }
        if (attrs.city.length < 2) {
            return 'You must enter a real city.';
        }
        if (attrs.state.length === 2) {
            return 'You must enter a real state (2-letter abbreviation).';
        }
        // TODO: Add in rest of validation
    }
*/
});