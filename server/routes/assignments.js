let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//assingmentController is the controller that defines the functions for rendering and processing the application pages 
let assignmentController = require('../controller/assignment');
const assignmentData = require('../models/assignments');

// connect with assignment model
let Assignment = require('../models/assignments');

// Read operation

    // Get route for the assignment tracker
    router.get('/', assignmentController.displayAssignments);

// Add operation, perform get and post 

    //Get route for displaying the Add-Page content 
    router.get('/add', assignmentController.displayAddPage);

    //Post route for displaying the Add-Page content 
    router.post('/add', assignmentController.processAddPage);

//Edit Operation

    //Get route for processing the Edit-Page content 
    router.get('/edit/:id', assignmentController.displayEditPage);

    //Post method for processing the Edit-Page content 
    router.post('/edit/:id', assignmentController.processEditPage);

//Delete operation 

    //Get route for deleting content 
    router.get('/delete/:id', assignmentController.performDelete);

//make the router public for the rest of the application
module.exports=router;