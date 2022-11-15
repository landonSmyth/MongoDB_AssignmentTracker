let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect with assignment data model
let Assignments = require('../models/assignments'); 

//Display list of assignments
module.exports.displayAssignments = (req, res, next)=>{ 
    Assignments.find((err,assignmentList)=>{
        if(err)
        {
            return console.error(err);
        }
        else 
        {
            res.render('assignments/tracker',{ //Selects the "tracker" view and renders it to the page 
                title:'Tracker',
                AssignmentList: assignmentList 
                //Assigning the data model to "AssignmentList" in order to read from the database 
            })
        }
    });
}

//Display the add page where the user can perform the "C" operation 
module.exports.displayAddPage = (req, res, next)=>{
    res.render('assignments/add',{ //Render the add page to the browser 
        title:'Add Assignment'
    });
}

//Processing the add page, meaning creating a new assignment for the database 
module.exports.processAddPage = (req, res, next)=>{
    //New assignment to add
    let newAssignment = Assignments({
        "courseCode":req.body.courseCode, 
        "dueDate":req.body.dueDate,
        "description":req.body.description,
        "requirements":req.body.requirements,
        "groupMembers":req.body.groupMembers
    });
    //Create new assignment 
    Assignments.create(newAssignment, (err,Book)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/assignment-tracker'); //Send the user back to the main tracker after adding the entry 
        }
    });
}

//Display the edit page for updating entries in the database 
module.exports.displayEditPage = (req, res, next)=>{
    //id is the unique identifier for the specific assignment entry that is used to select it from the database 
    let id = req.params.id;
    Assignments.findById(id,(err, assignmentToEdit)=> {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('assignments/edit', //render the edit view to the browser window 
        {
            title:'Edit Assignment',
            assignment:assignmentToEdit //Assignment to edit is the document from the database that we wish to update 
        })
        }
    })
}

//Processing the edit page to perform the Update operation on the database entry 
module.exports.processEditPage = (req, res, next)=>{
    //Unique ID to identify the document we are updating 
    let id = req.params.id;
    let updatedAssignment = Assignments ({
        "_id":id,
        "courseCode":req.body.courseCode,
        "dueDate":req.body.dueDate,
        "description":req.body.description,
        "requirements":req.body.requirements,
        "groupMembers":req.body.groupMembers
    });
    //Perform the update operation on the selected database document 
    Assignments.updateOne({_id:id}, updatedAssignment, (err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            res.redirect('/assignment-tracker'); //Send the user back to the main tracker page once the update is made 
        }

    })

}
//Perform the delete operation on a specifc database document 
module.exports.performDelete = (req, res, next)=>{
    //Unique ID to identify the document we wish to delete 
    let id = req.params.id;
    //Perform delete operation on that specific document 
    Assignments.deleteOne({_id:id},(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/assignment-tracker'); //Send the user back to the main tracker once the delete is finished 
        }
    })
}