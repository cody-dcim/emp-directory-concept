directory.SearchableCollection = Backbone.Collection.extend({

	search: function(searchStr) {
		var matches = this.fetch({reset: true, success: function(data) {
			searchStr = searchStr.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			if(searchStr.length > 0) {
				matches = data.filter(function (element) {
		            var fullName = element.get('firstName') + " " + element.get('lastName');
		            var fullName1 = element.get('fullName');
		            return (fullName.toLowerCase().indexOf(searchStr.toLowerCase()) > -1 || element.get('title').toLowerCase().indexOf(searchStr.toLowerCase()) > -1);
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