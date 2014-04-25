directory.ShellView = Backbone.View.extend({

    initialize: function () {
        this.prevKey = "";
        this.searchResults = new directory.EmployeeCollection();
        this.searchResults.fetch({reset: true});
        this.searchresultsView = new directory.EmployeeListView({model: this.searchResults, className: 'dropdown-menu'});
    },

    render: function () {
        this.$el.html(this.template());
        $('.navbar-search', this.el).append(this.searchresultsView.render().el);
        return this;
    },

    events: {
        "keyup .search-query": "search",
        "keypress .search-query": "onkeypress"
    },

    search: function (event) {
        var key = $('#searchText').val();

        if(this.searchResults.checkKeys(key, this.prevKey)) {
            // Checking for special search:
            var keyParts = key.split(':');

            if(keyParts.length > 1) {
                switch(keyParts[0].toLowerCase()) {
                    case "expert":
                        this.searchResults.searchExpertise(keyParts[1].toLowerCase());
                        break;
                    case "department":
                        this.searchResults.searchDepartment(keyParts[1].toLowerCase());
                        break;
                    case "manager":
                        this.searchResults.searchManager(keyParts[1].toLowerCase());
                        break;
                    default:
                        this.searchResults.search(key);
                        break;
                }
            } else {
                this.searchResults.search(key);
            }

            var self = this;
            setTimeout(function () {
                $('.dropdown').addClass('open');
            });

        }

        this.prevKey = key;

    },

    onkeypress: function (event) {
        if (event.keyCode === 13) { // enter key pressed
            event.preventDefault();
        }
    },

    selectMenuItem: function(menuItem) {
        $('.navbar .nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    }

});