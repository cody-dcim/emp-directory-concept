directory.EmployeeView = Backbone.View.extend({

    render: function () {
        this.$el.html(this.template(this.model.attributes));
        $('#details', this.el).html(new directory.EmployeeSummaryView({model:this.model}).render().el);
        this.model.reports.fetch({
            success:function (data) {
                if (data.length == 0)
                    $('.no-reports').show();
            }
        });
        $('#reports', this.el).append(new directory.EmployeeListView({model:this.model.reports}).render().el);
        
        this.model.manager.fetch({
            success:function (data) {
                if (data.length == 0)
                    $('.no-manager').show();
            }
        });
        $('#manager-data', this.el).append(new directory.EmployeeListView({model:this.model.manager}).render().el);

        return this;
    }
});

directory.EmployeeSummaryView = Backbone.View.extend({

    model: directory.Employee,

    events: {
        'click button' : 'saveHandler',
        'input label'  : 'editHandler'
    },

    initialize:function () {
        _.bindAll(this, 'render', 'editHandler', 'saveHandler');
        //this.model.on("change", this.render, this);
        var self = this;
        self.render();
        console.log(this.model);
        $('body').on('change', '.contenteditable', function(e){
            var field = e.target.id;
            var value = e.target.innerText;
            self.model.set(field, value);
        });
        self.model.on('change', function(){
            $('button').show();
        });

    },

    render:function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    saveHandler: function(e) {
        var self = this;
        //Save logic
        this.model.save(null, {
            success: function(model) {
                self.render();
            },
            error: function(e) {
                alert("error occurred: " + e);
            }
        });
        e.preventDefault();
        $(e.target).hide();
    },

    editHandler: function(e) {
        var field = e.target.id;
        var value = e.target.innerText;
        this.model.set(field, value);
    }

});