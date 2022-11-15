let mongoose = require('mongoose');
//Creating the assignment model and defining the schema/structure 
let assignmentModel = mongoose.Schema({
    courseCode: String,
    dueDate: String,
    description: String, 
    requirements: String, 
    groupMembers: Number
    },
    {
        collection: "assignments_homework" //Name of the collection the model relates to 
    }
);
//Making the data model public for the rest of the application to access 
module.exports = mongoose.model('Assignments', assignmentModel);
