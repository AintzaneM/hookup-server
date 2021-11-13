const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Experience = require("../models/Experience.model ");
const Skill = require('../models/Skill.model');
const isLoggedIn= require("../middleware/isLoggedIn");


// Create a new experience in DB
router.post("/experience", isLoggedIn, (req, res, next) => {
    const {namePosition, description, skill:skillID } = req.body;

    Experience.create({
        namePosition,
        description,
        skill: skillID,
        owner: req.user._id
    })

    .then(newExperienceFromDB => {
        return Skill.findByIdAndUpdate(skillID, {
          $push: { experiences: newExperienceFromDB._id }
        });
      })

    .then(response => res.json(response))
    .catch(err => res.json(err))
})

// Get all experiences from DB
router.get('/experience',isLoggedIn, (req, res, next) => {
  Experience.find()
    .populate('skill')
    .then(allTheExperiencess => res.json(allTheExperiencess))
    .catch(err => res.json(err));
});

// Get a specific experience from DB
router.get('/experience/:experienceId', isLoggedIn, (req, res, next) => {
    const {experienceId} = req.params;
    Experience.findById(experienceId)
    .then(experience => res.json(experience))
    .catch(err => res.json(err));
})

// Edit a specific experience from DB
router.put('/experience/:experienceId', isLoggedIn, (req, res, next) => {
  const { experienceId } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(experienceId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Experience.findByIdAndUpdate(experienceId, req.body)
    .then(() => res.json({ message: `Experience with ${experienceId} is updated successfully.` }))
    .catch(err => res.json(err));
});

// Delete a specific experience from DB
router.delete('/experience/:experienceId', isLoggedIn, (req, res, next) => {
  const { experienceId } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(experienceId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Experience.findByIdAndRemove(experienceId)
    .then(() => res.json({ message: `Experience with ${experienceId} is removed successfully.` }))
    .catch(error => res.json(error));
});

 

module.exports = router;