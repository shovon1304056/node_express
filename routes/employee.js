var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

///data in json format
router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded



///get the list

router.get('/',function(req,res,next){
	var sql = `SELECT * FROM employee `;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json(rows)
  })
});

///single record

router.get('/:id',function(req,res,next){
	var id = req.params.id;
	var sql = `SELECT * FROM employee WHERE id= ${id} `;
  db.query(sql, function(err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
     res.json(row[0])
  })
});


////post method for create 
router.post('/create', function(req, res, next) {
  var e_name = req.body.e_name;
  var e_salary = req.body.e_salary;
  

  var sql = `INSERT INTO employee (e_name, e_salary) VALUES ("${e_name}", "${e_salary}")`;
  db.query(sql, function(err, result) {
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({'status': 'success', id: result.insertId})
  })
});

/*put method for update */
router.put('/update/:id', function(req, res, next) {
  var id = req.params.id;
  var e_name = req.body.e_name;
  var e_salary = req.body.e_salary;
  

  var sql = `UPDATE employee SET e_name="${e_name}", e_salary="${e_salary}" WHERE id=${id}`;
  db.query(sql, function(err, result) {
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({'status': 'success'})
  })
});

/*delete method for delete */
router.delete('/delete/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = `DELETE FROM employee WHERE id=${id}`;
  db.query(sql, function(err, result) {
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({'status': 'success'})
  })
})


module.exports=router;