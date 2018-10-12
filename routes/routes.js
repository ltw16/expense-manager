var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var Expense = require('../models/Expense');

router.get("/", function(req,res){
    res.render("index")
});

// Insert expense route
router.post('/insert', function(req,res){
    const expense = new Expense({
        description: req.body.desc,
        amount: req.body.amount,
        month: req.body.month,
        year: req.user.year
    });
    expense.save(function(err){
        if(err){
            res.send(err);
        }
        res.send('Expense successfully added!');
    });
})

// Update expense route
router.post('update', function(req, res){
    const doc = {
        description: req.body.description,
        amount: req.body.amount,
        month: req.body.month,
        year: req.body.year
    };
    console.log(doc);
    Expense.update({_id: req.body._id}, doc, function(err, result) {
        if (err) {
            res.send(err);
        }
        res.send("Expense succesfully updated!");
    })
});

// Delete expense route
router.delete("/delete", function(req, res){
    var id = req.query.id;
    Expense.findOneAndRemove({ _id: id })
        .then(function(){
            res.send("Expense successfully deleted!");
        })
        .catch(function(err){
            res.send(err)
        })
});

router.get("/getAll", function(req, res) {
    var monthRec = req.query.month;
    var yearRec = req.query.year;
    if(monthRec && monthRec != "All"){
        Expense.find({$and: [ {month: monthRec}, {year: yearRec}]},
        function(err, expenses){
            if(err){
                res.send(err);
            }
            res.json(expenses);
        })
    } else {
        Expense.find({year:yearRec}, function(err, expenses) {
            if(err){
                res.send(err);
            }
            res.json(expenses);
        })  
    }
})


module.exports = router;
