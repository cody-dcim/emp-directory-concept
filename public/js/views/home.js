directory.HomeView = Backbone.View.extend({

    initialize: function() {
        this.newEmployeesResults = new directory.EmployeeCollection();
        this.newResultsView = new directory.EmployeeListView({model: this.newEmployeesResults});
    },

    render:function () {
        this.$el.html(this.template());
        this.newEmployeesResults.findNewest(10);
        $('#new-employees-data', this.el).append(this.newResultsView.render().el);
        return this;
    },

    events:{
        
    }

});