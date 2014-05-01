directory.AdminView = Backbone.View.extend({

	initialize: function () {
        this.searchResults = new directory.EmployeeCollection();
        this.searchResults.fetch({reset: true});
        this.searchresultsView = new directory.AdminListView({model: this.searchResults});
    },

    render:function () {
        this.$el.html(this.template());
        $('#emp-list-container', this.el).append(this.searchresultsView.render().el);
        return this;
    }
});