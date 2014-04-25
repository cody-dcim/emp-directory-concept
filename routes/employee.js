var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    db;

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, mongoClient) {
    db = mongoClient.db("employeedb09");
    db.collection('employees', {strict:true}, function(err, collection) {
        if (err) {
            console.log("The 'employees' collection doesn't exist. Creating it with sample data...");
            populateDB();
        }
    });
});


exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);
    db.collection('employees', function(err, collection) {
        collection.findOne({'id': id}, function(err, item) {
            console.log(item);
            res.jsonp(item);
        });
    });
};

exports.findManager = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);
    db.collection('employees', function(err, collection) {
        collection.findOne({'id': id}, function(err, item) {
            if(item.managerId > 0) {
                collection.find({'id': item.managerId}).toArray(function(err, mgrs) {
                    console.log(mgrs);
                    res.jsonp(mgrs);
                });
            } else {
                res.jsonp(item);
            }
        });
    });
};

exports.findByManager = function(req, res) {
    var id = parseInt(req.params.id);
    console.log('findByManager: ' + id);
    db.collection('employees', function(err, collection) {
        collection.find({'managerId': id}).toArray(function(err, items) {
            console.log(items);
            res.jsonp(items);
        });
    });
};

exports.findAll = function(req, res) {
    var name = req.query["name"];
    db.collection('employees', function(err, collection) {
        if (name) {
            collection.find({"fullName": new RegExp(name, "i")}).toArray(function(err, items) {
                res.jsonp(items);
            });
        } else {
            collection.find().toArray(function(err, items) {
                res.jsonp(items);
            });
        }
    });
};

exports.search = function(req, res) {
    var q = req.query["q"];
    db.collection('employees', function(err, collection) {
        if (name) {
            collection.find({"fullName": new RegExp(name, "i")}).toArray(function(err, items) {
                res.jsonp(items);
            });
        } else {
            collection.find().toArray(function(err, items) {
                res.jsonp(items);
            });
        }
    });
};

