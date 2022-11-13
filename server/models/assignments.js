let mongoose = require('mongoose');
//Create a book model 
let assignmentModel = mongoose.Schema({
    courseCode: String,
    dueDate: String,
    description: String, 
    requirements: String, 
    groupMembers: Number
    },
    {
        collection: "assignments&homework"
    }
);
module.exports = mongoose.model('Assignments', assignmentModel);
