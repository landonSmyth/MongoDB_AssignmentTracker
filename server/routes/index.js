let express = require('express');
let router = express.Router();
let indexController = require('../controller/index');

//Get the homepage
router.get('/', indexController.displayHomePage);

//Make the router public for the rest of the assignment
module.exports = router;
