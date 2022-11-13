let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect with book model

let Assignments = require('../models/assignments');

module.exports.displayAssignments = (req, res, next)=>{
    Assignments.find((err,assignmentList)=>{
        if(err)
        {
            return console.error(err);
        }
        else 
        {
            res.render('assignments/tracker',{
                title:'Tracker',
                AssignmentList: assignmentList
            })
        }
    });
}

module.exports.displayAddPage = (req, res, next)=>{
    res.render('assignments/add',{
        title:'Add Assignment'
    });
}

module.exports.processAddPage = (req, res, next)=>{
    let newAssignment = Assignments({
        "courseCode":req.body.courseCode,
        "dueDate":req.body.dueDate,
        "description":req.body.description,
        "requirements":req.body.requirements,
        "groupMembers":req.body.groupMembers
    });
    Assignments.create(newAssignment, (err,Book)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/assignment-tracker');
        }
    });
}

module.exports.displayEditPage = (req, res, next)=>{
    let id = req.params.id;
    Assignments.findById(id,(err, assignmentToEdit)=> {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('assignments/edit', 
        {
            title:'Edit Assignment',
            assignment:assignmentToEdit
        })
        }
    })
}

module.exports.processEditPage = (req, res, next)=>{
    let id = req.params.id;
    let updatedAssignment = Assignments ({
        "_id":id,
        "courseCode":req.body.courseCode,
        "dueDate":req.body.dueDate,
        "description":req.body.description,
        "requirements":req.body.requirements,
        "groupMembers":req.body.groupMembers
    });
    Assignments.updateOne({_id:id}, updatedAssignment, (err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            res.redirect('/assignment-tracker');
        }

    })

}

module.exports.performDelete = (req, res, next)=>{
    let id = req.params.id;
    Assignments.deleteOne({_id:id},(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/assignment-tracker');
        }
    })
}