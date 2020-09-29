const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Feedback = require("../models/feedback");
const Film = require("../models/film");
const User = require("../models/user");

const checkAuth = require('../middleware/check-auth');
// Handle incoming GET requests to /orders
router.get("/",  (req, res, next) => {
  Feedback.find()
    .populate('film')
    .populate('user','-password')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        avis: docs
          
        })
    
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/",(req, res, next) => {

  Film.findById(req.body.filmId)
    .then(film => {
      if (!film) {
        return res.status(404).json({
          message: "Film not found"
        });
      }
      User.findById(req.body.userId)
      .then(user => {
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }
      })
      const feedback = new Feedback({
        _id: mongoose.Types.ObjectId(),
        rate: req.body.rate,
        film: req.body.filmId,
        review: req.body.review,
        user: req.body.userId
      });
      return feedback.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Feedbacks stored",
        createdFeedback: result,
        request: {
          type: "GET",
          url: "http://localhost:3000/api/feedbacks/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:feedbackId", (req, res, next) => {
  Feedback.findById(req.params.feedbackId)
    .populate('film')
    .populate('user','-password')
    .exec()
    .then(film => {
      if (!film) {
        return res.status(404).json({
          message: "Film not found"
        });
      }
      res.status(200).json({
        feedback: feedback,
        request: {
          type: "GET",
          url: "http://localhost:3000/api/feedbacks"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:feedbackId", (req, res, next) => {
  Feedback.remove({ _id: req.params.feedbackId })
    .exec()
    .then(result => {
        console.log(result);
      res.status(200).json({
        message: "Feedback deleted",
      /*   request: {
          type: "POST",
          url: "http://localhost:3000/api/feedbacks",
          body: { productId: "ID", quantity: "Number" }
        } */
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;