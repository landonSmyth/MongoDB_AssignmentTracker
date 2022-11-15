let express = require('express');
let router = express.Router();

//Display the home page that is first displayed once the site is opened
module.exports.displayHomePage = (req, res, next)=> {
    res.render('index', {title: 'Home'});
}


