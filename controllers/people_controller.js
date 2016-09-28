var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.Person.findAll({
    include: [ models.Task ]
  }).then(function(people) {
    res.render('people/index', {
      user_id: req.session.user_id,
      email: req.session.user_email,
      logged_in: req.session.logged_in,
      people: people
    });
  });
});

router.get('/update/:id', function(req, res) {
  models.Person.findAll({
    include: [ models.Task ],
    where: {
      id: req.params.id
    }
  }).then(function(people) {
    res.render('people/update', {
      user_id: req.session.user_id,
      email: req.session.user_email,
      logged_in: req.session.logged_in,
      people: people
    });
  });
})

router.post('/create', function(req, res) {
  models.Person.create({
    name: req.body.name
  }).then(function() {
    res.redirect('/');
  });
});

router.put('/name/:id', function(req, res) {

  models.Person.update(
  {
    name: req.body.name
  },
  {
    where: { id: req.params.id }  
  })
  .then(function(people) {
    res.redirect('/');
  })
})

router.delete('/delete/:id', function(req, res) {

  models.Person.destroy({
    where: {
      id: req.params.id
    }
  })
  models.Task.destroy({
    where: {
      person_id: req.params.id
    }
  }).then(function() {
    res.redirect('/');
  })
})

module.exports = router;