exports.addEmployee = function(req, res) {
    var employee = req.body;
    console.log('Adding Employee: ' + JSON.stringify(employee));
    
    db.collection('employees', function(err, collection) {
        collection.insert(employee, {safe:true}, function(err, result) {
            if (err) {
                res.jsonp({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.jsonp(result[0]);
            }
        });
    });
};

exports.updateEmployee = function(req, res) {
    var id = parseInt(req.params.id);
    console.log('Updating employee: ' + id);
    console.log(req.body);
    var employee = req.body;
    delete employee._id;
    console.log(JSON.stringify(employee));
    db.collection('employees', function(err, collection) {
        collection.update({'id': id}, employee, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating employee: ' + err);
                res.jsonp({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.jsonp(employee);
            }
        });
    });
};

exports.deleteEmployee = function(req, res) {
    var id = parseInt(req.params.id);
    console.log('Deleting employee: ' + id);
    
    db.collection('employees', function(err, collection) {
        collection.remove({'id': id}, {safe:true}, function(err, result) {
            if (err) {
                res.jsonp({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.jsonp(req.body);
            }
        });
    });
};
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    console.log("Populating employee database...");
    var employees = [
        {"id" : 1, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "Cody", "lastName" : "Lettau", "fullName" : "Cody Lettau", "managerId" : 1, "managerName" : "Cody Lettau", "title" : "CTO and Founder", "department" : "Executive", "cellPhone" : "9209480694", "officePhone" : "0001", "email" : "cody@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "java, javascript, html, css", "projects" : [], "linkedInURL" : "http://www.linkedin.com/codylettau"},
        {"id" : 2, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "Ben", "lastName" : "Collins", "fullName" : "Ben Collins", "managerId" : 1, "managerName" : "Cody Lettau", "title" : "CMO and Founder", "department" : "Executive", "cellPhone" : "9209480694", "officePhone" : "0002", "email" : "ben@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "java, android, marketing, sales", "projects" : [], "linkedInURL" : "http://www.linkedin.com/bencollins"},
        {"id" : 3, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "Michael", "lastName" : "Albanese", "fullName" : "Michael Albanese", "managerId" : 2, "managerName" : "Ben Collins", "title" : "VP of Sales & Marketing", "department" : "Executive", "cellPhone" : "9209480694", "officePhone" : "0003", "email" : "michael@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "marketing, sales", "projects" : [], "linkedInURL" : "http://www.linkedin.com/mikealbanese"},
        {"id" : 4, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "Ian", "lastName" : "Thompson", "fullName" : "Ian Thompson", "managerId" : 2, "managerName" : "Ben Collins", "title" : "VP of PR & Communication", "department" : "Executive", "cellPhone" : "9209480694", "officePhone" : "0004", "email" : "ian@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "public relations, social media, facebook, twitter", "projects" : [], "linkedInURL" : "http://www.linkedin.com/ianthompson"},
        {"id" : 5, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "Alex", "lastName" : "Moehn", "fullName" : "Alex Moehn", "managerId" : 3, "managerName" : "Michael Albanese", "title" : "Marketing Manager", "department" : "Marketing", "cellPhone" : "9209480694", "officePhone" : "0005", "email" : "alex@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "marketing, social media", "projects" : [], "linkedInURL" : "http://www.linkedin.com/alexmoehn"},
        {"id" : 6, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "Katie", "lastName" : "Kimes", "fullName" : "Katie Kimes", "managerId" : 3, "managerName" : "Michael Albanese", "title" : "Social Media Manager", "department" : "Marketing", "cellPhone" : "9209480694", "officePhone" : "0006", "email" : "katie@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "marketing, design, photoshop, inDesign", "projects" : [], "linkedInURL" : "http://www.linkedin.com/katiekimes"},
        {"id" : 7, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "Ryan", "lastName" : "Lettau", "fullName" : "Ryan Lettau", "managerId" : 1, "managerName" : "Cody Lettau", "title" : "VP of Engineering", "department" : "Engineering", "cellPhone" : "9209480694", "officePhone" : "0007", "email" : "ryan@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "sales, strategy, engineering", "projects" : [], "linkedInURL" : "http://www.linkedin.com/ryanlettau"},
        {"id" : 8, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "Jason", "lastName" : "Lettau", "fullName" : "Jason Lettau", "managerId" : 3, "managerName" : "Michael Albanese", "title" : "National Sales Manager", "department" : "Sales", "cellPhone" : "9209480694", "officePhone" : "0008", "email" : "jason@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "engineering, strategy, operations", "projects" : [], "linkedInURL" : "http://www.linkedin.com/jasonlettau"},
        {"id" : 9, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "Mike", "lastName" : "Smith", "fullName" : "Mike Smith", "managerId" : 8, "managerName" : "Jason Lettau", "title" : "Midwest Regional Sales Manager", "department" : "Sales", "cellPhone" : "9209480694", "officePhone" : "0009", "email" : "mike@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "sales, midwest, email sales", "projects" : [], "linkedInURL" : "http://www.linkedin.com/mikesmith"},
        {"id" : 10, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "Mary", "lastName" : "Smit", "fullName" : "Mary Smit", "managerId" : 8, "managerName" : "Jason Lettau", "title" : "East Regional Sales Manager", "department" : "Sales", "cellPhone" : "9209480694", "officePhone" : "0010", "email" : "mary@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "sales, east coast, cold calling, sale scripts", "projects" : [], "linkedInURL" : "http://www.linkedin.com/mary"},
        {"id" : 11, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "John", "lastName" : "Lettau", "fullName" : "John Lettau", "managerId" : 10, "managerName" : "Mary Smit", "title" : "Sales Engineer", "department" : "Sales", "cellPhone" : "9209480694", "officePhone" : "0001", "email" : "cody@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "java, javascript, html, css", "projects" : [], "linkedInURL" : "http://www.linkedin.com/codylettau"},
        {"id" : 12, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "Sarah", "lastName" : "Collins", "fullName" : "Sarah Collins", "managerId" : 10, "managerName" : "Mary Smit", "title" : "Sales Engineer", "department" : "Sales", "cellPhone" : "9209480694", "officePhone" : "0002", "email" : "ben@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "java, android, marketing, sales", "projects" : [], "linkedInURL" : "http://www.linkedin.com/bencollins"},
        {"id" : 13, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "Mike", "lastName" : "Otto", "fullName" : "Mike Otto", "managerId" : 10, "managerName" : "Mary Smit", "title" : "Sales Engineer", "department" : "Sales", "cellPhone" : "9209480694", "officePhone" : "0003", "email" : "michael@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "marketing, sales", "projects" : [], "linkedInURL" : "http://www.linkedin.com/mikealbanese"},
        {"id" : 14, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "Kara", "lastName" : "Sampson", "fullName" : "Kara Sampson", "managerId" : 9, "managerName" : "Mike Smith", "title" : "Sales Engineer", "department" : "Sales", "cellPhone" : "9209480694", "officePhone" : "0004", "email" : "ian@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "public relations, social media, facebook, twitter", "projects" : [], "linkedInURL" : "http://www.linkedin.com/ianthompson"},
        {"id" : 15, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "Sally", "lastName" : "Jones", "fullName" : "Sally Jones", "managerId" : 9, "managerName" : "Mike Smith", "title" : "Sales Engineer", "department" : "Sales", "cellPhone" : "9209480694", "officePhone" : "0005", "email" : "alex@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "marketing, social media", "projects" : [], "linkedInURL" : "http://www.linkedin.com/alexmoehn"},
        {"id" : 16, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "Luke", "lastName" : "Jones", "fullName" : "Luke Jones", "managerId" : 6, "managerName" : "Katie Kimes", "title" : "Social Media Specialist", "department" : "Marketing", "cellPhone" : "9209480694", "officePhone" : "0006", "email" : "katie@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "marketing, design, photoshop, inDesign", "projects" : [], "linkedInURL" : "http://www.linkedin.com/katiekimes"},
        {"id" : 17, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "Alexa", "lastName" : "Reynolds", "fullName" : "Alexa Reynolds", "managerId" : 7, "managerName" : "Ryan Lettau", "title" : "Software Engineer", "department" : "Engineering", "cellPhone" : "9209480694", "officePhone" : "0007", "email" : "ryan@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "sales, strategy, engineering", "projects" : [], "linkedInURL" : "http://www.linkedin.com/ryanlettau"},
        {"id" : 18, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "Zach", "lastName" : "Tidd", "fullName" : "Zach Tidd", "managerId" : 7, "managerName" : "Ryan Lettau", "title" : "Software Engineer", "department" : "Engineering", "cellPhone" : "9209480694", "officePhone" : "0008", "email" : "jason@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "engineering, strategy, operations", "projects" : [], "linkedInURL" : "http://www.linkedin.com/jasonlettau"},
        {"id" : 19, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "Mike", "lastName" : "Smithon", "fullName" : "Mike Smithon", "managerId" : 7, "managerName" : "Ryan Lettau", "title" : "Software Engineer", "department" : "Engineering", "cellPhone" : "9209480694", "officePhone" : "0009", "email" : "mike@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "sales, midwest, email sales", "projects" : [], "linkedInURL" : "http://www.linkedin.com/mikesmith"},
        {"id" : 20, "password" : "hashOfPWandSalt", "salt" : "randomkey", "isActive" : true, "dateCreated" : "Thu Apr 24 2014 23:42:46 GMT-0500 (Central Daylight Time)", "firstName" : "Abby", "lastName" : "Tiddles", "fullName" : "Abby Tiddles", "managerId" : 7, "managerName" : "Ryan Lettau", "title" : "Software Engineer", "department" : "Engineering", "cellPhone" : "9209480694", "officePhone" : "0010", "email" : "mary@example.com", "city" : "Milwaukee", "state" : "WI", "country" : "USA", "pic" : "/Public/Content/Images/Profiles/profile.jpg", "twitterId" : "tweeting101", "blog" : "http://www.lettaudesigns.com", "expertise" : "sales, east coast, cold calling, sale scripts", "projects" : [], "linkedInURL" : "http://www.linkedin.com/mary"},
    ];
/*
    var employees = [
        {"id": 1, "firstName": "James", "lastName": "King", "fullName": "James King", "managerId": 0, managerName: "", "title": "President and CEO", "department": "Corporate", "cellPhone": "617-000-0001", "officePhone": "781-000-0001", "email": "jking@fakemail.com", "city": "Boston, MA", "pic": "james_king.jpg", "twitterId": "@fakejking", "blog": "http://coenraets.org"},
        {"id": 2, "firstName": "Julie", "lastName": "Taylor", "fullName": "Julie Taylor", "managerId": 1, managerName: "James King", "title": "VP of Marketing", "department": "Marketing", "cellPhone": "617-000-0002", "officePhone": "781-000-0002", "email": "jtaylor@fakemail.com", "city": "Boston, MA", "pic": "julie_taylor.jpg", "twitterId": "@fakejtaylor", "blog": "http://coenraets.org"},
        {"id": 3, "firstName": "Eugene", "lastName": "Lee", "fullName": "Eugene Lee", "managerId": 1, managerName: "James King", "title": "CFO", "department": "Accounting", "cellPhone": "617-000-0003", "officePhone": "781-000-0003", "email": "elee@fakemail.com", "city": "Boston, MA", "pic": "eugene_lee.jpg", "twitterId": "@fakeelee", "blog": "http://coenraets.org"},
        {"id": 4, "firstName": "John", "lastName": "Williams", "fullName": "John Williams", "managerId": 1, managerName: "James King", "title": "VP of Engineering", "department": "Engineering", "cellPhone": "617-000-0004", "officePhone": "781-000-0004", "email": "jwilliams@fakemail.com", "city": "Boston, MA", "pic": "john_williams.jpg", "twitterId": "@fakejwilliams", "blog": "http://coenraets.org"},
        {"id": 5, "firstName": "Ray", "lastName": "Moore", "fullName": "Ray Moore", "managerId": 1, managerName: "James King", "title": "VP of Sales", "department": "Sales", "cellPhone": "617-000-0005", "officePhone": "781-000-0005", "email": "rmoore@fakemail.com", "city": "Boston, MA", "pic": "ray_moore.jpg", "twitterId": "@fakermoore", "blog": "http://coenraets.org"},
        {"id": 6, "firstName": "Paul", "lastName": "Jones", "fullName": "Paul Jones", "managerId": 4, managerName: "John Williams", "title": "QA Manager", "department": "Engineering", "cellPhone": "617-000-0006", "officePhone": "781-000-0006", "email": "pjones@fakemail.com", "city": "Boston, MA", "pic": "paul_jones.jpg", "twitterId": "@fakepjones", "blog": "http://coenraets.org"},
        {"id": 7, "firstName": "Paula", "lastName": "Gates", "fullName": "Paula Gates", "managerId": 4, managerName: "John Williams", "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0007", "officePhone": "781-000-0007", "email": "pgates@fakemail.com", "city": "Boston, MA", "pic": "paula_gates.jpg", "twitterId": "@fakepgates", "blog": "http://coenraets.org"},
        {"id": 8, "firstName": "Lisa", "lastName": "Wong", "fullName": "Lisa Wong", "managerId": 2, managerName: "Julie Taylor", "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0008", "officePhone": "781-000-0008", "email": "lwong@fakemail.com", "city": "Boston, MA", "pic": "lisa_wong.jpg", "twitterId": "@fakelwong", "blog": "http://coenraets.org"},
        {"id": 9, "firstName": "Gary", "lastName": "Donovan", "fullName": "Gary Donovan", "managerId": 2, managerName: "Julie Taylor", "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0009", "officePhone": "781-000-0009", "email": "gdonovan@fakemail.com", "city": "Boston, MA", "pic": "gary_donovan.jpg", "twitterId": "@fakegdonovan", "blog": "http://coenraets.org"},
        {"id": 10, "firstName": "Kathleen", "lastName": "Byrne", "fullName": "Kathleen Byrne", "managerId": 5, managerName: "Ray Moore", "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0010", "officePhone": "781-000-0010", "email": "kbyrne@fakemail.com", "city": "Boston, MA", "pic": "kathleen_byrne.jpg", "twitterId": "@fakekbyrne", "blog": "http://coenraets.org"},
        {"id": 11, "firstName": "Amy", "lastName": "Jones", "fullName": "Amy Jones", "managerId": 5, managerName: "Ray Moore", "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0011", "officePhone": "781-000-0011", "email": "ajones@fakemail.com", "city": "Boston, MA", "pic": "amy_jones.jpg", "twitterId": "@fakeajones", "blog": "http://coenraets.org"},
        {"id": 12, "firstName": "Steven", "lastName": "Wells", "fullName": "Steven Wells", "managerId": 4, managerName: "John Williams", "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0012", "officePhone": "781-000-0012", "email": "swells@fakemail.com", "city": "Boston, MA", "pic": "steven_wells.jpg", "twitterId": "@fakeswells", "blog": "http://coenraets.org"}
    ];
 */
    db.collection('employees', function(err, collection) {
        collection.insert(employees, {safe:true}, function(err, result) {});
    });
 
};