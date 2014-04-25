directory.SearchableCollection = Backbone.Collection.extend({

	initialize: function(){
		_.bindAll(this, "search", "searchExpertise", "searchDepartment", "searchManager");
	},

	search: function(searchStr) {
		var matches = this.fetch({reset: true, success: function(data) {
			searchStr = searchStr.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			if(searchStr.length > 0) {
				matches = data.filter(function (element) {
		            var fullName = element.get('fullName');
		            var title = element.get("title");
		            var expertise = element.get("expertise");
		            return (fullName.toLowerCase().indexOf(searchStr.toLowerCase()) > -1 || 
		            		title.toLowerCase().indexOf(searchStr.toLowerCase()) > -1 || 
		            		expertise.toLowerCase().indexOf(searchStr.toLowerCase()) > -1);
		        });
		        data.reset(matches);
			}
		}});
	},

	searchExpertise: function(searchStr) {
		var matches = this.fetch({reset: true, success: function(data) {
			searchStr = searchStr.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			if(searchStr.length > 0) {
				// Checking if comma-separated string
				if(searchStr.indexOf(',') > -1) {
					searchStr = searchStr.replace(/\s*,\s*/, ",");
					var expertise = searchStr.split(",")
					// TODO: Check expertise against array of skills

				} else {
					matches = data.filter(function (element) {
			            var expertise = element.get("expertise");
			            return (expertise.toLowerCase().indexOf(searchStr.toLowerCase()) > -1);
			        });
				}
				data.reset(matches);
			}	
		}});
	},

	searchDepartment: function(searchStr) {
		var matches = this.fetch({reset: true, success: function(data) {
			searchStr = searchStr.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			if(searchStr.length > 0) {
				matches = data.filter(function (element) {
		            var department = element.get('department');
		            return (department.toLowerCase().indexOf(searchStr.toLowerCase()) > -1);
		        });
		        data.reset(matches);
			}
		}});
	},

	searchManager: function(searchStr) {
		var matches = this.fetch({reset: true, success: function(data) {
			searchStr = searchStr.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			if(searchStr.length > 0) {
				matches = data.filter(function (element) {
		            var manager = element.get('managerName');
		            return (manager.toLowerCase().indexOf(searchStr.toLowerCase()) > -1);
		        });
		        data.reset(matches);
			}
		}});
	},

	checkKeys: function(curr, prev) {
		var different = false;
		prev = prev.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		curr = curr.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

		if(prev.length === curr.length) {
			if(curr.indexOf(prev) < 0) {
				different = true;
			}
		} else {
			different = true;
		}
		return different;
	}
    
});