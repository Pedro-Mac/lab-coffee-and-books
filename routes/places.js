'use strict';

const { Router } = require('express');
const router = new Router();

const Place = require('./../models/place');

router.get('/create', (req, res, next) => {
  res.render('places/create');
});

router.post('/create', (req, res, next) => {
  const { name, type } = req.body;

  return Place.create({
    name,
    type
  })
    .then(res.redirect('/'))
    .catch(err => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const place = req.params.id;

  Place.findById(place)
    .then(data => {
      res.render('places/single-place', { data });
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:id/update', (req, res, next) => {
  const place = req.params.id;

  Place.findById(place)
    .then(data => {
      console.log(data);
      res.render('places/update', { data: data });
    })
    .catch(err => {
      next(err);
    });
});

router.post('/:id/update', (req, res, next) => {
  const place = req.params.id;
  const { name, type } = req.body;

  Place.findByIdAndUpdate(place, { name, type })
    .then(data => {
      console.log(data);
      res.redirect(`/places/${place}`);
    })
    .catch(err => {
      next(err);
    });
});

router.post('/:id/delete', (req, res, next) => {
  const place = req.params.id;

  Place.findByIdAndDelete(place)
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
